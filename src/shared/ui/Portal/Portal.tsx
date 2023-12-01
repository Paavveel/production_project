import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  element?: HTMLElement;
  children: ReactNode;
}

export const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element);
