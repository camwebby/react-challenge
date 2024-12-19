import { useEffect, useState } from "react";

export const useMouseDistanceBasedSize = (ref, opts = {}) => {
  const { minSize = 10, maxSize = 150, enabled = true } = opts;
  const [size, setSize] = useState((minSize + maxSize) / 2); // Default to the midpoint size

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event) => {
      if (!ref.current) return;

      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Calculate distance from center of viewport
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Calculate vector distance from center
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(
        (innerWidth / 2) ** 2 + (innerHeight / 2) ** 2
      );

      // Map distance to size range
      const sizeRange = maxSize - minSize;
      const newSize = minSize + (distance / maxDistance) * sizeRange;

      setSize(newSize);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, minSize, maxSize, enabled]);

  return size;
};
