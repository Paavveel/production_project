import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
  it('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123123',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('123123');
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
