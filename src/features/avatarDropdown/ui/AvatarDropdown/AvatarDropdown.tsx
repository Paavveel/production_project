import { Dropdown } from 'shared/ui/Popups';
import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface NotificationButtonProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: NotificationButtonProps) => {
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) return null;

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [{ content: t('Админка'), href: RoutePath.admin_panel }] : []),
        { content: t('Профиль'), href: RoutePath.profile + authData.id },
        { content: t('Выйти'), onClick: onLogout },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
      direction='bottom left'
    />
  );
});
