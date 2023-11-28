import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  data,
  isLoading,
  error,
  readonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry,
}) => {
  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  if (isLoading)
    return (
      <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </HStack>
    );
  if (error)
    return (
      <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );

  return (
    <VStack gap='16' max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify='center' max>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid='ProfileCard.firstname'
      />
      <Input
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid='ProfileCard.lastname'
      />
      <Input
        value={data?.age}
        placeholder={t('Ваша возраст')}
        onChange={onChangeAge}
        readonly={readonly}
        data-testid='ProfileCard.age'
      />
      <Input
        value={data?.city}
        placeholder={t('Город')}
        onChange={onChangeCity}
        readonly={readonly}
        data-testid='ProfileCard.city'
      />
      <Input
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
        data-testid='ProfileCard.username'
      />
      <Input
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
        onChange={onChangeAvatar}
        readonly={readonly}
        data-testid='ProfileCard.avatar'
      />
      <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
      <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
    </VStack>
  );
};
