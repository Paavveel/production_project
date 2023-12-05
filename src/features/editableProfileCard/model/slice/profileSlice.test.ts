import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCard';
import { profileActions, profileReducer } from './profileSlice';
import { ValidateProfileError } from '../consts/consts';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  lastname: 'Tomilin',
  first: 'Pavel',
  city: 'asf',
  currency: Currency.USD,
};

describe('profileSlice', () => {
  it('should set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: true };
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false))).toEqual({ readonly: false });
  });
  it('should cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
      data,
      readonly: true,
      form: data,
      validateErrors: undefined,
    });
  });
  it('should update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: 'test' } };
    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: 'test' }))).toEqual({
      form: { username: 'test' },
    });
  });

  it('should fetch profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, error: '123' };
    expect(profileReducer(state as ProfileSchema, fetchProfileData.pending)).toEqual({
      isLoading: true,
      error: undefined,
    });
  });
  it('should fetch profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      data: undefined,
      form: undefined,
    };
    expect(profileReducer(state as ProfileSchema, fetchProfileData.fulfilled(data, '1', ''))).toEqual({
      isLoading: false,
      data,
      form: data,
    });
  });

  it('should update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });
  it('should update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: undefined,
      data: undefined,
      form: undefined,
    };
    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({
      isLoading: false,
      data,
      form: data,
      readonly: true,
      validateErrors: undefined,
    });
  });
});
