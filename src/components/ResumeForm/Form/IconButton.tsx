import cx from 'classnames';
import { IconButton } from "@/components/Button";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  TrashIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import styles from './styles.module.scss';

export const ShowIconButton = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const tooltipText = show ? "Hide section" : "Show section";
  const onClick = () => {
    setShow(!show);
  };
  const Icon = show ? EyeIcon : EyeSlashIcon;

  return (
    <IconButton onClick={onClick} tooltipText={tooltipText}>
      <Icon className={styles['show-icon-button']} aria-hidden="true" />
      <span className={styles["sr-only"]}>{tooltipText}</span>
    </IconButton>
  );
};



type MoveIconButtonType = "up" | "down";

export const MoveIconButton = ({
  type,
  size = "medium",
  onClick,
}: {
  type: MoveIconButtonType;
  size?: "small" | "medium";
  onClick: (type: MoveIconButtonType) => void;
}) => {
  const tooltipText = type === "up" ? "Move up" : "Move down";
  const Icon = type === "up" ? ArrowSmallUpIcon : ArrowSmallDownIcon;

  // Use classNames to merge the SCSS classes
  const sizeClassName = cx({
    'icon-size-medium': size === 'medium',
    'icon-size-small': size === 'small',
  });

  return (
    <IconButton
      onClick={() => onClick(type)}
      tooltipText={tooltipText}
      size={size}
    >
      <Icon
        className={cx(sizeClassName, 'icon-color-gray')}
        aria-hidden="true"
      />
      <span className={styles["sr-only"]}>{tooltipText}</span>
    </IconButton>
  );
};

export const DeleteIconButton = ({
  onClick,
  tooltipText,
}: {
  onClick: () => void;
  tooltipText: string;
}) => {
  return (
    <IconButton onClick={onClick} tooltipText={tooltipText} size="small">
      <TrashIcon
        className={cx(styles['icon-size-small'], styles['icon-color-gray'])}
        aria-hidden="true"
      />
      <span className={styles['sr-only']}>{tooltipText}</span>
    </IconButton>
  );
};

export const BulletListIconButton = ({
  onClick,
  showBulletPoints,
}: {
  onClick: (newShowBulletPoints: boolean) => void;
  showBulletPoints: boolean;
}) => {
  const tooltipText = showBulletPoints
    ? "Hide bullet points"
    : "Show bullet points";

  return (
    <IconButton
      onClick={() => onClick(!showBulletPoints)}
      tooltipText={tooltipText}
      size="small"
      className={cx({ [styles['bg-sky-100']]: showBulletPoints })}
    >
      <ListBulletIcon
        className={cx(
          styles['icon-size-small'],
          showBulletPoints ? styles['icon-color-gray-700'] : styles['icon-color-gray-400']
        )}
        aria-hidden="true"
      />
      <span className={styles['sr-only']}>{tooltipText}</span>
    </IconButton>
  );
};