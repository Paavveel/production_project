import { Counter } from 'entities/Counter';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

interface MainPageProps {
  className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Главная страница')}
      <Counter />
    </Page>
  );
};

export default MainPage;
