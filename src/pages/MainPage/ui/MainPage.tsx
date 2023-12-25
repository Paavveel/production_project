import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

interface MainPageProps {
  className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation('main');

  return <Page data-testid='MainPage'>{t('Главная страница')}</Page>;
};

export default MainPage;
