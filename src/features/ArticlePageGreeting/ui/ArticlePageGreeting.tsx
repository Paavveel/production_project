import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Text } from '@/shared/ui/Text/Text';
import { useJsonSettings } from '@/entities/User/model/selectors/jsonSettings';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpen } = useJsonSettings();
  const dispatch = useAppDispatch();

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
    />
  );

  useEffect(() => {
    if (!isArticlePageWasOpen) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpen: true }));
    }
  }, [dispatch, isArticlePageWasOpen]);

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
