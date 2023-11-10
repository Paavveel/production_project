import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading', () => {
  it('should return loading state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: false,
      },
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(false);
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
