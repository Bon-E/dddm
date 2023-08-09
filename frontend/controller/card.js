$(document).ready(() => {
  initPage().then(() => {
      routePages();
  });
});

$(document).ready(function () {
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
            <button type="button" class="btn btn-primary">Buy Now</button>
            <button type="button" class="btn btn-secondary">Add to cart</button>
            <button type="button" class="btn btn-danger">My list</button>

          </div>
        </div>
      </div>
    `;
    imagesContainer.append(card);
  });
}
