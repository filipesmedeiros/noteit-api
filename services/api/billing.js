import stripePackage from 'stripe';
import { calculateCost } from '../../libs/billing-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
    const { storage, source: stripeToken } = JSON.parse(event.body);
    const price = calculateCost(storage);
    const description = 'NoteIt charge';

    // Load our secret key from the  environment variables
    const stripe = stripePackage(process.env.stripeSecretKey);

    /**
     * @var stripe
     * @property stripe.charges
     */
    try {
        await stripe.charges.create({
            source: stripeToken,
            amount: price,
            description,
            currency: 'eur'
        });
        return success({ status: true });
    } catch (e) {
        return failure({ message: e.message });
    }
}
