const sortByPrice = () => {
  location.replace("?sort=price");
};
const sortByRatings = () => {
  location.replace("?sort=-ratings");
};
const sortByRatingsQuantity = () => {
  location.replace("?sort=-ratingsQuantity");
};
const refresh = () => {
  let locationPresent = location.href;
  let url = locationPresent.replace(/\?.*/g, " ");
  location.replace(url);
};
