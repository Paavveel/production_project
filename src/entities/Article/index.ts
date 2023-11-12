export { articleDetailsReducer, articleDetailsActions } from './model/slice/ArticleDetailsSlice';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export type { Article } from './model/types/article';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
  getArticleDetailsError,
} from './model/selectors/articleDetails';
