import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useGetNotificationsQuery } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data, isLoading } = useGetNotificationsQuery(null, { pollingInterval: 5000 });

  if (isLoading)
    return (
      <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
      </VStack>
    );

  return (
    <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
    </VStack>
  );
});
