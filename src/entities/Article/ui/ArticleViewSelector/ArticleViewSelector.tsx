import { memo } from 'react';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: TiledIcon },
  { view: ArticleView.BIG, icon: ListIcon },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType, i) => (
        <Button key={i} theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)}>
          <Icon className={classNames('', { [cls.selected]: viewType.view === view })} Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  );
});
