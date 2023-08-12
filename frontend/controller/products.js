$(document).ready(function () {
  initPage().then(() => {
    routePages();
  });

  // Attach click event handler for "Add to Cart" buttons
  $(document).on('click', '.add-to-cart-btn', function() {
    const productData = $(this).attr('id');
    addToCart(productData);
    alert('Product added to cart!');
    updateCartCount();
  });

  // Fetch product data from your backend API
  $.get('/get_products').done((products) => {
    populateProductCards(products);
  }).fail((error) => {
    console.error('Error fetching product data:', error);
  });
});

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
  console.log("add product",product);
  let model =Model.getInstance();
  model.AddToCart(product);
  console.log(model.GetCart());
  model.saveData();
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCount = cartItems.length;
  $('#cart-count').text(cartCount);
}
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('cart-item-image')[0].src;
  
  const productData = {
    title: title,
    price: price,
    imageSrc: imageSrc
  };
  
  addToCart(productData);
  updateCartTotal();
}