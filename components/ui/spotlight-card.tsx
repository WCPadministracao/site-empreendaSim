"use client";

import type { PointerEvent, ReactNode } from "react";
import styles from "./spotlight-card.module.css";

export function GlowCard({ children }: { children: ReactNode }) {
  function moveSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const { left, top } = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - top}px`);
  }

  return (
    <div className={styles.card} onPointerMove={moveSpotlight}>
      {children}
    </div>
  );
}
