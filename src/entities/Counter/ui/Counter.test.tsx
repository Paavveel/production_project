import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should render correct', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  it('increment', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    const incrementButton = screen.getByTestId('increment-btn');
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  it('decrement', () => {
    componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    const decrementButton = screen.getByTestId('decrement-btn');
    fireEvent.click(decrementButton);
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
