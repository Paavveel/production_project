import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MainPageProps {
  className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation('main');

  return <div>{t('Главная страница')}</div>;
};

export default MainPage;
