import { counterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
  it('increment', () => {
    const state: CounterSchema = {
      value: 10,
    };
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
  });

  it('decrement', () => {
    const state: CounterSchema = {
      value: 10,
    };
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
  });

  it('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});
