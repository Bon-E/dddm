$(document).ready(function () {
  initPage().then(() => {
    routePages();
  });

  
  $(document).on('click', '.add-to-cart-btn', function() {
    let model = Model.getInstance();
    const found = model.getProducts().find((element) => element._id == $(this).attr('id'));
    console.log("adin is the best",found);
    const Product ={
      id:$(this).attr('id'),
      quantity:1,
      name:found.name,
      price:findMyPrice(found)

    }
    addToCart(Product);
    alert('Product added to cart!');
    //updateCartCount();
  });
  $.get('/get_products').done((products) => {
    let model = Model.getInstance();
    model.setProducts(products)
    populateProductCards(products);
  }).fail((error) => {
    console.error('Error fetching product data:', error);
  });
});
function findMyPrice(product) {
  let prices = product.pricing;
  let lastDate = prices[0];
  for(let i =1; i < prices.length; i++ ){
   if(new Date(prices[i].changed_on)> new Date(lastDate.changed_on)){
    lastDate=prices[i];
   }
  }
  return lastDate.price;
}
function populateProductCards(products) {
  const imagesContainer = $('#images');

  products.forEach(product => {
    const card = `
      <div class="col">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.price} USD</p>
            <button type="button" class="btn btn-primary add-to-cart-btn" id="${(product._id)}">Add to cart</button>
            <button type="button" class="btn btn-danger">My list</button>
          </div>
        </div>
      </div>
    `;
    imagesContainer.append(card);
  });
}
function addToCart(product) {
  let model =Model.getInstance();
  model.AddToCart(product);
  console.log(model.GetCart());
  model.saveData();
}
