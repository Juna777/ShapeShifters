
    document.getElementById("submitButton").addEventListener("click", function() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var modal = new bootstrap.Modal(document.getElementById("exampleModal"));

        if (name && email && message) {
            // Form data is valid, show the modal
            modal.show();
        } else {
            // Form data is not valid, show an alert or handle it in your preferred way
            alert("Please fill out all fields.");
        }
    });

