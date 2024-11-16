const Cart = require("../Models/Cart");
const Food = require("../Models/Food");

// Get all cart items for a user
exports.getAllCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the JWT token by authMiddleware

    // Fetch cart items from the database for the logged-in user
    const carts = await Cart.find({ user: userId }).populate("items.food"); // Populate the food details inside items

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
    const cart = await Cart.findById(cartId).populate("foods"); // Populate product details if needed

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
      return res.status(201).json(cart);
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
    const { foodId, newQuantity, userId } = req.body;

    // Fetch the cart item to update
    const cartItem = await Cart.findOne({ user: userId });

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    // Check if the user is the owner of the cart item
    if (cartItem.user.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this cart item" });
    }

    // Find the food item in the cart and update its quantity
    const food = cartItem.items.find((item) => item.food.toString() === foodId);

    if (!food) {
      return res.status(404).json({ msg: "Food item not found in cart" });
    }

    // Update the quantity
    food.quantity = newQuantity;

    // Recalculate total price by summing up price * quantity for each item
    let totalPrice = 0;
    cartItem.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // Update total price of the cart
    cartItem.totalPrice = totalPrice;

    // Save the updated cart item
    await cartItem.save();

    // Return the updated cart item
    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { foodId, userId } = req.body;

    // Fetch the cart item to update
    const cartItem = await Cart.findOne({ user: userId });

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    // Check if the user is the owner of the cart item
    if (cartItem.user.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this cart item" });
    }

    // Find the food item in the cart and update its quantity
    const foodIndex = cartItem.items.findIndex(
      (item) => item.food.toString() === foodId
    );

    if (foodIndex === -1) {
      return res.status(404).json({ msg: "Food item not found in cart" });
    }

    // Remove the food item from the items array
    cartItem.items.splice(foodIndex, 1);

    // Recalculate total price after removing the item
    let totalPrice = 0;
    cartItem.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // Update total price of the cart
    cartItem.totalPrice = totalPrice;

    await cartItem.save();

    res.status(200).json({ msg: "Food Item removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
