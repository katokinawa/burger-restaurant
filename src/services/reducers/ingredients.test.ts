import { initialState, ingredients } from './ingredients'

describe("Redux store or ingredients", () => {
  it("should return the initial state", () => {
    expect(ingredients(undefined, { type: "" } as any)).toEqual(initialState);
  });
});

