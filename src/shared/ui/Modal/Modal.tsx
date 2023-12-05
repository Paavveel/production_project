import { ReactNode } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../../ui/Overlay/Overlay';

interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  children: ReactNode;
}

export const Modal = ({ className, children, isOpen, onClose, lazy }: ModalProps) => {
  const { close, isMounted, isClosing } = useModal({ isOpen, onClose, animationDelay: 300 });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
