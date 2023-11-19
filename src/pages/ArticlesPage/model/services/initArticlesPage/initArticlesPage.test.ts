import { ArticleSortField } from 'entities/Article';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage', () => {
  it('success', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        limit: 4,
        isLoading: false,
        hasMore: true,
        _inited: false,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
      },
    });

    await thunk.callThunk(new URLSearchParams());

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalled();
  });

  it('success with searchParams', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        ids: [],
        entities: {},
        limit: 4,
        isLoading: false,
        hasMore: true,
        _inited: false,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
      },
    });

    await thunk.callThunk(
      new URLSearchParams({
        sort: ArticleSortField.TITLE,
        order: 'desc',
        search: 'asd',
      })
    );

    expect(thunk.dispatch).toHaveBeenCalledTimes(7);
  });

  it('fetchArticlesList not called', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
        _inited: true,
      },
    });

    await thunk.callThunk(new URLSearchParams());

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
