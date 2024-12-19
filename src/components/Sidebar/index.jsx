import React, { memo } from "react";
import {
  useFeatureFlags,
  FEATURE_LABELS,
} from "../../contexts/FeatureFlagContext";
import styles from "./styles.module.css";

const FeatureToggle = memo(({ featureKey, label, isActive, onToggle }) => (
  <li
    className={`${styles.featureItem} ${isActive ? styles.active : ""}`}
    data-testid={`feature-toggle-${featureKey}`}
  >
    <button
      onClick={() => onToggle(featureKey)}
      aria-pressed={isActive}
      className={styles.featureButton}
    >
      <span className={styles.icon} aria-hidden="true">
        {isActive ? "💠" : "🔻"}
      </span>
      <span>{label}</span>
    </button>
  </li>
));

const Sidebar = () => {
  const { setFeatureFlags, featureFlags } = useFeatureFlags();

  const handleToggle = (key) => {
    setFeatureFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <aside
      role="complementary"
      aria-label="Feature flag controls"
      className={styles.sidebar}
    >
      <nav aria-label="Feature flags">
        <h2 className={styles.title}>Feature flags</h2>
        <hr className={styles.divider} />
        <ul className={styles.featureList} role="list">
          {Object.entries(FEATURE_LABELS).map(([key, label]) => (
            <FeatureToggle
              key={key}
              featureKey={key}
              label={label}
              isActive={featureFlags[key]}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
