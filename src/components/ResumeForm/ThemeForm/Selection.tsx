import type { GeneralSetting } from "@/app/lib/redux/settingsSlice";
import { PX_PER_PT } from "@/app/lib/constants";
import {
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
  FONT_FAMILY_TO_DISPLAY_NAME,
  type FontFamily,
} from "@/components/fonts/constants";
import { getAllFontFamiliesToLoad } from "@/components/fonts/lib";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";

const Selection = ({
  selectedColor,
  isSelected,
  style = {},
  onClick,
  children,
}: {
  selectedColor: string;
  isSelected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const selectedStyle = {
    color: "white",
    backgroundColor: selectedColor,
    borderColor: selectedColor,
    ...style,
  };

  return (
    <div
      className={styles["selection-container"]}
      onClick={onClick}
      style={isSelected ? selectedStyle : style}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const SelectionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["selection-wrapper"]}>{children}</div>;
};

const FontFamilySelections = ({
  selectedFontFamily,
  themeColor,
  handleSettingsChange,
}: {
  selectedFontFamily: string;
  themeColor: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const allFontFamilies = getAllFontFamiliesToLoad();
  return (
    <SelectionsWrapper>
      {allFontFamilies.map((fontFamily, idx) => {
        const isSelected = selectedFontFamily === fontFamily;
        const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${standardSizePt * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontFamily", fontFamily)}
          >
            {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

/**
 * Load FontFamilySelections client side since it calls getAllFontFamiliesToLoad,
 * which uses navigator object that is only available on client side
 */
export const FontFamilySelectionsCSR = dynamic(
  () => Promise.resolve(FontFamilySelections),
  {
    ssr: false,
  }
);

export const FontSizeSelections = ({
  selectedFontSize,
  fontFamily,
  themeColor,
  handleSettingsChange,
}: {
  fontFamily: FontFamily;
  themeColor: string;
  selectedFontSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
  const compactSizePt = standardSizePt - 1;

  return (
    <SelectionsWrapper>
      {["Compact", "Standard", "Large"].map((type, idx) => {
        const fontSizePt = String(compactSizePt + idx);
        const isSelected = fontSizePt === selectedFontSize;
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${Number(fontSizePt) * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontSize", fontSizePt)}
          >
            {type}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

export const DocumentSizeSelections = ({
  selectedDocumentSize,
  themeColor,
  handleSettingsChange,
}: {
  themeColor: string;
  selectedDocumentSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  return (
    <SelectionsWrapper>
      {["Letter", "A4"].map((type, idx) => {
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={type === selectedDocumentSize}
            onClick={() => handleSettingsChange("documentSize", type)}
          >
            <div className={styles["doc-size-selection"]}>
              <div>{type}</div>
              <div className="text-xs">
                {type === "Letter" ? "(US, Canada)" : "(other countries)"}
              </div>
            </div>
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};
