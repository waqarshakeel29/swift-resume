"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "@/components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import styles from "./ResumeControlBar.module.scss";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  // Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [update, document]);

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <MagnifyingGlassIcon className={styles.icon} aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div
          style={{
            width: "2.5rem" /* 10 * 0.25rem (base unit) = 2.5rem */,
          }}
        >{`${Math.round(scale * 100)}%`}</div>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            className={styles["checkbox__input"]}
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span
            style={{
              userSelect: "none",
            }}
          >
            Autoscale
          </span>
        </label>
      </div>
      <a
        className={styles["download-resume"]}
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className={styles.icon} />
        <span className={styles["download-resume__text"]}>Download Resume</span>
      </a>
    </div>
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
