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
  
    let prod = "";
    let count = 0;

    // + button
    function add(a){
        //count += 1 ;
        console.log(a);
        //let qty = document.getElementById("x" +a );
        //qty.value = count;

        let presyo = document.getElementById("p" + a).innerText;
            //presyo = presyo * count;
        //document.getElementById("total" + a).innerHTML = presyo;
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
       
            prod += `<li id="elem${item.id}">
            <img src= "${item.img}" style="width: 100px; height: 100px;"> <br>
            
            Product Name: ${item.product} <br>
            
            <p id="pp${item.id}">${item.price}</p> <br> 

            <p id="total${item.id}">${item.price}</p>
            
            <button onclick= add(${item.id}) >+</button> 

            <input style="width:50px;" id="x${item.id}" type="number" value = ${count} readonly> 
            
            <button  onclick= min(${item.id})>-</button>

            <button id="del${item.id}" onclick= delBtn(${item.id}) >Delete</button>
            
            </li>`;
            
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

function logout(){
    sessionStorage.removeItem("login");
    location.replace("login.html");
}

}