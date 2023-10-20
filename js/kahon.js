document.addEventListener("DOMContentLoaded", function() {
  let orderlist = [];

  // Function to load cart items from local storage
  function loadCart() {
      const savedOrder = localStorage.getItem("order");
      if (savedOrder) {
          orderlist = JSON.parse(savedOrder);
          updateOrderSummary();
      }
  }

  // Function to save cart items to local storage
  function saveCart() {
      localStorage.setItem("order", JSON.stringify(orderlist));
  }

  // Function to add item to cart
  function addToCart(id) {
      let new_id = document.getElementById("p" + id).innerText;
      let new_prod = document.getElementById("prod" + id).innerText;
      let new_dre = document.getElementById("dre" + id).innerText;
      let new_price = parseFloat(document.getElementById("pri" + id).innerText); // Parse price as a float
      let prod_img = document.getElementById("img" + id).src;

      const existingItem = orderlist.find(item => item.id === new_id);
      if (existingItem) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
          orderlist.push({
              id: new_id,
              product: new_prod,
              price: new_price,
              description: new_dre,
              img: prod_img,
              quantity: 1,
              totalPrice: new_price // Initial total price is the item price
          });
      }

      saveCart();
      updateOrderSummary();
      cartlength();
  }

  // Function to increase quantity of an item in the cart
  function increaseQuantity(id) {
      const item = orderlist.find(i => i.id === id);
      if (item) {
          item.quantity++;
          item.totalPrice = item.quantity * item.price;
          saveCart();
          updateOrderSummary();
          cartlength();
      }
  }

  // Function to decrease quantity of an item in the cart
  function decreaseQuantity(id) {
      const item = orderlist.find(i => i.id === id);
      if (item && item.quantity > 1) {
          item.quantity--;
          item.totalPrice = item.quantity * item.price;
          saveCart();
          updateOrderSummary();
          cartlength();
      }
  }

  // Function to delete an item from the cart
  function deleteItem(id) {
      const itemIndex = orderlist.findIndex(i => i.id === id);
      if (itemIndex !== -1) {
          orderlist.splice(itemIndex, 1);
          saveCart();
          updateOrderSummary();
          cartlength();
      }
  }

  // Function to update the order summary
  function updateOrderSummary() {
      const summaryElement = document.getElementById("summary");
      const totalElement = document.getElementById("totalPrice");

      // Clear previous summary
      summaryElement.innerHTML = "";

      // Re-calculate subtotal and total
      let subtotal = 0;
      orderlist.forEach(item => {
          subtotal += item.totalPrice;
          const listItem = document.createElement("li");
          listItem.textContent = `${item.product} - Quantity: ${item.quantity} - Price: $${item.totalPrice.toFixed(2)}`;
          summaryElement.appendChild(listItem);
      });

      // Calculate total including tax, shipping, etc. (customize as needed)
      const total = calculateTotal(subtotal);

      // Update total
      totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  // Function to calculate total (customize this according to your needs)
  function calculateTotal(subtotal) {
      // Example: Add 10% tax to the subtotal
      const tax = 0.1 * subtotal;
      const total = subtotal + tax;
      return total;
  }

  // Function to update cart length
  function cartlength() {
      const cartLengthElement = document.getElementById("cartlength");
      cartLengthElement.innerText = orderlist.length.toString();
  }

  // Load cart items when the DOM is fully loaded
  loadCart();

  // Attach event listeners for buttons with actual IDs from your HTML
  document.getElementById("increaseButton").addEventListener("click", function() {
      increaseQuantity(id); // Replace 'id' with the actual ID of the item
  });

  document.getElementById("decreaseButton").addEventListener("click", function() {
      decreaseQuantity(id); // Replace 'id' with the actual ID of the item
  });

  document.getElementById("deleteButton").addEventListener("click", function() {
      deleteItem(id); // Replace 'id' with the actual ID of the item
  });

  document.getElementById("addToCartButton").addEventListener("click", function() {
      addToCart(id); // Replace 'id' with the actual ID of the item
  });
});
