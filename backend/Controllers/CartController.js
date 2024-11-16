const Cart = require("../Models/Cart");
const Food = require("../Models/Food");

// Get all cart items for a user
exports.getAllCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the JWT token by authMiddleware

    // Fetch cart items from the database for the logged-in user
    const carts = await Cart.find({ user: userId }).populate("product"); // Include product details if needed

    res.status(200).json(carts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a specific cart by its ID
exports.getCartById = async (req, res) => {
  try {
    // Extract cart ID from the URL parameters
    const cartId = req.params.id;

    // Fetch the cart item from the database
    const cart = await Cart.findById(cartId).populate("product"); // Populate product details if needed

    if (!cart) {
      return res.status(404).json({ msg: "Cart item not found" }); // Handle case where the cart is not found
    }

    // Return the found cart item
    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error"); // General server error
  }
};

// Create a new cart item
exports.createCartItem = async (req, res) => {
  try {
    const { foodId, quantity, userId } = req.body;

    // Check if the food item exists
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Check if the food already exists in the user's cart
    let cart = await Cart.findOne({ user: userId });

    // If cart does not exist, create a new cart for the user
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if the food item already exists in the cart
    let cartItem = cart.items.find((item) => item.food.toString() === foodId);

    if (cartItem) {
      // If it exists, update the quantity and total price
      cartItem.quantity += quantity;
      cartItem.price = food.price * cartItem.quantity; // Update the price based on quantity

      // Recalculate the total price of the cart
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    }

    // If food item doesn't exist in the cart, create a new cart item
    const newCartItem = {
      food: foodId,
      quantity,
      price: food.price * quantity, // Set the price based on the quantity
    };

    // Add the new cart item to the cart's items array
    cart.items.push(newCartItem);

    // Recalculate the total price of the cart
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the cart to the database
    await cart.save();

    res.status(201).json(cart); // Return the updated cart
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { cartId, quantity } = req.body; // Get cart ID and new quantity from the request body

    // Fetch the cart item to update
    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    // Check if the user is the owner of the cart item
    if (cartItem.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this cart item" });
    }

    // Update the quantity (you could add validation for minimum or maximum quantity)
    cartItem.quantity = quantity;

    // Save the updated cart item
    await cartItem.save();

    res.status(200).json(cartItem); // Return the updated cart item
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.params; // Get the cart ID from URL parameters

    // Find and delete the cart item
    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    // Check if the user is the owner of the cart item
    if (cartItem.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this cart item" });
    }

    // Delete the cart item
    await cartItem.remove();

    res.status(200).json({ msg: "Cart item removed" }); // Confirm that the item was deleted
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
