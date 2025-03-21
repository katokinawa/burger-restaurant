import { initialState, websocket } from "./websocket"

describe("Redux store or websocket", () => {
  it("should return the initial state", () => {
    expect(websocket(undefined, { type: "" } as any)).toEqual(initialState);
  });
});

