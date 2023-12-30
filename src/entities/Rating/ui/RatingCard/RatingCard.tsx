import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedBack?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const { className, onCancel, onAccept, hasFeedBack, feedbackTitle, title, rate = 0 } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starCount, setStarCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarCount(selectedStarsCount);
      if (hasFeedBack) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedBack, onAccept]
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starCount, feedback);
  }, [feedback, onAccept, starCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starCount);
  }, [onCancel, starCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input data-testid='RatingCard.Input' value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
    </>
  );

  return (
    <Card className={className} max data-testid='RatingCard'>
      <VStack gap='8' align='center'>
        <Text title={starCount ? t('Спасибо за отзыв!') : title} />
        <StarRating selectedStars={starCount} size={40} onSelect={onSelectStars} />
        <BrowserView>
          <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
            <VStack gap='32' max>
              {modalContent}
              <HStack gap='16' max justify='end'>
                <Button data-testid='RatingCard.Close' onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                  {t('Закрыть')}
                </Button>
                <Button data-testid='RatingCard.Send' onClick={acceptHandler}>
                  {t('Отправить')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
            <VStack gap='32'>
              {modalContent}
              <Button onClick={acceptHandler} size={ButtonSize.L} fullWidth>
                {t('Отправить')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </VStack>
    </Card>
  );
});
