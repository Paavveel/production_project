import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = ({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton border='50%' width={30} height={30} />
          <Skeleton className={cls.username} width={100} height={16} />
        </div>
        <Skeleton className={cls.text} width='100%' height={50} />
      </div>
    );
  }

  if (!comment) return null;

  return (
    <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={getRouteProfile(comment.user.id)}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  );
};
