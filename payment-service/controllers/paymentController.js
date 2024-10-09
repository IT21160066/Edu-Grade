import { CustomError } from "../exceptions/baseException.js";
import { stripe } from "../server.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const makePayment = tryCatch(async (req, res) => {
  const items = req.body.items;

  if (!items) throw new CustomError("No Data provided!", 404);

  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/view-course",
  });

  if (!session) throw new CustomError("Payment Gateway Failed.", 500);

  res.send(
    JSON.stringify({
      url: session.url,
      sessionId: session.id,
    })
  );
});

export { makePayment };
