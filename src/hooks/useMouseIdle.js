import { useState, useEffect, useRef } from "react";

const formatIdleTime = (lastMoveTime) => {
  const MILLISECONDS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;

  const elapsedMilliseconds = Date.now() - lastMoveTime;
  const elapsedSeconds = Math.floor(
    elapsedMilliseconds / MILLISECONDS_IN_SECOND
  );

  // Handle zero duration case
  if (elapsedSeconds === 0) {
    return "0 seconds";
  }

  // Handle durations less than a minute
  if (elapsedSeconds < SECONDS_IN_MINUTE) {
    const suffix = elapsedSeconds === 1 ? "second" : "seconds";
    return `${elapsedSeconds} ${suffix}`;
  }

  // Handle durations of a minute or more
  const minutes = Math.floor(elapsedSeconds / SECONDS_IN_MINUTE);
  const remainingSeconds = elapsedSeconds % SECONDS_IN_MINUTE;
  return `${minutes}m ${remainingSeconds}s`;
};

export const useMouseIdle = (opts = {}) => {
  const { refreshInterval = 200, enable = true } = opts;

  const lastMoveTimeRef = useRef(Date.now());
  const isMouseOnDocumentRef = useRef(true);
  const [formattedTime, setFormattedTime] = useState("0 seconds");

  useEffect(() => {
    if (!enable) return;

    const handleMouseMove = () => {
      lastMoveTimeRef.current = Date.now();
    };

    const handleMouseEnter = () => {
      isMouseOnDocumentRef.current = true;
      lastMoveTimeRef.current = Date.now();
    };

    const handleMouseLeave = () => {
      isMouseOnDocumentRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enable]);

  useEffect(() => {
    if (!enable) return;

    const interval = setInterval(() => {
      if (isMouseOnDocumentRef.current) {
        setFormattedTime(formatIdleTime(lastMoveTimeRef.current));
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, enable]);

  return { lastMoveTime: lastMoveTimeRef.current, formattedTime };
};
