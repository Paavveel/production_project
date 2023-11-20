import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
  state.articlesDetailsPage?.recommendations?.isLoading || false;
export const getArticleRecommendationsError = (state: StateSchema) => state.articlesDetailsPage?.recommendations?.error;
