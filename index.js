function getAllProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        // @TODO add check OK 200 / ERROR 400/500
        console.log(json);
        renderProducts(json.products);
      });
  }
  getAllProducts();
  
  function searchProducts() {
    const searchText = document.getElementById("search").value;
  
    if (searchText == "") {
      getAllProducts();
    } else {
      fetch(`https://dummyjson.com/products/search?q=${searchText}`)
        .then((res) => res.json())
        .then((json) => {
          // @TODO add check OK 200 / ERROR 400/500
          console.log(json);
          renderProducts(json.products);
        });
    }
  }
  
  function renderProducts(products) {
    let result;
    const mainDiv = document.getElementById("main");
    mainDiv.innerHTML = "";
    // console.log(mainDiv);
    for (let i = 0; i < products.length; i++) {
      result = generateTemplate(products[i]);
      mainDiv.innerHTML += result;
    }
  }
  
  function generateTemplate(product) {
    return `<div class="product-card" id="${product.id}" contenteditable=false>
              <div id="buttons-${product.id}">
              <span onclick="deleteProduct(this)"> x delete </span>
              <span onclick="editProduct(this)"> edit </span>
              </div>
              <div class="product-thumbnail">
                  <img src="${product.images[0]}" alt="Product Image" />
              </div>
              <div class="product-info">
                  <h2 class="product-title" onclick="getProduct(this)">${product.title}</h2>
                  <p class="product-description">${product.description}</p>
                  <div class="product-details">
                  <span class="product-price">${product.price}</span>
                  <span class="product-discount">Discount: ${product.discountPercentage}%</span>
                  <span class="product-rating">Rating: ${product.rating} stars</span>
                  <span class="product-stock">Stock: ${product.stock}</span>
                  </div>
                  <div class="product-attributes">
                  <span class="product-brand">Brand: ${product.brand}</span>
                  <span class="product-category">Category: ${product.category}</span>
                  </div>
                  <div class="product-image-carousel">
                      <img src="${product.images[1]}" alt="Product Image" />
                      <img src="${product.images[2]}" alt="Product Image" />
                      <img src="${product.images[3]}" alt="Product Image" />
                      <img src="${product.images[4]}" alt="Product Image" />
                  </div>
              </div>
          </div>`;
  }
  
  function getProduct(element) {
    const grandParent = element.parentElement.parentElement;
    const productId = grandParent.getAttribute("id");
  
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        console.log(product);
        // @TODO add check OK 200 / ERROR 400/500
        // console.log(json);
  
        renderProducts([product]);
      });
  }
  
  function editProduct(element) {
    const mainCart = element.parentElement.parentElement;
    console.log(mainCart);
    const productId = mainCart.getAttribute("id");
    mainCart.setAttribute("contenteditable", true);
  
    // @TODO don't create a new button for every call we have!
    const buttonsDiv = element.parentElement;
    if (buttonsDiv.childElementCount < 3) {
      const newButton = document.createElement("button");
      newButton.textContent = "Save!";
      newButton.setAttribute("onclick", "saveEditedData(this)");
      const buttonsId = `buttons-${productId}`;
      console.log(buttonsId);
      document.getElementById(buttonsId).appendChild(newButton);
    }
  }
  
  function saveEditedData(savedButton) {
    console.log("products are beign saved!");
    console.log(savedButton);
  
    const mainCart = savedButton.parentElement.parentElement;
  
    const productId = mainCart.getAttribute("id");
    console.log(productId);
  
  
    const productDescriptionEl = document.querySelector(
      `div[id='${productId}'] .product-description`
    );
    console.log(productDescriptionEl);
    const productDescriptionVal = productDescriptionEl.textContent;
    console.log(productDescriptionVal);
  
    const productDiscountEl = document.querySelector(
      `div[id='${productId}'] .product-discount`
    );
    console.log(productDiscountEl);
    const productDiscountVal = productDiscountEl.textContent;
    console.log(productDiscountVal);
  
    const productRatingEl = document.querySelector(
      `div[id='${productId}'] .product-rating`
    );
    console.log(productRatingEl);
    const productRatingVal = productRatingEl.textContent;
    console.log(productRatingVal);
  
    var product = {
      id: productId,
      description: productDescriptionVal,
      discount: productDiscountVal,
      rating: productRatingVal,
    };
  
    console.log(product);
  
    /* updating title of product with id 1 */
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // @TODO add check OK 200 / ERROR 400/500
        getAllProducts();
      });
  }
  
  function deleteProduct(element) {
    const productId = element.parentElement.getAttribute("id");
  
    console.log("delete-id:", productId);
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    }).then((json) => {
      console.log(json);
      // @TODO add check OK 200 / ERROR 400/500
      getAllProducts();
    });
  }