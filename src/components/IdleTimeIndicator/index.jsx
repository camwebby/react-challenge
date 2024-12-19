import React, { memo } from "react";
import { useFeatureFlags } from "../../contexts/FeatureFlagContext";
import { useMouseIdle } from "../../hooks/useMouseIdle";

const IdleTimeIndicator = () => {
  const { featureFlags } = useFeatureFlags();

  const { formattedTime } = useMouseIdle({
    enable: featureFlags["displayMoveIdleTime"],
  });

  if (!featureFlags["displayMoveIdleTime"]) {
    return <></>;
  }

  return <p>{formattedTime}</p>;
};

export default memo(IdleTimeIndicator);
