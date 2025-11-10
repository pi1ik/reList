"use client";

import React, { ReactNode } from "react";
import "./globals.css";
import { useAppStore } from "@/shared/model/appStore/appStore";
import { useAppInit } from "@/processes/appInit/model/useAppInit";
import { LoadingMessage } from "@/processes/appInit/ui/LoadingMessage";
import { NotTMAWarning } from "@/processes/appInit/ui/NotTMAWarning";
import { HorizontalWarning } from "@/processes/appInit/ui/HorizontalWarning";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useAppInit(); // инициализация приложения на верхнем уровне

  const { isTMA, isLoading, safeArea, contentSafeArea, isVertical } =
    useAppStore();

  const paddingStyle = React.useMemo(
    () => ({
      paddingTop: `calc(${contentSafeArea.top}px + ${safeArea.top}px)`,
      paddingBottom: safeArea.bottom,
      paddingLeft: safeArea.left,
      paddingRight: safeArea.right,
    }),
    [safeArea, contentSafeArea]
  );

  return (
    <html lang="ru">
      <body>
        <div style={paddingStyle}>
          {isLoading ? (
            <LoadingMessage />
          ) : !isTMA ? (
            <NotTMAWarning />
          ) : !isVertical ? (
            <HorizontalWarning />
          ) : (
            children
          )}
        </div>
      </body>
    </html>
  );
}
