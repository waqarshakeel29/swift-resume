/**
 * FlexboxSpacer can be used to create empty space in flex.
 * It is a div that grows to fill the available space specified by maxWidth.
 * You can also set a minimum width with minWidth.
 */
export const FlexboxSpacer = ({
  maxWidth,
  minWidth = 0,
  className = "",
}: {
  maxWidth: number;
  minWidth?: number;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      flexShrink: 10000,
      flexGrow: 1,
      maxWidth: `${maxWidth}px`,
      minWidth: `${minWidth}px`,
      visibility: "hidden",
    }}
  ></div>
);
