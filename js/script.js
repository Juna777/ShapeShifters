document.getElementById("paymentMethod").addEventListener("change", function () {
    hideAllFields();

    const selectedMethod = this.value;
    const paymentFields = document.getElementById(`${selectedMethod}Fields`);

    if (paymentFields) {
        paymentFields.classList.remove("hidden");
    }
});

document.getElementById("submitBtn").addEventListener("click", function () {
    const paymentMethod = document.getElementById("paymentMethod").value;
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "";

    if (paymentMethod === "gcash") {
        const gcashNumber = document.getElementById("gcashNumber").value;

        if (!isValidGCashNumber(gcashNumber)) {
            errorMessageElement.textContent = "Invalid GCash number. Please check your input.";
        }
    } else if (paymentMethod === "creditCard") {
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        if (!isValidCreditCardNumber(cardNumber) || !isValidExpiryDate(expiryDate) || !isValidCVV(cvv)) {
            errorMessageElement.textContent = "Invalid credit card details. Please check your inputs.";
        }
    } else {
        errorMessageElement.textContent = "Please select a payment method.";
    }
});

function hideAllFields() {
    const fields = document.querySelectorAll(".payment-fields");
    fields.forEach((field) => {
        field.classList.add("hidden");
    });
}

// Validation functions (implement as needed)
function isValidGCashNumber(gcashNumber) {
    return /^09\d{9}$/.test(gcashNumber);
}

function isValidCreditCardNumber(cardNumber) {
    return cardNumber.length === 16 && /^\d+$/.test(cardNumber);
}

function isValidExpiryDate(expiryDate) {
    var regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(expiryDate);
}

function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}
