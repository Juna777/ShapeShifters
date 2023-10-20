document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitBtn");
    const paymentForm = document.getElementById("personal-details-form");
    
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const zipCode = document.getElementById("zipCode").value;
        const paymentMethod = document.getElementById("paymentMethod").value;
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

     

       
        if (fullName.trim() !== "" && email.trim() !== "" && address.trim() !== "" && city.trim() !== "" && zipCode.trim() !== "" && paymentMethod !== "") {
            

            alert("Payment successful! Thank you for your purchase.");

         
            paymentForm.submit();
        } else {
           
            alert("Please fill out all the fields correctly.");
        }
    });
});
