"use client";

import React, { ReactNode } from "react";
import "./globals.css";
import { useAppStore } from "@/store/appStore";
import { useAppInit } from "@/features/appInit/useAppInit";
import { LoadingMessage } from "@/components/messages/LoadingMessage";
import { NotTMAWarning } from "@/components/messages/NotTMAWarning";
import { HorizontalWarning } from "@/components/messages/HorizontalWarning";

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
