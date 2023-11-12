import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './articleDetails';

describe('articleDetails', () => {
  it('should return data', () => {
    const data = {
      id: '1',
      subtitle: 'subtitle',
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  it('should work with empty state data', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  it('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: false,
      },
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });

  it('should work with empty state isLoading', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });

  it('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: '123',
      },
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual('123');
  });

  it('should work with empty state error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });
});
