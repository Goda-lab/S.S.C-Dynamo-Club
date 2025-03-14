import { render, screen } from '@testing-library/react';
import App from './App';

test('renders club name', () => {
  render(<App />);
  expect(screen.getByText(/S.S.C Dynamo Club/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Players/i)).toBeInTheDocument();
  expect(screen.getByText(/Coach/i)).toBeInTheDocument();
  expect(screen.getByText(/News/i)).toBeInTheDocument();
  expect(screen.getByText(/Matches/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

test('renders login/signup buttons for guests', () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
