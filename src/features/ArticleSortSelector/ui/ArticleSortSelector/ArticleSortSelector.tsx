import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { ArticleSortField } from '@/entities/Article/model/consts/articleConsts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = ({
  className,
  sort,
  order,
  onChangeSort,
  onChangeOrder,
}) => {
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('возрастанию') },
      { value: 'desc', content: t('убыванию') },
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.CREATED, content: t('дате создания') },
      { value: ArticleSortField.TITLE, content: t('названию') },
      { value: ArticleSortField.VIEWS, content: t('просмотрам') },
    ],
    [t]
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select label={t('Сортировать ПО')} options={sortFieldOptions} value={sort} onChange={onChangeSort} />
      <Select className={cls.order} options={orderOptions} label={t('по')} value={order} onChange={onChangeOrder} />
    </div>
  );
};
