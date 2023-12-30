import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, i) => <ArticleListItemSkeleton className={cls.card} key={i} view={view} />);

export const ArticleList = memo(
  ({ className, articles, isLoading, view = ArticleView.SMALL, target }: ArticleListProps) => {
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
      <ArticleListItem className={cls.card} key={article.id} article={article} view={view} target={target} />
    );

    if (!isLoading && !articles.length) {
      return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          <Text size={TextSize.L} title={t('Статьи не найдены')} />
        </div>
      );
    }

    return (
      <div data-testid='ArticleList' className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && getSkeletons(view)}
      </div>
    );
  }
);
