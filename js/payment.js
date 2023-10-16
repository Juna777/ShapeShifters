const paymentMethod = document.getElementById('paymentMethod');
const paymentOptionDetails = {
    gcash: document.getElementById('gcash'),
    paymaya: document.getElementById('paymaya'),
    bankDebit: document.getElementById('bankDebit'),
    creditCard: document.getElementById('creditCard')
};

paymentMethod.addEventListener('change', (e) => {
    Object.values(paymentOptionDetails).forEach(option => option.classList.add('hidden'));
    const selectedOption = paymentOptionDetails[e.target.value];
    if (selectedOption) {
        selectedOption.classList.remove('hidden');
    }
});
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    function co() {
   
      var fullName = document.getElementById('fullName').value;
      var email = document.getElementById('email').value;
      var paymentMethod = document.getElementById('paymentMethod').value;
      
   
      if (!fullName || !email || !paymentMethod) {
          alert('Please fill out all fields.');
          return;
      }
      if (paymentMethod === 'gcash') {
          
          alert('Processing payment via Gcash. Thank you for your purchase!');
         
      } else if (paymentMethod === 'paymaya') {
       
          alert('Processing payment via PayMaya. Thank you for your purchase!');
         
      } else if (paymentMethod === 'bankDebit') {
        
          alert('Processing payment via Bank Debit. Thank you for your purchase!');
      } else if (paymentMethod === 'creditCard') {
          var cardNumber = document.getElementById('cardNumber').value; var expiryDate = document.getElementById('expiryDate').value;
          var cvv = document.getElementById('cvv').value;
          
          if (!cardNumber || !expiryDate || !cvv) {
              alert('Please provide valid credit card details.');
              return;
          }
  
          alert('Processing payment via Credit Card. Thank you for your purchase!');
      } else {
          alert('Invalid payment method selected. Please choose a valid payment option.');
      }
  
      document.getElementById('fullName').value = '';
      document.getElementById('email').value = '';document.getElementById('cardNumber').value = '';
      document.getElementById('expiryDate').value = '';
      document.getElementById('cvv').value = '';
  }
    alert('Payment successful!');
});


document.addEventListener("DOMContentLoaded", function() {
  displayOrderSummary();
});

function displayOrderSummary() {

  let totalPriceElement = document.getElementById("totalPrice");

  if (cart === null || cart.length === 0) {
      summaryList.innerHTML = "<li>No items in the cart</li>";
      totalPriceElement.innerText = "Total: $0.00";
  } else {
      let totalPrice = 0;

      cart.forEach(item => {
          let listItem = document.createElement("li");
          listItem.textContent = `${item.product} - ${item.price}`;
          summaryList.appendChild(listItem);
                    let priceWithoutCurrency = item.price.replace(/[^\d.]/g, ""); 
                    totalPrice += parseFloat(priceWithoutCurrency);
                });
        
              
                totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
            }
        }




