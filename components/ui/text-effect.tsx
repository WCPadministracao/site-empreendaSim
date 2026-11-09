"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

const sequence: Variants = {
  visible: { transition: { staggerChildren: 0.25 } },
};

const word: Variants = {
  hidden: { opacity: 0, transform: "translateY(0.2em)" },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
  },
};

export function TextEffect({ children, className }: { children: string; className?: string }) {
  const words = children.split(/\s+/);

  return (
    <p className={className}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={sequence}
        className="block"
      >
        {words.map((text, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <motion.span
              variants={word}
              className="inline-block motion-reduce:transform-none! motion-reduce:opacity-100!"
            >
              {text}
            </motion.span>
          </Fragment>
        ))}
      </motion.span>
    </p>
  );
}
