import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  lastname: 'Tomilin',
  first: 'Pavel',
  city: 'asf',
  currency: Currency.USD,
};

describe('validateProfileData', () => {
  it('success', async () => {
    const result = validateProfileData(data);
    expect(result).toEqual([]);
  });

  it('without firs and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  it('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  it('incorrect all', async () => {
    const result = validateProfileData({ ...data, country: undefined, age: undefined, first: '' });
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  it('no data', async () => {
    const result = validateProfileData();
    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });
});
