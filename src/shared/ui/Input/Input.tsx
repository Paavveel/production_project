import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo(
  ({ className, type = 'text', placeholder, autofocus, value, onChange, readonly, ...otherProps }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readonly;

    const onBlur = () => {
      setIsFocused(false);
    };
    const onFocus = () => {
      setIsFocused(true);
    };
    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCaretPosition(e.target.value.length);
    };

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true);
        ref.current?.focus();
      }
    }, [autofocus]);

    const mods: Mods = {
      [cls.readonly]: readonly,
    };

    return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
        {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}

        <div className={cls.caretWrapper}>
          <input
            ref={ref}
            className={cls.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            readOnly={readonly}
            {...otherProps}
          />
          {isCaretVisible && <span className={cls.caret} style={{ left: `${caretPosition * 9}px` }} />}
        </div>
      </div>
    );
  }
);
