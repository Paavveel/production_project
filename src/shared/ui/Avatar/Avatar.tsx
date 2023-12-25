import { CSSProperties, FC, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage/AppImage';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size = 100, alt, fallbackInverted }) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);
  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = <Icon Svg={UserIcon} inverted={fallbackInverted} width={size} height={size} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      style={styles}
      src={src}
      alt={alt}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
