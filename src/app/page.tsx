"use client";

import { useAppStore } from "@/store/appStore";
import { viewport } from "@tma.js/sdk-react";

export default function HomePage() {
  const { safeArea, contentSafeArea, isVertical } = useAppStore();

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Добро пожаловать в reList</h1>
      <div>
        <br />
        {`Viewport: width:${viewport.width()} height:${viewport.height()}`}
        <br />
        {`ContentSafeArea: top:${contentSafeArea.top} left:${contentSafeArea.left} right:${contentSafeArea.right} bottom:${contentSafeArea.bottom}`}
        <br />
        {`SafeArea: top:${safeArea.top} left:${safeArea.left} right:${safeArea.right} bottom:${safeArea.bottom}`}
        <br />
        {`Вертикально: ${isVertical ? "вертикально" : "горизонтально"}`}
        <br />
      </div>
    </main>
  );
}
