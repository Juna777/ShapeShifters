let logs = sessionStorage.getItem("login");
if((logs == null) || (logs == "")) { 
    
    location.replace("login.html");
}else{


let array = JSON.parse(localStorage.getItem("order"));

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


    function add(a){
        count += 1 ;
        console.log(a);
        let qty = document.getElementById("x" +a );
        qty.value = count;

        let presyo = document.getElementById("p" + a).innerText;
            presyo = presyo * count;
        sdocument.getElementById("total" + a).innerHTML = presyo;
            console.log(presyo); 
    }

    
    function min(a){
        let qty = document.getElementById("x" +a );

        if (qty.value == 1){
            count = 1;
        }else{

            count -= 1 ;
         
            qty.value = count;

            let presyo = document.getElementById("pp" + a).innerText;
            presyo = presyo * count;
            document.getElementById("total" + a).innerHTML = presyo;
         

        }

    }

    function delBtn(a){
     
        console.log(a);
       
        let array = JSON.parse(localStorage.getItem("order")); 
        
        console.log(array);

        function checkID(itemz){
            return itemz.id != a;
        } 
        
        let new_array = array.filter(checkID);
        
        localStorage.setItem("order",JSON.stringify(new_array));

        console.log(array.filter(checkID));
   
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
            <center>
            <li id="elem${item.id}"  style="width:60%; heigh:5%;background-color: silver;border-radius: 5px; box-shadow: 3px 3px 3px rgb(55, 143, 146);list-style: none;">
            <div class="card mb-3" style="background-color: #ccc;height:40%;width:100%">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <button id="del${item.id}" class="position-absolute top-0 end-0" onclick= delBtn(${item.id}) >x</button>
                        <img src="${item.img}" style="width: 80%; height: 40%; border-radius: 5px; box-shadow: 2px 2px 2px rgb(55, 143, 146);margin-top:70px;">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                        Product Name: ${item.product} <br>
            
                        <p id="pp${item.id}">${item.price}</p> <br> 
            
                        <p id="total${item.id}">${item.price}</p>
            
                        <button onclick= min(${item.id})  style="border: none;width:15px;">-</button>
            
                        <input style="width:35px;height:30px;"  id="x${item.id}" type="number" value=${count} readonly> 
            
                        <button onclick= add(${item.id}) style="border: none;width:15px;">+</button> 
                        </div>
                        </div>
                    </div>
                    </div>
            </li><br></center>`;
            
    })
    show.innerHTML = prod;
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