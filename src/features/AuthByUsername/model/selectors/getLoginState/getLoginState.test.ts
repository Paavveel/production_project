import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
  it('should return state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'admin',
        password: '123123',
        isLoading: true,
        error: 'error',
      },
    };
    expect(getLoginState(state as StateSchema)).toEqual({
      username: 'admin',
      password: '123123',
      isLoading: true,
      error: 'error',
    });
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
