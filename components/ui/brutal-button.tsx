import type { ComponentPropsWithRef, CSSProperties } from "react";
import styles from "./brutal-button.module.css";

type BrutalStyleProps = {
  color?: string;
  textColor?: string;
  hasBorder?: boolean;
  borderColor?: string;
  hasShadow?: boolean;
  shadowColor?: string;
  radius?: number;
};

type ButtonProps = ComponentPropsWithRef<"button"> & { href?: never };
type LinkProps = ComponentPropsWithRef<"a"> & { href: string };

export type BrutalButtonProps = BrutalStyleProps & (ButtonProps | LinkProps);

export function BrutalButton({
  className,
  color = "var(--color-cream)",
  textColor = "var(--color-ink)",
  hasBorder = true,
  borderColor = "var(--color-ink)",
  hasShadow = true,
  shadowColor = "var(--color-ink)",
  radius = 0,
  style,
  ...props
}: BrutalButtonProps) {
  const appearance = {
    className: className ? `${styles.control} ${className}` : styles.control,
    "data-border": hasBorder,
    "data-shadow": hasShadow,
    style: {
      "--btn-bg": color,
      "--btn-text": textColor,
      "--btn-border": borderColor,
      "--btn-shadow": shadowColor,
      "--btn-radius": `${radius}px`,
      ...style,
    } as CSSProperties,
  };

  if (props.href !== undefined) {
    return <a {...props} {...appearance} />;
  }

  return <button type="button" {...props} {...appearance} />;
}
