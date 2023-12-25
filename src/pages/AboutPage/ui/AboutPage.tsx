import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

interface AboutPageProps {
  className?: string;
}

const AboutPage: FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation('about');

  return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
};

export default AboutPage;
