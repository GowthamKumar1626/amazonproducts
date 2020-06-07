module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT%}/g, product.product);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%IMAGESRC%}/g, product.imageCover);
  output = output.replace(/{%STYLE%}/g, product.style);
  output = output.replace(/{%COLORS%}/g, product.colors);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%RATINGSAVERAGE%}/g, product.ratingsAverage);
  output = output.replace(/{%RATINGSQUANTITY%}/g, product.ratingsQuantity);

  return output;
};
