import { ChangeEvent, FC, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select: FC<SelectProps> = memo(({ className, label, options, value, onChange, readonly }: SelectProps) => {
  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option key={opt.value} className={cls.option} value={value}>
          {opt.content}
        </option>
      )),
    [options, value]
  );

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readonly}>
        {optionsList}
      </select>
    </div>
  );
});
