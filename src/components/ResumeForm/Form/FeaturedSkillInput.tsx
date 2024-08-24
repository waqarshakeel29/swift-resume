import React, { useState } from "react";
import { INPUT_CLASS_NAME } from "@/components/ResumeForm/Form/InputGroup";
import styles from "./styles.module.scss";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className,
  circleColor,
}: {
  skill: string;
  rating: number;
  setSkillRating: (skill: string, rating: number) => void;
  placeholder: string;
  className?: string;
  circleColor?: string;
}) => {
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={INPUT_CLASS_NAME}
      />
      <CircleRating
        rating={rating}
        setRating={(newRating) => setSkillRating(skill, newRating)}
        circleColor={circleColor}
      />
    </div>
  );
};

const CircleRating = ({
  rating,
  setRating,
  circleColor = "#38bdf8",
}: {
  rating: number;
  setRating: (rating: number) => void;
  circleColor?: string;
}) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className={styles["feature-skilled-container"]}>
      {[...Array(numCircles)].map((_, idx) => (
        <div
          className={styles.rating}
          key={idx}
          onClick={() => setRating(idx)}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(null)}
        >
          <div
            className={styles["rating-circle"]}
            style={{
              backgroundColor:
                (hoverRating !== null && hoverRating >= idx) ||
                (hoverRating === null && rating >= idx)
                  ? circleColor
                  : "#d1d5db", //gray-300
            }}
          />
        </div>
      ))}
    </div>
  );
};
