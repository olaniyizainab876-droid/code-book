const Ebook = require("../models/ebookModel");
const asyncHandler = require("express-async-handler");
const { generateUniqueId } = require("../utils");

//create an ebook
const createEbook = asyncHandler(async (req, res) => {
  const {
    name,
    overview,
    longDescription,
    price,
    instock,
    poster,
    rating,
    bestSeller,
    seize,
  } = req.body;

  const existing = await Ebook.findOne({ name });
  if (existing) {
    return res
      .status(400)
      .json({ msg: "Ebook with the same name already exists" });
  }

  if (!name || !overview || !longDescription || !price || !rating || !seize) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ msg: "rating can only be between 1-5" });
  }
  const id = await generateUniqueId();

  const ebook = new Ebook({
    id,
    name,
    overview,
    longDescription,
    price,
    rating,
    poster,
    bestSeller: bestSeller || false,
    inStock: instock ?? true,
    seize,
  });

  const savedEbook = await ebook.save();

  res.status(201).json(savedEbook);
});

const getAnEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ebook = await Ebook.findOne({ id });

  if (ebook) {
    const {
      _id,
      id,
      name,
      overview,
      longDescription,
      price,
      instock,
      poster,
      rating,
      bestSeller,
      size,
    } = ebook;

    res
      .status(200)
      .json({
        _id,
        id,
        name,
        overview,
        longDescription,
        price,
        instock,
        poster,
        rating,
        bestSeller,
        size,
      });
  } else {
    return res.status(404).json({ msg: "ebook not found" });
  }
});

//getting all ebooks
const getAllEbook = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find();

  if (!ebooks || ebooks.length === 0) {
    return res.status(404).json({ msg: "no ebook found ooo" });
  }

  return res.status(200).json(ebooks);
});

const updateEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ebook = await Ebook.findOne({ id });

    if (ebook) {
      ebook.price = req.body.price || ebook.price;
      ebook.poster = req.body.poster || ebook.poster;
      ebook.overview = req.body.overview || ebook.overview;
      ebook.rating = req.body.rating || ebook.rating;
      ebook.inStock = req.body.inStock || ebook.inStock;
      ebook.bestSeller = req.body.bestSeller || ebook.bestSeller;
      ebook.longDescription = req.body.longDescription || ebook.longDescription;

      const updateEbook = await ebook.save();
      res.status(200).json(updateEbook);
    } else {
      res.status(404).json({ error: "ebook not found" });
    }
  } catch (error) {
    res.status(500).json({ errpr: "internal server error" });
  }
});

module.exports = {
  createEbook,
  getAnEbook,
  getAllEbook,
  updateEbook,
};
