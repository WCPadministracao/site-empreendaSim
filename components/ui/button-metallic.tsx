"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ComponentPropsWithRef } from "react";
import styles from "./button-metallic.module.css";

type ButtonProps = ComponentPropsWithRef<"button"> & { href?: never };
type LinkProps = ComponentPropsWithRef<"a"> & { href: string };

export type MetallicButtonProps = (ButtonProps | LinkProps) & {
  size?: "sm" | "md" | "icon";
  paused?: boolean;
};

const rimDrift: Transition = {
  duration: 8,
  ease: [0.77, 0, 0.175, 1],
  repeat: Infinity,
};

export function MetallicButton({
  size = "md",
  paused = false,
  className,
  children,
  ...props
}: MetallicButtonProps) {
  const reducedMotion = useReducedMotion();
  const still = paused || reducedMotion;
  const appearance = {
    className: className ? `${styles.control} ${className}` : styles.control,
    "data-size": size,
    "data-still": Boolean(still),
  };

  const content = (
    <>
      <span aria-hidden="true" className={styles.edge}>
        <motion.span
          className={styles.rim}
          initial={{ transform: "translateX(0%)" }}
          animate={{
            transform: still
              ? "translateX(0%)"
              : ["translateX(0%)", "translateX(13%)", "translateX(0%)"],
          }}
          transition={still ? { duration: 0 } : rimDrift}
        />
        <span className={styles.reflection} />
      </span>
      <span className={styles.content}>{children}</span>
    </>
  );

  if (props.href !== undefined) {
    return <a {...props} {...appearance}>{content}</a>;
  }

  return <button type="button" {...props} {...appearance}>{content}</button>;
}

export default MetallicButton;
