const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const Ebook = require("../models/ebookModel");

// add to cart
const addTocart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  const ebookId = Number(id);

  let cart = await Cart.findOne({ userId });
  const ebook = await Ebook.findOne({ id: ebookId });

  if (!ebook) {
    return res.status(404).json({ msg: "ebook not found" });
  }

  if (!cart) {
    cart = new Cart({
      userId,
      cartList: [ebook],
    });
  } else {
    const existingCartIndex = cart.cartList.findIndex(
      (item) => item.id === ebookId,
    );
    if (existingCartIndex !== -1) {
      return res.status(400).json({ msg: "ebook already exists" });
    }
    cart.cartList.push(ebook);
  }

  const savedCart = await cart.save();
  res.status(201).json(savedCart);
});

// to remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  const ebookId = Number(id);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ msg: "cart not found" });
  }

  const existingCartIndex = cart.cartList.findIndex(
    (item) => item.id === ebookId,
  );
  if (existingCartIndex === -1) {
    return res.status(404).json({ msg: "ebook not found in the cart" });
  }

  cart.cartList.splice(existingCartIndex, 1);

  const savedCart = await cart.save();
  res.status(200).json(savedCart);
});

// clearing the cart
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ msg: "cart not found" });
  }

  cart.cartList = [];

  const clearedCart = await cart.save();
  res.status(200).json(clearedCart);
});

// to get user cart
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });

  // If cart doesn't exist, return empty cart instead of 404
  if (!cart) {
    return res.status(200).json({
      userId,
      cartList: [],
    });
  }

  res.status(200).json(cart);
});

module.exports = {
  addTocart,
  removeFromCart,
  getUserCart,
  clearCart,
};
