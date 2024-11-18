const Category = require("../Models/Category");
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const User = require("../Models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const admin = require("../config/Firebase");

const { sendEmailOrder } = require("../utils/Mailtrap");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ order_date: 1 })
      .populate("customer");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get order based on userID
exports.getOrdersBasedOnUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const orders = await Order.find({ customer: userId })
      .populate("items.foodId", "name description price") // Populate foodId in items array
      .sort({ createdAt: 1 }) // Sort by createdAt in descending order
      .exec();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { userId, foodItems, totalPrice, paymentMethod } = req.body;

    // Validation
    if (!userId || !foodItems || !totalPrice) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    const newOrder = new Order({
      customer: userId,
      items: foodItems.map((item) => ({
        foodId: item.food._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalPrice,
      paymentMethod: paymentMethod,
    });

    const savedOrder = await newOrder.save();

    const user = await User.findById(userId);

    // Prepare dynamic email content
    const emailContent = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Transaction Details</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 80%; margin: 0 auto;">
            <h2 style="color: #333; margin-bottom: 10px;">Transaction Details</h2>
            <p>Thank you for your purchase! Below are the details of your transaction:</p>

            <div style="margin-bottom: 20px; display: flex; justify-content: space-between;">
              <p><strong>Payment Method:</strong> ${paymentMethod}</p>
              <p><strong>Order Status:</strong> Pending</p>
            </div>

            <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Foods</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${foodItems
                  .map(
                    (item) => `
                  <tr>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${
                      item.food.name
                    } (x${item.quantity})</td>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">PHP ${
                      item.price * item.quantity
                    }</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr style="background-color: #f9f9f9; font-weight: bold;">
                  <td style="padding: 10px; text-align: left;">Grand Total</td>
                  <td style="padding: 10px; text-align: right;">PHP ${totalPrice}</td>
                </tr>
              </tbody>
            </table>

            <p>If you have any questions about your transaction, feel free to contact us at <a href="mailto:cinemax.inc.manila@gmail.com">cinemax.inc.manila@gmail.com</a> or call us at <a href="tel:+639123456789">+63 912 345 6789</a>.</p>
          </div>
        </body>
      </html>
    `;
    console.log(user);
    // Send email to the user
    await sendEmailOrder(user.email, "Transaction Details", emailContent);

    // Clear the user's cart after order
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      message: "Order created successfully and email sent.",
      order: savedOrder,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create checkout session for stripe
exports.createCheckoutSession = async (req, res) => {
  try {
    const { order } = req.body;

    // Extract line items from the order
    const lineItems = order[0].items.map((item) => {
      return {
        price_data: {
          currency: "php",
          product_data: {
            name: item.food.name,
            description: item.food.description,
            images: item.food.images.map((image) => image.url), // Use URLs from images array
          },
          unit_amount: Math.round(item.food.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/my-orders",
      cancel_url: "http://localhost:3000/cancel-payment",
    });

    // Send session ID to the client
    res.status(201).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Count orders
exports.countOrder = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.status(200).json({ count: orderCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve order count" });
  }
};

// Get single Order by ID
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an order
exports.updateOrderById = async (req, res) => {
  const { orderId, status } = req.body;

  if (!status || !orderId) {
    return res.status(400).json({ msg: "Status and OrderId are required" });
  }

  // Validate status value
  const validStatuses = [
    "Pending",
    "Processing",
    "Ready to Pick up",
    "Completed",
    "Cancelled",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: "Invalid status value" });
  }

  try {
    // Update the order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: "items.foodId", // Populate the 'food' field in the 'items' array
      select: "name price", // Include only 'name' and 'price' fields of food
    });

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Retrieve user information for the order
    const user = await User.findById(updatedOrder.customer);
    if (!user) {
      return res.status(404).json({ msg: "User not found for this order" });
    }

    // Prepare dynamic email content
    const emailContent = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Update</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 80%; margin: 0 auto;">
            <h2 style="color: #333; margin-bottom: 10px;">Order Update</h2>
            <p>Your order status has been updated. Here are the details:</p>

            <div style="margin-bottom: 20px; display: flex; justify-content: space-between;">
              <p><strong>Order ID:</strong> ${updatedOrder._id}</p>
              <p><strong>Updated Status:</strong> ${status}</p>
            </div>

            <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Foods</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${updatedOrder.items
                  .map(
                    (item) => `
                  <tr>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${
                      item.foodId.name
                    } (x${item.quantity})</td>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">PHP ${
                      item.price * item.quantity
                    }</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr style="background-color: #f9f9f9; font-weight: bold;">
                  <td style="padding: 10px; text-align: left;">Grand Total</td>
                  <td style="padding: 10px; text-align: right;">PHP ${
                    updatedOrder.totalAmount
                  }</td>
                </tr>
              </tbody>
            </table>

            <p>If you have any questions, feel free to contact us at <a href="mailto:cinemax.inc.manila@gmail.com">cinemax.inc.manila@gmail.com</a> or call us at <a href="tel:+639123456789">+63 912 345 6789</a>.</p>
          </div>
        </body>
      </html>
    `;

    // Send email to the user
    await sendEmailOrder(user.email, "Order Update", emailContent);

    if (user.token) {
      const message = {
        notification: {
          title: `Order ${orderId}`,
          body: `Your order is now ${status}.`,
        },
        token: user.token, // The FCM token stored in your database
      };

      try {
        await admin.messaging().send(message);
        console.log("FCM notification sent successfully");
      } catch (error) {
        console.error("Error sending FCM notification:", error);
      }
    } else {
      console.log("No FCM token available for the user.");
    }

    // Respond to the client
    return res.status(200).json({ msg: "Successfully Updated and email sent" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
