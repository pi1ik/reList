"use client";

import { create } from "zustand";
import { AppState, AppActions } from "@/shared/model/appStore/types";
import { createAppActions } from "@/shared/model/appStore/actions";

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  // --- state ---
  isTMA: true,
  isLoading: true,
  isVertical: true,
  devMode: process.env.NEXT_PUBLIC_DEV_MODE === "true",
  safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
  contentSafeArea: { top: 0, bottom: 0, left: 0, right: 0 },
  viewport: undefined,
  platform: undefined,

  // --- actions ---
  ...createAppActions(set, get),
}));
