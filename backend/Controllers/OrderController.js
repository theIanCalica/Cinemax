const Category = require("../Models/Category");
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");

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
