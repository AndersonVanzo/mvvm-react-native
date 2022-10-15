import { LoginViewModel } from "../model";
import LoginView from "../view";
import renderer from 'react-test-renderer';
import useLoginViewModel from "../view.model";

jest.mock('../view.model', () => {
  const fnLoginViewModel = jest.fn();
  fnLoginViewModel.mockImplementation(() => ({
    email: '',
    password: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  } as LoginViewModel));

  return fnLoginViewModel;
});

it('should render correctly', () => {
  const { toJSON } = renderer.create(<LoginView />);
  expect(toJSON()).toMatchSnapshot();
});

it('should render correctly with email', () => {
  // @ts-ignore
  useLoginViewModel.mockImplementation(() => ({
    email: 'test@mail.com',
    password: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  } as LoginViewModel));
  const { toJSON } = renderer.create(<LoginView />);
  expect(toJSON()).toMatchSnapshot();
});

it('should render correctly with password', () => {
  // @ts-ignore
  useLoginViewModel.mockImplementation(() => ({
    email: '',
    password: 'test',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  } as LoginViewModel));
  const { toJSON } = renderer.create(<LoginView />);
  expect(toJSON()).toMatchSnapshot();
});

it('should render correctly with email and password', () => {
  // @ts-ignore
  useLoginViewModel.mockImplementation(() => ({
    email: 'test@mail.com',
    password: 'test',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  } as LoginViewModel));
  const { toJSON } = renderer.create(<LoginView />);
  expect(toJSON()).toMatchSnapshot();
});

it('should render correctly while loading', () => {
  // @ts-ignore
  useLoginViewModel.mockImplementation(() => ({
    email: '',
    password: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isLoading: true,
    onSubmit: jest.fn(),
  } as LoginViewModel));
  const { toJSON } = renderer.create(<LoginView />);
  expect(toJSON()).toMatchSnapshot();
});