const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    // Validate name, email, address, and payment method
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    if (email.trim() === "" || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (address.trim() === "") {
        alert("Please enter your shipping address.");
        return;
    }

    if (paymentMethod === "") {
        alert("Please select a payment method.");
        return;
    }

    // If all validations pass, you can proceed with payment processing logic here.
    alert("Payment successful! Thank you for your purchase.");
});

function validateEmail(email) {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
