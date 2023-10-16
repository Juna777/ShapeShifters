let logs = sessionStorage.getItem("login");
if((logs == null) || (logs == "")) { 
    alert("Please log in first!");
    location.replace("login.html");
}else{

//orig array - contains objects
let array = JSON.parse(localStorage.getItem("order"));
//unique array
let unique = [... new Map(array.map(item => [item["id"], item])).values()];
console.log(array);
console.log(unique);

if (array == null){
    let show = document.getElementById("cart");
    show.innerHTML = "Cart Empty!";
}else{
    let show = document.getElementById("cart");
  
    let prod = "";
    let count = 0;

    // + button
    function add(a){
        count += 1 ;
        console.log(a);
        let qty = document.getElementById("x" +a );
        qty.value = count;

        let presyo = document.getElementById("p" + a).innerText;
            presyo = presyo * count;
        document.getElementById("total" + a).innerHTML = presyo;
            console.log(presyo); 
    }

     // - button
    function min(a){
        let qty = document.getElementById("x" +a );

        if (qty.value == 1){
            count = 1;
        }else{

            count -= 1 ;
            //console.log(a);
            qty.value = count;

            let presyo = document.getElementById("pp" + a).innerText;
            presyo = presyo * count;
            document.getElementById("total" + a).innerHTML = presyo;
            //console.log(presyo); 

        }

    }

    function delBtn(a){
        //check if we got the correct id
        console.log(a);
        //get the array from local storage
        let array = JSON.parse(localStorage.getItem("order")); 
        //check if we got the array
        console.log(array);

        //we filter the array so that we can get the array without the product that we want to delete
        function checkID(itemz){
            return itemz.id != a;
        } 
        //assign the new array to a new variable
        let new_array = array.filter(checkID);
        //set the updated order list to the local storage
        localStorage.setItem("order",JSON.stringify(new_array));

        console.log(array.filter(checkID));

        //remove the element from the display        
        let element = document.getElementById("elem" + a);
        element.remove();
    }

    unique.forEach(
    function (item){      
     
        count = array.filter(existing).length;

        function existing(itemz){
            return itemz.id == item.id;
        }
       
            prod += `
                        <div class="card mb-3 id="elem${item.id}" style="width:45%;background-color: #63ada8";>
                        <div class="row g-0">
                            <div class="col-md-6">
                            <br>
                            <button class= " btn btn-dark position-absolute top-0 end-0" id="del${item.id}" 
                            onclick= min(${item.id})>X</button>
                            <br><br>
                            <img src="${item.img}" style="width: 300px; height: 200px<p id="pp${item.id}">${item.product}</p> <br> 
                            <br>
                            </div>
                            <div class="col-md-6">
                            <div class="card-body">
                            <br><br><br><br><br><br>

                                    <h5 id="pp${item.id}">Amout: ${item.price}</h5>
                                    <button onclick= min(${item.id})>-</button>
                                    <input style="width:50px;" id="x${item.id}" type="number" value = ${count} readonly> 
                                    <button onclick= add(${item.id}) >+</button> 
                                    

                            </div>
                            </div>
                        </div>
                    </div>
            `;
            
    })
    show.innerHTML = prod;
}

        document.addEventListener("DOMContentLoaded", function() {
            displayOrderSummary();
        });

        function displayOrderSummary() {
            let cart = JSON.parse(localStorage.getItem("order"));
            let summaryList = document.getElementById("summary");
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
        function logout(){
            sessionStorage.removeItem("login");
            location.replace("login.html");
    }

}

