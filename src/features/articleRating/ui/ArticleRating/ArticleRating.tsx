import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRatingQuery, useRateArticleMutation } from '@/features/articleRating/api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRatingQuery({ articleId, userId: userData?.id ?? '' });
  const [rateArticleMutation] = useRateArticleMutation();

  const rating = data?.[0];

  const handleArticleMutation = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({ userId: userData?.id ?? '', articleId, rate: starsCount, feedback });
      } catch (e) {
        console.error(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleArticleMutation(starsCount, feedback);
    },
    [handleArticleMutation]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleArticleMutation(starsCount);
    },
    [handleArticleMutation]
  );

  if (isLoading) return <Skeleton width='100%' height={120} />;

  return (
    <RatingCard
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв о статье, это поможет лучшить качество')}
      hasFeedBack
    />
  );
});

export default ArticleRating;
