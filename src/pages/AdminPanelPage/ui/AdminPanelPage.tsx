import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: FC<AdminPanelPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return <Page data-testid='AdminPanelPage'>{t('Админка')}</Page>;
};

export default AdminPanelPage;
