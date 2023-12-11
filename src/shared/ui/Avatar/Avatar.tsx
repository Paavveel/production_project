import { CSSProperties, FC, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size, alt }) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

  return <img style={styles} src={src} alt={alt} className={classNames(cls.Avatar, mods, [className])} />;
};
