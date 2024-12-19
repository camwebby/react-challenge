import { useState } from "react";

export const useRotateOnClick = (opts = { enabled: true }) => {
  const [isClockwise, setIsClockwise] = useState(true);

  const handleClick = () => {
    if (!opts?.enabled) return;
    setIsClockwise(!isClockwise);
  };

  return {
    handleClick,
    classNames: isClockwise ? "rotate-clockwise" : "rotate-counterclockwise",
  };
};
