import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollRestorationByPath, scrollRestorationActions } from 'features/ScrollRestoration';
import { MutableRefObject, ReactNode, UIEvent, memo, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollRestorationByPath(state, pathname));

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollRestorationActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
  }, 500);

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  });

  useLayoutEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });
  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])} onScroll={onScroll}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});