import React, { createContext, useContext, useState } from "react";

const FeatureFlagContext = createContext();

export const FEATURE_LABELS = {
  clickIconToRotate: "Click Icon to Rotate",
  resizeIconOnMouseMove: "Resize Icon on Mouse Move",
  displayMoveIdleTime: "Display Move Idle Time",
};

const functionalityDefaultState = {
  clickIconToRotate: true,
  resizeIconOnMouseMove: true,
  displayMoveIdleTime: true,
};

export const FeatureFlagProvider = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState(functionalityDefaultState);

  const value = {
    featureFlags,
    setFeatureFlags,
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider"
    );
  }
  return context;
};
