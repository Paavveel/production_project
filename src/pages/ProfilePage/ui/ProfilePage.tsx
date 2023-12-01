import { EditableProfileCard } from 'features/editableProfileCard';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames('cls.ProfilePage', {}, [className])}>
      <VStack gap='16' max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
