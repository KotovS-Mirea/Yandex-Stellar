import reducer from '../appInitStateSlice';
import { initialState } from '../appInitStateSlice';

describe('rootReducer (appInitSlice.reducer)', () => {
  //Init state verification
  it('should return initial state when called with undefined', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  // state preservation verification
  it('should not mutate state for unknown action', () => {
    const testState = { ...initialState, isModalOpen: true };
    const result = reducer(testState, { type: 'UNKNOWN_ACTION' });
    expect(result).toBe(testState);
    expect(result).toEqual(testState);
  });
});
