const Products = require("./../model/products");

const getallProducts = async (req, res) => {
  const allProducts = await Products.find().sort("price").select("name price");
  res.status(200).json({ Data: allProducts });
};

const getAllStaticProduts = async (req, res) => {
  const { featured, name, company, numericFiters, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFiters) {
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    const operatorMaps = {
      "<": "$lt",
      "<=": "$lte",
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
    };
    let filters = numericFiters.replace(
      regEx,
      (match) => `-${operatorMaps[match]}-`
    );
    const options = ["price", "rate"];
    filters = filters.split(",").forEach((item) => {
      const [name, operator, value] = item.slit("-");
      if (options.includes(name)) {
        queryObject[name] = { [operator]: value };
      }
    });
  }
  let result = Products.find(queryObject);
  console.log(result)
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort({ createdAt: 1 });
  }
  if (fields) {
    const fieldsList = sort.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getallProducts, getAllStaticProduts };
