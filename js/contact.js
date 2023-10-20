
    document.getElementById("submitButton").addEventListener("click", function() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var modal = new bootstrap.Modal(document.getElementById("exampleModal"));

        if (name && email && message) {
    
            modal.show();
        } else {
            
            alert("Please fill out all fields.");
        }
    });

