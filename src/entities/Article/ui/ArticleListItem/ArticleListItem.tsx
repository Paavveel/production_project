import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Text } from '@/shared/ui/Text/Text';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({ className, article, view, target }: ArticleListItemProps) => {
  const { t } = useTranslation();

  const types = <Text className={cls.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div data-testid='ArticleListItem' className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username} text={article.user.username} />
            <Text className={cls.date} text={article.createdAt} />
          </div>
          <Text className={cls.title} title={article.title} />
          {types}
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={<Skeleton width='100%' height={250} />}
          />
          {textBlock && <ArticleTextBlockComponent className={cls.textBlock} block={textBlock} />}
          <div className={cls.footer}>
            <AppLink to={getRouteArticleDetails(article.id)}>
              <Button>{t('Читать далее')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid='ArticleListItem'
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      target={target}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            fallback={<Skeleton width={200} height={200} />}
          />
          <Text className={cls.date} text={article.createdAt} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={cls.title} text={article.title} />
      </Card>
    </AppLink>
  );
});
