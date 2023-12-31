import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { addCommentFormReducer } from '@/features/addCommentForm';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articlesDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <StoryComponent />
    </StoreProvider>
  );
