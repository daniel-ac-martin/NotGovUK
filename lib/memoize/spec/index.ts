import memoize from '../src';
import { jest } from '@jest/globals';

describe('memoize', () => {
  it('is a function', () => expect(memoize).toBeInstanceOf(Function));
  it('that takes one parameter', () => expect(memoize.length).toEqual(1));

  describe('when given a pure function', () => {
    const pureFn = (s: string) => s.length;
    const origFn = jest.fn(pureFn);
    const memoFn = memoize(origFn);

    it('returns a function', () => expect(memoFn).toBeInstanceOf(Function));
    it('of the same length as the original', () => expect(memoFn.length).toEqual(origFn.length));

    describe('that when called', () => {
      const param = 'foo';
      const result = pureFn(param);
      const memoResult = memoFn(param);

      it('returns the same result as the original', () => expect(memoResult).toEqual(result));
      it('by calling the original function', () => expect(origFn).toHaveBeenCalled());
      it('by calling the original function with the same parameter', () => expect(origFn).toHaveBeenCalledWith(param));
      it('by calling the original function once', () => expect(origFn).toHaveBeenCalledTimes(1));

      describe('and when called again with the same parameter', () => {
        const currentCallNumber = origFn.mock.calls.length;
        const memoResult2 = memoFn(param);

        it('returns the same result as before', () => expect(memoResult2).toEqual(memoResult));
        it('without calling the original function', () => expect(origFn).toHaveBeenCalledTimes(currentCallNumber));
      });
    });
  });
});
