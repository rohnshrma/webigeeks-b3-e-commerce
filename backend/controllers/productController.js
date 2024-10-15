import Product from "../model/productModel.js";

// Get All Products
// Path : GET "/api/products"
// Access : Public
const GET_ALL_PRODUCTS = async (req, res) => {
  let products;
  try {
    products = await Product.find({});
    if (!products) {
      return;
    }
    console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
// Get Product
// Path : GET "/api/products/:id"
// Access : Public
const GET_PRODUCT = async (req, res) => {
  const { id } = req.params;
  let product;
  try {
    product = await Product.findOne({ _id: id });
    if (!product) {
      return;
    }
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};
const productController = {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
};

export default productController;
