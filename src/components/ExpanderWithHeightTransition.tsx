import cx from "classnames";
import styles from "./ExpanderWithHeightTransition.module.scss";

/**
 * ExpanderWithHeightTransition is a div wrapper with built-in transition animation based on height.
 * If expanded is true, it slowly expands its content and vice versa.
 *
 * Note: There is no easy way to animate height transition in CSS: https://github.com/w3c/csswg-drafts/issues/626.
 * This is a clever solution based on css grid and is borrowed from https://css-tricks.com/css-grid-can-do-auto-height-transitions/
 *
 */
export const ExpanderWithHeightTransition = ({
  expanded,
  children,
}: {
  expanded: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cx(styles.container, {
        [styles.visible]: expanded,
        [styles.invisible]: !expanded,
      })}
      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
    >
      <div className={styles.child}>{children}</div>
    </div>
  );
};
