$(document).ready(() => {
  initPage().then(() => {
    routePages();
  });

  // Attach click event handler for "Add to Cart" buttons
  $(document).on('click', '.add-to-cart-btn', function() {
    const productData = JSON.parse($(this).attr('data-product'));
    addToCart(productData);
    alert('Product added to cart!');
    updateCartCount();
  });
});

$(document).ready(function () {
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
            <button type="button" class="btn btn-primary add-to-cart-btn" data-product="${JSON.stringify(product)}">Add to cart</button>
            <button type="button" class="btn btn-danger">My list</button>
          </div>
        </div>
      </div>
    `;
    imagesContainer.append(card);
  });
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCount = cartItems.length;
  $('#cart-count').text(cartCount);
}

