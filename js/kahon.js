document.addEventListener("DOMContentLoaded", function() {
  let orderlist = [];

  
  function loadCart() {
      const savedOrder = localStorage.getItem("order");
      if (savedOrder) {
          orderlist = JSON.parse(savedOrder);
          updateOrderSummary();
      }
  }


  function saveCart() {
      localStorage.setItem("order", JSON.stringify(orderlist));
  }

  
  function addToCart(id) {
      let new_id = document.getElementById("p" + id).innerText;
      let new_prod = document.getElementById("prod" + id).innerText;
      let new_dre = document.getElementById("dre" + id).innerText;
      let new_price = parseFloat(document.getElementById("pri" + id).innerText); 
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
              totalPrice: new_price 
          });
      }

      saveCart();
      updateOrderSummary();
      cartlength();
  }


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

  function deleteItem(id) {
      const itemIndex = orderlist.findIndex(i => i.id === id);
      if (itemIndex !== -1) {
          orderlist.splice(itemIndex, 1);
          saveCart();
          updateOrderSummary();
          cartlength();
      }
  }


  function updateOrderSummary() {
      const summaryElement = document.getElementById("summary");
      const totalElement = document.getElementById("totalPrice");

   
      summaryElement.innerHTML = "";

    
      let subtotal = 0;
      orderlist.forEach(item => {
          subtotal += item.totalPrice;
          const listItem = document.createElement("li");
          listItem.textContent = `${item.product} - Quantity: ${item.quantity} - Price: $${item.totalPrice.toFixed(2)}`;
          summaryElement.appendChild(listItem);
      });

      const total = calculateTotal(subtotal);

   
      totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  function calculateTotal(subtotal) {

      const tax = 0.1 * subtotal;
      const total = subtotal + tax;
      return total;
  }

  function cartlength() {
      const cartLengthElement = document.getElementById("cartlength");
      cartLengthElement.innerText = orderlist.length.toString();
  }

 
  loadCart();

 
  document.getElementById("increaseButton").addEventListener("click", function() {
      increaseQuantity(id); 
  });

  document.getElementById("decreaseButton").addEventListener("click", function() {
      decreaseQuantity(id); 
  });

  document.getElementById("deleteButton").addEventListener("click", function() {
      deleteItem(id); 
  });

  document.getElementById("addToCartButton").addEventListener("click", function() {
      addToCart(id); 
  });
});
