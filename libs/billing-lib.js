export function calculateCost(storage) {
    const rate = storage <= 10
        ? 4
        : storage <= 100
            ? 2
            : 1;

    // Multiply by 100 because Stripe deals with cents
    return rate * storage * 100;
}
