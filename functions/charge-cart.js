const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const products = require("./products.json")


exports.handler = async (event, context) => {
    const cart = JSON.parse(event.body);

    const cartWithProducts = cart.newCart.map(({ id, qty }) => {
        const product = products.find((p) => p.id === id);
        return {
            ...product,
            qty,
        };
    });

    // talking to Stripe
    const lineItems = cartWithProducts.map((product) => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: product.name,
            },
            unit_amount: product.price,
        },
        quantity: product.qty,
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            "card"
        ],
        cancel_url: `${process.env.URL}/cancel`,
        line_items: lineItems,
        mode: "payment",

        success_url: `${process.env.URL}/success`,


    })

    // charging the card
    return {
        statusCode: 200,
        body: JSON.stringify({
            id: session.id,
        }),
    };
};