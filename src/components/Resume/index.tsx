"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "@/components/Resume/ResumeIFrame";
import { ResumePDF } from "@/components/Resume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "@/components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "@/components/FlexboxSpacer";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings } from "@/app/lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "@/app/lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "@/components/fonts/NonEnglishFontsCSSLoader";
import styles from './styles.module.scss';

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className={styles.container}>
        <FlexboxSpacer maxWidth={50} className={styles.spacer} />
        <div style={{ position: 'relative' }}>
          <section className={styles.section}>
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={settings.showDocumentInPDFViewer === "YES"}
            >
              <ResumePDF
                resume={resume}
                settings={settings}
                isPDF={settings.showDocumentInPDFViewer === "YES"}
              />
            </ResumeIframeCSR>
          </section>
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
