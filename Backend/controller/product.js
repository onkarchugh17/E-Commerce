import { Product } from "../model/product.js";
import base64Img from "base64-img";

export const fetchAllProducts = async (req, res) => {
  let query = Product.find({});
  let countQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    countQuery = countQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    countQuery = countQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({
      [req.query._sort]: req.query._order === "asc" ? 1 : -1,
    });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = +req.query._limit;
    const page = +req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const doc = await query.exec();
    const totalProducts = await countQuery.countDocuments();
    res.status(201).header("X-Total-Count", totalProducts).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createProduct = async (req, res) => {
  const base64Images = req.body.images;
  const imagePaths = base64Images.map((base64) => {
    const imageType = base64.substring(
      "data:image/".length,
      base64.indexOf(";base64")
    );
    const setType = imageType === "jpeg" ? "jpg" : imageType;
    const imageName = `file${Date.now()}`;
    const imagePath = `/static/${imageName}.${setType}`;
    base64Img.imgSync(base64, "./uploads", imageName);
    return imagePath;
  });

  let thumbnailPath;
  if (req.body.thumbnail) {
    const thumbnailType = req.body.thumbnail.substring(
      "data:image/".length,
      req.body.thumbnail.indexOf(";base64")
    );
    const setType = thumbnailType === "jpeg" ? "jpg" : thumbnailType;
    const thumbnailName = `thumbnail${Date.now()}`;
    thumbnailPath = `/static/thumbnail${Date.now()}.${setType}`;
    base64Img.imgSync(req.body.thumbnail, "./uploads", thumbnailName);
  }

  const productData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: thumbnailPath,
    images: imagePaths,
    deleted: req.body.deleted || false,
  };

  const product = new Product(productData);

  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error is", err);
  }
};

export const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(err);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  let thumbnailPath = false;
  if (req.body?.thumbnail.startsWith("data")) {
    const thumbnailType = req.body.thumbnail.substring(
      "data:image/".length,
      req.body.thumbnail.indexOf(";base64")
    );
    const setType = thumbnailType === "jpeg" ? "jpg" : thumbnailType;
    const thumbnailName = `thumbnail${Date.now()}`;
    thumbnailPath = `/static/thumbnail${Date.now()}.${setType}`;
    base64Img.imgSync(req.body.thumbnail, "./uploads", thumbnailName);
  }

  let base64Images = req.body.images;
  const imagePaths = base64Images.map((base64 , index) => {
    if (base64.startsWith("data")) {
      const imageType = base64.substring(
        "data:image/".length,
        base64.indexOf(";base64")
      );
      const setType = imageType === "jpeg" ? "jpg" : imageType;
      const imageName = `file${Date.now()}`;
      base64Images[index] = `/static/${imageName}.${setType}`;
      base64Img.imgSync(base64, "./uploads", imageName);
      return base64Images;
    }
  });

  console.log("Image path is", base64Images);

  const productData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: thumbnailPath ? thumbnailPath : req.body.thumbnail,
    images: base64Images,
    deleted: req.body.deleted || false,
  };

  try {
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(err);
  }
};
