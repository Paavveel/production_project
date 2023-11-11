import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>{t('ArticleDetailsPage')}</div>;
};

export default memo(ArticleDetailsPage);
