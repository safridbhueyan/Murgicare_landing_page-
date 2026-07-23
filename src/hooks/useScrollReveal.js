import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — lightweight scroll-triggered reveal animation hook.
 * Adds the `.revealed` class when the element enters the viewport.
 * Also supports staggered children via `[data-reveal-child]`.
 *
 * @param {Object} options
 * @param {number} options.threshold — visibility ratio to trigger (0-1)
 * @param {string} options.rootMargin — IntersectionObserver rootMargin
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('revealed');
          // Stagger children
          const children = node.querySelectorAll('[data-reveal-child]');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.08}s`;
            child.classList.add('child-revealed');
          });
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
