import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, i) => <ArticleListItemSkeleton className={cls.card} key={i} view={view} />);

export const ArticleList = memo(({ className, articles, isLoading, view = ArticleView.SMALL }: ArticleListProps) => {
  const renderArticle = (article: Article) => (
    <ArticleListItem className={cls.card} key={article.id} article={article} view={view} />
  );

  if (isLoading) {
    return <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>{getSkeletons(view)}</div>;
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  );
});
