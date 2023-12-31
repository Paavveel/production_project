export { articleDetailsActions, articleDetailsReducer } from './model/slice/ArticleDetailsSlice';
export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';

export {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './model/selectors/articleDetails';

export { ArticleView, ArticleType, ArticleSortField, ArticleBlockType } from './model/consts/articleConsts';
