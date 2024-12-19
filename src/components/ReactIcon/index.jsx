import React, { memo, useRef } from "react";
import reactLogo from "../../assets/react.svg";
import { useMouseDistanceBasedSize } from "../../hooks/useMouseDistanceBasedSize";
import { useRotateOnClick } from "../../hooks/useRotateOnClick";
import { useFeatureFlags } from "../../contexts/FeatureFlagContext";

const ReactIcon = () => {
  const { featureFlags } = useFeatureFlags();

  const { handleClick, classNames } = useRotateOnClick({
    enabled: featureFlags["clickIconToRotate"],
  });

  const logoRef = useRef(null);

  const iconSize = useMouseDistanceBasedSize(logoRef, {
    enabled: featureFlags["resizeIconOnMouseMove"],
  });

  return (
    <img
      ref={logoRef}
      onClick={handleClick}
      src={reactLogo}
      className={`logo react ${classNames}`}
      alt="React logo"
      style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
    />
  );
};

export default memo(ReactIcon);
