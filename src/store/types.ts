export interface SafeArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Viewport {
  width: number;
  height: number;
}

export interface AppState {
  isTMA: boolean;
  isLoading: boolean;
  devMode: boolean;
  safeArea: SafeArea;
  contentSafeArea: SafeArea;
  platform?: string;
  viewport?: Viewport;
  isVertical: boolean;
}

export interface AppActions {
  // sync
  setSafeArea: (area: SafeArea) => void;
  setContentSafeArea: (area: SafeArea) => void;
  setViewport: (viewport: Viewport) => void;
  setIsVertical: (value: boolean) => void;

  // async
  checkTMA: () => Promise<boolean>;
  retrievePlatform: () => Promise<string | undefined>;

  // helper
  withLoading: <T>(action: () => Promise<T>) => Promise<T>;
}
