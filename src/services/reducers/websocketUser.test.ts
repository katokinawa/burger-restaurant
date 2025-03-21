import { initialState, websocketUser } from './websocketUser'

describe("Redux store or websocketUser", () => {
  it("should return the initial state", () => {
    expect(websocketUser(undefined, { type: "" } as any)).toEqual(initialState);
  });
});

