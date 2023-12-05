import React, { FC } from 'react';
import './Loader.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
  <div className={classNames('lds-ellipsis', {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
