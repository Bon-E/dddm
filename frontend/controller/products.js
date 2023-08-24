$(document).ready(function () {
    initPage().then(() => {
        routePages();

        populatePlatformsSelection();
        populateCategoriesSelection();
        populateVendorsSelection();
    });

    $(document).on('input', '#search', function () {
        performSearch();
    });

    $('select').on('change', () => {
        performSearch();
    });

    $('#clear').on('click', () => {
        $('.mySelect').prop('selectedIndex', 0);
        $('#search').val('');
        performSearch();
    });

    function performSearch() {
        var query = $('#search').val().trim();
        $.get('/get_products')
            .done((products) => {
                var filteredProducts = filterProducts(products, query);
                var filteredProducts2 = filterBySelections(filteredProducts);
                clearProductCards();
                populateProductCards(filteredProducts2);
            })
            .fail((error) => {
                console.error('Error fetching product data:', error);
            });
    }

    function filterProducts(products, query) {
        return products.filter((product) => {
            return product.name.toLowerCase().includes(query.toLowerCase());
        });
    }

    function populateCategoriesSelection() {
        let model = Model.getInstance();
        $.each(model.getCategories(), (index, item) => {
            let option1 = $('<option>', { value: item._id, text: item.name });
            let option2 = $('<option>', { value: item._id, text: item.name });
            $('#category').append(option1);
            $('#editCategory').append(option2);
        });
    }

    function populateVendorsSelection() {
        let model = Model.getInstance();
        $.each(model.getVendors(), (index, item) => {
            let option1 = $('<option>', { value: item._id, text: item.name });
            let option2 = $('<option>', { value: item._id, text: item.name });
            $('#vendor').append(option1);
            $('#editVendor').append(option2);
        });
    }

    function populatePlatformsSelection() {
        let model = Model.getInstance();
        $.each(model.getPlatforms(), (index, item) => {
            let option1 = $('<option>', { value: item._id, text: item.name });
            let option2 = $('<option>', { value: item._id, text: item.name });
            $('#platform').append(option1);
            $('#editPlatform').append(option2);
        });
    }

    function clearProductCards() {
        $('#images').empty();
    }
    $('#btn-cheapest').click(function () {
        const products = Model.getInstance().getProducts();
        const sortedProducts = products.slice().sort((a, b) => findMyPrice(a) - findMyPrice(b));
        clearProductCards();
        populateProductCards(sortedProducts);
    });

    $('#btn-expensive').click(function () {
        const products = Model.getInstance().getProducts();
        const sortedProducts = products.slice().sort((a, b) => findMyPrice(b) - findMyPrice(a));
        clearProductCards();
        populateProductCards(sortedProducts);
    });

    $('#btn-newest').click(function () {
        const products = Model.getInstance().getProducts();
        const sortedProducts = products.slice().sort((a, b) => new Date(b.added_on) - new Date(a.added_on));
        clearProductCards();
        populateProductCards(sortedProducts);
    });
});

$(document).on('click', '.add-to-cart-btn', function () {
    let model = Model.getInstance();
    const found = model.getProducts().find((element) => element._id == $(this).attr('id'));

    const Product = {
        id: $(this).attr('id'),
        quantity: 1,
        name: found.name,
        price: findMyPrice(found)
    };
    addToCart(Product);
    alert('Product added to cart!');
});

$.get('/get_products')
    .done((products) => {
        let model = Model.getInstance();
        model.setProducts(products);
        populateProductCards(products);
    })
    .fail((error) => {
        console.error('Error fetching product data:', error);
    });

function findMyPrice(product) {
    let prices = product.pricing;
    let lastDate = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (new Date(prices[i].changed_on) > new Date(lastDate.changed_on)) {
            lastDate = prices[i];
        }
    }
    return lastDate.price;
}
function populateProductCards(products) {
    let model = Model.getInstance();
    const imagesContainer = $('#images');

    products.forEach((product) => {
        var card = `
          <div class="col">
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                      <p class="card-text">${findMyPrice(product)} USD</p>`;

        if (model.getIsLogged() && !model.getIsAdmin()) {
            card += `<button type="button" class="btn btn-primary add-to-cart-btn" id="${product._id}">Add to cart</button>`;
        }
        card += `               
                  </div>
              </div>
          </div>
      `;
        imagesContainer.append(card);
    });
}
function addToCart(product) {
    let model = Model.getInstance();
    model.AddToCart(product);
    model.saveData();
}

function filterBySelections(products) {
    const category = $('#category').val();
    const vendor = $('#vendor').val();
    const platform = $('#platform').val();

    return products.filter((product) => {
        var ok = true;
        if (category != null) {
            ok = product.category_id != category ? false : ok;
        }
        if (vendor != null) {
            ok = product.vendor_id != vendor ? false : ok;
        }
        if (platform != null) {
            ok = product.platfom_id != platform ? false : ok;
        }
        return ok;
    });
}
