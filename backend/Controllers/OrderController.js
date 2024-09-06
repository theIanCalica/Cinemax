const Category = require("../Models/Category");
const Order = require("../Models/Order");

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

// Create a new order
exports.createOrder = async (req, res) => {
  const { user, order_date, status } = req.body;

  if (!user || !order_date || !status) {
    res.status(400).json({ msg: "All fields are required!" });
  }

  try {
    const newOrder = new Order({
      user,
      order_date,
      status,
    });

    const saveOrder = await newOrder.save();
    res.status(201).json(saveOrder);
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

// Delete an order
exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(500).json({ msg: "Order not found" });
    }

    res.status(200).json({ msg: "Order successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
