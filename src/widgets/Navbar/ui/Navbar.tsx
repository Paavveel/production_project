import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavBarProps {
  className?: string;
}

export const Navbar: FC<NavBarProps> = ({ className }) => (
  <div className={classNames(cls.navbar, {}, [className])}>
    <div className={cls.links}>
      <AppLink className={cls.mainLink} to='/' theme={AppLinkTheme.SECONDARY}>
        Главная
      </AppLink>
      <AppLink to='/about' theme={AppLinkTheme.SECONDARY}>
        О сайте
      </AppLink>
    </div>
  </div>
);
