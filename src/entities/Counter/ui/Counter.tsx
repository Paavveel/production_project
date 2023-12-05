import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { counterActions } from '../modal/slice/counterSlice';
import { getCounterValue } from '../modal/selectors/getCounterValue/getCounterValue';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button data-testid='increment-btn' onClick={increment}>
        {t('increment')}
      </Button>
      <Button data-testid='decrement-btn' onClick={decrement}>
        {t('decrement')}
      </Button>
    </div>
  );
};
