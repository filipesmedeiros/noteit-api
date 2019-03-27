import * as billLib from "../libs/billing-lib";

test("Lowest tier", () => {
    const storage = 10;

    const cost = billLib.TIER_1_PRICE * storage * 100;
    const expectedCost = billLib.calculateCost(storage);

    expect(cost).toEqual(expectedCost);
});

test("Middle tier", () => {
    const storage = 100;

    const cost = billLib.TIER_2_PRICE * storage * 100;
    const expectedCost = billLib.calculateCost(storage);

    expect(cost).toEqual(expectedCost);
});

test("Highest tier", () => {
    const storage = 101;

    const cost = billLib.TIER_3_PRICE * storage * 100;
    const expectedCost = billLib.calculateCost(storage);

    expect(cost).toEqual(expectedCost);
});
