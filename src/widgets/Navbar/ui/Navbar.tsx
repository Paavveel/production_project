import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text className={cls.appName} title={t('Production app')} theme={TextTheme.INVERTED} />
        <AppLink className={cls.createBtn} to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY}>
          {t('Создать статью')}
        </AppLink>
        <HStack className={cls.actions} gap='16'>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button className={cls.links} theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
        {t('Войти')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  );
});
