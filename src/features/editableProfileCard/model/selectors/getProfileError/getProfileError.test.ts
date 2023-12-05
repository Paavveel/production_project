import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
  it('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: '123',
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual('123');
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
