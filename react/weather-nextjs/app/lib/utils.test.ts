import { cartesianProduct } from "./utils";

describe('cartesianProduct', () => {
  test('should handle single keys', () => {

    const singleItemResult = cartesianProduct({ one: ['a'] });
    expect(singleItemResult).toEqual([
      { one: 'a' }
    ]);

    const singleKeyResult = cartesianProduct({ one: ['a', 'b', 'c'] });
    expect(singleKeyResult).toEqual([
      { one: 'a' },
      { one: 'b' },
      { one: 'c' }
    ]);
  })

  test('should handle two keys', () => {
    const singleKeyResult = cartesianProduct({ one: ['a', 'b', 'c'], two: ['d', 'e', 'f'] });
    expect(singleKeyResult).toEqual([
      { one: 'a', two: 'd' },
      { one: 'a', two: 'e' },
      { one: 'a', two: 'f' },
      { one: 'b', two: 'd' },
      { one: 'b', two: 'e' },
      { one: 'b', two: 'f' },
      { one: 'c', two: 'd' },
      { one: 'c', two: 'e' },
      { one: 'c', two: 'f' }
    ]);
  })

  test('should handle multiple keys', () => {
    const singleKeyResult = cartesianProduct({ one: ['a', 'b', 'c'], two: ['d', 'e', 'f'], three: ['g', 'h', 'i'], four: ['j', 'k', 'l'] });
    expect(singleKeyResult.length).toEqual(81);
  })
})