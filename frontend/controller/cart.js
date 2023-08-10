$(document).ready(function () {
    displayCartItems();
  });
  
  function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = $('#cart-list');
  
    cartItems.forEach(product => {
      const cartItem = `
        <li>${product.name} - ${product.price} USD</li>
      `;
      cartList.append(cartItem);
    });
  }
  