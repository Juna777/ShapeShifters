let logs = sessionStorage.getItem("login");
if((logs == null) || (logs == "")) { 
    //alert("Please log in first!");
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
    let totalamount = document.getElementById("total");
    
    let prod = "";
    let count = 0;
    //
    let total = 0;
  // + button
function add(a) {
    count += 1;
    let qty = document.getElementById("x" + a);
    qty.value = count;

    let presyo = parseFloat(document.getElementById("p" + a).innerText);
    if (!isNaN(presyo) && count >= 0) {
        let total = presyo * count;
        if (!isNaN(total) && total >= 0) {
            document.getElementById("total" + a).innerHTML = total;
            updateTotalPrice(); // Call function to update total price
        }
    }

// - button
function min(a) {
    let qty = document.getElementById("x" + a);

    if (qty.value <= 1) {
        count = 1;
    } else {
        count -= 1;
        qty.value = count;

        let presyo = parseFloat(document.getElementById("pp" + a).innerText);
        if (!isNaN(presyo) && count >= 0) {
            let total = presyo * count;
            if (!isNaN(total) && total >= 0) {
                document.getElementById("total" + a).innerHTML = total;
                updateTotalPrice(); // Call function to update total price
            }
        }
    }


function updateTotalPrice() {
    let totalPrices = document.querySelectorAll('[id^="total"]');
    let totalPrice = 0;
    totalPrices.forEach(element => {
        totalPrice += parseFloat(element.innerHTML);
    });

    // Prevent NaN from appearing below the card
    totalPrice = isNaN(totalPrice) ? 0 : totalPrice;

    document.getElementById("totalPrice").innerText = `Total: $${totalPrice.toFixed(2)}`;
}s
    }
}
function deleteItem(id) {
    const itemIndex = orderlist.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
      orderlist.splice(itemIndex, 1);
      saveCart();
      updateOrderSummary();
    }
  }
  
 

    unique.forEach(
    function (item){   
       
        count = array.filter(existing).length;

        function existing(itemz){
            return itemz.id == item.id;
        }
            total += Number(item.price);
            
            prod += `
            <li class="card mb-3 id="elem${item.id}" style="width:50%; heigh:10%;background-color: silver;border-radius: 5px; box-shadow: 5px 5px 5px rgb(55, 143, 146);">
                <div class="row g-0" style>
                    <div class="col-md-6">
                        <button id="del${item.id}" class="position-absolute top-0 end-0 text-decoration-none" style="background-color:silver;color:#63ada8;border: none;padding: 10px 15px; font-size: 18px;" onclick=delBtn(${item.id})>x</button>
                        <br>
                        <img src="${item.img}" style="width: 70%; height: 60%; border-radius: 5px; box-shadow: 2px 2px 2px rgb(55, 143, 146);">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body fw-bold fs-6" style="color:green;">
                            <p id="pp${item.id}">${item.product}</p> <br> 
                            <p id="pp${item.id}">Amount: ${item.price}</p>
                            <button style="background-color:silver; border: none;padding: font-size: 18px;" onclick=min(${item.id})>-</button>
                            <input style="width:50px;" id="x${item.id}" type="number" value=${count} readonly> 
                            <button style="background-color:silver; border: none;font-size: 18px;" onclick=add(${item.id})>+</button> 
                        </div>
                    </div>
                </div>
            <li>`;
            });

    show.innerHTML = prod;
    
    totalamount.innerHTML = total;
        }

//array  = list (kahit may redundant)
let sample = [1, 1, 2, 2, 3 ,4];
// 6 elements 

//set = list (unique values only)
let uniquesample = [... new Set(sample)];
// 4 unique 
// console.log(sample);
// console.log(uniquesample);

document.addEventListener("DOMContentLoaded", function() {
    displayOrderSummary();
});

function displayOrderSummary() {

    let cart = JSON.parse(localStorage.getItem("order"));
    let summaryList = document.getElementById("summary");
    let totalPriceElement = document.getElementById("totalPrice");

    if (cart === null || cart.length === 0) {
        summaryList.innerHTML = "<li sty>No items in the cart</li>";
        totalPriceElement.innerText = "Total Price: $0.00";
    } else {
        let totalPrice = 0;

        cart.forEach(item => {
            let listItem = document.createElement("li");
            listItem.textContent = `${item.product} - ${item.price}`;
            summaryList.appendChild(listItem);

    let priceWithoutCurrency = item.price.replace(/[^\d.]/g, "");
    totalPrice += parseFloat(priceWithoutCurrency);
});

    totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

    function logout(){
    sessionStorage.removeItem("login");
    location.replace("login.html");
    }
}