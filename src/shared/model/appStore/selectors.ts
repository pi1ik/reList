import { AppState } from "@/shared/model/appStore/types";

export const selectIsTMA = (state: AppState) => state.isTMA;
export const selectIsLoading = (state: AppState) => state.isLoading;
export const selectSafeArea = (state: AppState) => state.safeArea;
export const selectContentSafeArea = (state: AppState) => state.contentSafeArea;
export const selectPlatform = (state: AppState) => state.platform;
export const selectViewport = (state: AppState) => state.viewport;
