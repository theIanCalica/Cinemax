const Category = require("../Models/Category");
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Category.find().sort({ order_date: 1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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

    await Cart.findOneAndDelete({ user: userId });
    res.status(201).json({
      message: "Order created successfully.",
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
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ msg: "Status is required!" });
  }

  // Validate status value
  const validStatuses = ["Pending", "Completed", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: "Invalid status value" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
