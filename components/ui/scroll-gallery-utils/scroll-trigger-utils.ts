/** Helpers for the gallery's window or optional embedded scroll container. */
export function isWindowScroller(scroller: Element | Window) {
  return scroller === window;
}

export async function waitForScrollerReady(_scroller: Element | Window) {
  await document.fonts.ready;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

export function observeWindowResize(callback: () => void) {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let frame = 0;
  const resize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      // Mobile browser toolbars change height during scrolling; preserve the pin.
      if (nextWidth === width && (nextWidth < 1024 || nextHeight === height)) return;
      width = nextWidth;
      height = nextHeight;
      callback();
    });
  };
  window.addEventListener("resize", resize, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
}
