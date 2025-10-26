"use client";

import { useEffect } from "react";
import { viewport, init as initSDK } from "@tma.js/sdk-react";
import { on, off, postEvent } from "@tma.js/bridge";
import { useAppStore } from "@/store/appStore";
import { SafeArea } from "@/store/types";

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
    const handleSafeArea = (newArea: SafeArea) => {
      setSafeArea(newArea);
      if (viewport.height() >= viewport.width()) {
        setIsVertical(true);
        postEvent("web_app_toggle_orientation_lock", { locked: true });
      }
    };
    const handleContentSafeArea = (newArea: SafeArea) => {
      setContentSafeArea(newArea);
      if (viewport.height() >= viewport.width()) {
        setIsVertical(true);
        postEvent("web_app_toggle_orientation_lock", { locked: true });
      }
    };

    on("safe_area_changed", handleSafeArea);
    on("content_safe_area_changed", handleContentSafeArea);

    return () => {
      off("safe_area_changed", handleSafeArea);
      off("content_safe_area_changed", handleContentSafeArea);
    };
  }, [
    checkTMA,
    retrievePlatform,
    withLoading,
    setSafeArea,
    setContentSafeArea,
    setIsVertical,
  ]);
};
