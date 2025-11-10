import { AppState, AppActions } from "@/shared/model/appStore/types";
import { isTMA, retrieveLaunchParamsFp } from "@tma.js/sdk-react";

export const createAppActions = (
  set: (partial: Partial<AppState>) => void,
  get: () => AppState
): AppActions => ({
  // --- helper ---
  withLoading: async <T>(action: () => Promise<T>): Promise<T> => {
    set({ isLoading: true });
    try {
      return await action();
    } finally {
      set({ isLoading: false });
    }
  },

  // --- sync actions ---
  setSafeArea: (area) => set({ safeArea: area }),
  setContentSafeArea: (area) => set({ contentSafeArea: area }),
  setViewport: (viewport) => set({ viewport }),
  setIsVertical: (value) => set({ isVertical: value }),

  // --- async actions ---
  checkTMA: async () => {
    const { devMode } = get();

    if (devMode) {
      console.warn("[TMA Check Skipped] devMode включён");
      set({ isTMA: true });
      return true;
    }

    try {
      const result = await isTMA("complete");
      set({ isTMA: Boolean(result) });
      return Boolean(result);
    } catch {
      set({ isTMA: false });
      return false;
    }
  },

  retrievePlatform: async () => {
    const launchParamsFp = retrieveLaunchParamsFp();
    if (launchParamsFp._tag === "Right") {
      const platform = launchParamsFp.right.tgWebAppPlatform;
      set({ platform });
      return platform;
    }
    return undefined;
  },
});
