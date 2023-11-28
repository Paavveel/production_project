import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { profileReducer } from '../../model/slice/profileSlice';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin',
};

const options = {
  initialState: {
    profile: { data: profile, form: profile, readonly: true },
    user: { authData: { id: '1', username: 'admin' } },
  },
  asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
  it('change readonly', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  it('restore form values to default', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  it('should show an error', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  it('should send request', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id='1' />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
