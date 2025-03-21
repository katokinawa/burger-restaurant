import { initialState, orderDetail } from './order-detail'

describe("Redux store or orderDetail", () => {
  it("should return the initial state", () => {
    expect(orderDetail(undefined, { type: "" } as any)).toEqual(initialState);
  });
});

