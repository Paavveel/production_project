import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { useGetArticleRecommendationsListQuery } from '../../api/ArticleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: ArticleRecommendationsListProps) => {
  const { t } = useTranslation();
  const { data: articles, isLoading, error } = useGetArticleRecommendationsListQuery(3);

  if (isLoading || error) {
    return null;
  }

  return (
    <VStack gap='8' className={classNames('', {}, [className])}>
      <Text size={TextSize.L} title={t('Рекомендуем')} />
      <ArticleList articles={articles ?? []} target='_blank' />
    </VStack>
  );
});
