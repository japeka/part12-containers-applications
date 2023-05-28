import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders firstone todo', () => {
  render(<Todo todo={{text: 'firstone', done: false}} onClickDelete={()=>{}} onClickComplete={()=>{}}/>);
  const linkElement = screen.getByText(/firstone/i);
  expect(linkElement).toBeInTheDocument();
});