import MockAdapter from 'axios-mock-adapter';
import client from '../../../repositories/client';
import { UserModel } from '../../../common/user.model';
import { renderHook, act } from '@testing-library/react-hooks';
import useLoginViewModel from '../view.model';
import { Alert } from 'react-native';

const mock = new MockAdapter(client);

it('should be able to login', async () => {
  const user: UserModel = { id: '1', name: 'Test Account', email: 'test@mail.com' }
  const pass = 'test';
  mock.onPost('/sessions').reply(200, user);
  const { result, waitFor } = renderHook(() => useLoginViewModel());

  act(() => result.current.setEmail(user.email));
  await waitFor(() => result.current.email == user.email);

  act(() => result.current.setPassword(pass));
  await waitFor(() => result.current.password == pass);

  await act(() => result.current.onSubmit());
  await waitFor(() => result.current.isLoading == false);

  expect(result.current.isLoading).toBe(false);
  expect(result.current.email).toBe(user.email);
  expect(result.current.password).toBe(pass);
  expect(mock.history.post[0].url).toEqual('/sessions');
  expect(mock.history.post[0].data).toEqual(JSON.stringify({ email: user.email, password: pass }));

  mock.resetHistory();
});

it('should break on login', async () => {
  const email = 'test@mail.com';
  const pass = 'test';
  const alert = jest.spyOn(Alert, 'alert');
  mock.onPost('/sessions').reply(404, 'User not found');
  
  const { result, waitFor } = renderHook(() => useLoginViewModel());

  act(() => result.current.setEmail(email));
  await waitFor(() => result.current.email == email);

  act(() => result.current.setPassword(pass));
  await waitFor(() => result.current.password == pass);

  await act(() => result.current.onSubmit());
  await waitFor(() => result.current.isLoading == false);

  expect(result.current.isLoading).toBe(false);
  expect(result.current.email).toBe(email);
  expect(result.current.password).toBe(pass);
  expect(mock.history.post[0].url).toEqual('/sessions');
  expect(mock.history.post[0].data).toEqual(JSON.stringify({ email: email, password: pass }));
  expect(alert).toHaveBeenCalledWith('Oops!', 'Something went wrong!');
});