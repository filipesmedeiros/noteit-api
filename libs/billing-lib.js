export const TIER_1_PRICE = 4;
export const TIER_2_PRICE = 2;
export const TIER_3_PRICE = 1;
export const TIER_2_THRESHOLD = 10;
export const TIER_3_THRESHOLD = 10;

export function calculateCost(storage) {
    const rate = storage <= TIER_2_THRESHOLD
        ? TIER_1_PRICE
        : storage <= TIER_3_THRESHOLD
            ? TIER_2_PRICE
            : TIER_3_PRICE;

    // Multiply by 100 because Stripe deals with cents
    return rate * storage * 100;
}
