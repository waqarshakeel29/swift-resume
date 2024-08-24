import { BaseForm } from "@/components/ResumeForm/Form";
import { InputGroupWrapper } from "@/components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "@/components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "@/components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "@/components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
} from "@/app/lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import type { FontFamily } from "@/components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import styles from './styles.module.scss';

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm>
      <div className={styles['container']}>
        <div className={styles['settings-container']}>
          <Cog6ToothIcon className={styles['settings-container__icon']} aria-hidden="true" />
          <h1 className={styles['settings-container__heading']}>
            Resume Setting
          </h1>
        </div>
        <div>
          <InlineInput
            label="Theme Color"
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            inputStyle={{ color: themeColor }}
          />
          <div className={styles['theme-container']}>
            {THEME_COLORS.map((color, idx) => (
              <div
                className={styles['theme-container__item']}
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key))
                    handleSettingsChange("themeColor", color);
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "✓" : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Font Size (pt)"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
