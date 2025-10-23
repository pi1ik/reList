"use client";

import { useEffect } from "react";
import { viewport, init as initSDK } from "@tma.js/sdk-react";
import { on, off, postEvent, request } from "@tma.js/bridge";
import { useAppStore } from "@/store/appStore";
import { SafeArea, Orientation } from "@/store/types";

export const useAppInit = () => {
  const {
    checkTMA,
    retrievePlatform,
    withLoading,
    setSafeArea,
    setContentSafeArea,
    setIsVertical,
  } = useAppStore();

  useEffect(() => {
    const initApp = async () => {
      await withLoading(async () => {
        // --- Проверка TMA ---
        const tma = await checkTMA();
        if (!tma) return;

        // --- SDK и viewport ---
        initSDK();
        await viewport.mount();

        // --- Получаем платформу ---
        const platform = await retrievePlatform();

        // --- Определяем мобильные устройства ---
        if (platform === "android" || platform === "ios") {
          try {
            // --- Включаем fullscreen ---
            await viewport.requestFullscreen();

            // --- Блокируем ориентацию в портретную, если при инициализации высота экрана больше ширины ---
            if (viewport.height() > viewport.width()) {
              postEvent("web_app_toggle_orientation_lock", { locked: true });
            } else {
              // --- Начинаем следить за ориентацией устройства, если телефон был в пейзажном положении ---
              setIsVertical(false);
              postEvent("web_app_toggle_orientation_lock", { locked: false });
              await request(
                "web_app_start_device_orientation",
                "device_orientation_changed",
                { params: { refresh_rate: 1000, need_absolute: false } }
              );
            }
          } catch (err) {
            console.warn("Viewport init error:", err);
          }

          // --- Задаем безопасные зоны ---

          setSafeArea(viewport.safeAreaInsets());
          setContentSafeArea(viewport.contentSafeAreaInsets());

          postEvent("web_app_setup_swipe_behavior", {
            allow_vertical_swipe: false,
          });
        }
      });
    };

    void initApp();

    // --- Обработчики событий ---
    const handleSafeArea = (newArea: SafeArea) => setSafeArea(newArea);
    const handleContentSafeArea = (newArea: SafeArea) =>
      setContentSafeArea(newArea);
    const handleOrientation = (orientation: Orientation) => {
      const betaDeg = (orientation.beta * 180) / Math.PI;
      if (betaDeg > 30) {
        postEvent("web_app_toggle_orientation_lock", { locked: true });
        postEvent("web_app_stop_device_orientation");
        setIsVertical(true);
      }
    };

    on("safe_area_changed", handleSafeArea);
    on("content_safe_area_changed", handleContentSafeArea);
    on("device_orientation_changed", handleOrientation);

    return () => {
      off("safe_area_changed", handleSafeArea);
      off("content_safe_area_changed", handleContentSafeArea);
      off("device_orientation_changed", handleOrientation);
    };
  }, [
    checkTMA,
    retrievePlatform,
    withLoading,
    setSafeArea,
    setContentSafeArea,
  ]);
};
