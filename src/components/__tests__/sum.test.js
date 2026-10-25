import { sum } from "../sum"

test("sum of arry", () => {
    const result = sum(5, 7);
    expect(result).toBe(12);
});