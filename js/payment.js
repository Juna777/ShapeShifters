
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

function validateGcash() {
    const gcashNumberInput = document.getElementById('gcashNumber');
    const gcashRegex = /^[0-9]{10}$/;
    if (!gcashRegex.test(gcashNumberInput.value)) {
        alert('Invalid Gcash number. Please enter a 10-digit number.');
        return false;
    }
    return true;
}

function validatePayMaya() {
    const paymayaNumberInput = document.getElementById('paymayaNumber');
    const paymayaExpiryDateInput = document.getElementById('paymayaExpiryDate');
    const paymayaCvvInput = document.getElementById('paymayaCvv');
    const paymayaNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (!paymayaNumberRegex.test(paymayaNumberInput.value)) {
        alert('Invalid PayMaya number. Please enter a 16-digit number.');
        return false;
    }

    if (!expiryDateRegex.test(paymayaExpiryDateInput.value)) {
        alert('Invalid expiry date. Please enter a valid date in MM/YYYY format.');
        return false;
    }

    if (!cvvRegex.test(paymayaCvvInput.value)) {
        alert('Invalid CVV. Please enter a 3-digit number.');
        return false;
    }

    return true;
}

function validateDebitCard() {
    const debitCardNumberInput = document.getElementById('debitCardNumber');
    const debitExpiryDateInput = document.getElementById('debitExpiryDate');
    const debitCVVInput = document.getElementById('debitCVV');
    const debitCardNameInput = document.getElementById('debitCardName');
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(debitCardNumberInput.value)) {
        alert('Invalid debit card number. Please enter a valid 16-digit card number.');
        return false;
    }

    if (!expiryDateRegex.test(debitExpiryDateInput.value)) {
        alert('Invalid expiry date. Please enter a valid date in MM/YYYY format.');
        return false;
    }

    if (!cvvRegex.test(debitCVVInput.value)) {
        alert('Invalid CVV. Please enter a valid 3-digit CVV number.');
        return false;
    }

    if (debitCardNameInput.value.trim() === '') {
        alert('Please enter the name on the debit card.');
        return false;
    }

    return true;
}

function validateCreditCard() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (!cardNumberRegex.test(cardNumberInput.value)) {
        alert('Invalid credit card number. Please enter a 16-digit number.');
        return false;
    }

    if (!expiryDateRegex.test(expiryDateInput.value)) {
        alert('Invalid expiry date. Please enter a valid MM/YYYY format.');
        return false;
    }

    if (!cvvRegex.test(cvvInput.value)) {
        alert('Invalid CVV. Please enter a 3-digit number.');
        return false;
    }

    return true;
}

const paymentForm = document.getElementById('personal-details-form');
paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedPaymentMethod = paymentMethod.value;
    if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    let isValid = false;

    if (selectedPaymentMethod === 'paymaya') {
        isValid = validatePayMaya();
    } else if (selectedPaymentMethod === 'gcash') {
        isValid = validateGcash();
    } else if (selectedPaymentMethod === 'creditCard') {
        isValid = validateCreditCard();
    } else if (selectedPaymentMethod === 'bankDebit') {
        isValid = validateDebitCard();
    }

    if (isValid) {
        // Payment processing logic here
        // You can perform additional actions like sending payment data to the server
        // and displaying a success message to the user.

        // For example, after successful payment, you can show a modal with a success message
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    displayOrderSummary();
});

function displayOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("order"));
    let totalPriceElement = document.getElementById("totalPrice");

    if (cart === null || cart.length === 0) {
        totalPriceElement.innerText = "Total: $0.00";
    } else {
        let totalPrice = cart.reduce((acc, item) => {
            let priceWithoutCurrency = parseFloat(item.price.replace(/[^\d.]/g, ""));
            let quantity = parseInt(item.quantity) || 1;
            return acc + priceWithoutCurrency * quantity;
        }, 0);

        totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
    }
}