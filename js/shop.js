const url = `http://127.0.0.1:5500/js/api.js`;

fetch(url)
.then( response => response.json())
.then( result => {


    let a = [];
    a = result;

    let div_area = document.getElementById("products");

    let show = "";

    a.forEach(
        function(item){

            show += 
            `<div class="card d-inline-flex" style="width: 18.5rem;margin:3px;margin-top:10px;
            border-radius: 15px; box-shadow: 0px 2px 3px rgb(55, 143, 146);">
                <img src="${item.img}" id = "img${item.id}" class="card-img-top" alt="..." style="border-radius:10px">
                <div class="card-body">
                <p class="card-text"  id="p${item.id}" hidden>${item.id}</p>
                <h5 class="card-title" id="prod${item.id}"> ${item.product}</h5>
                <h5 class="card-title" id="dre${item.id}" hidden> ${item.product}</h5>
                <p class="card-text"  id="pri${item.id}">${item.price}</p>
                <a href="#" class="btn btn-dark" data-bs-toggle="modal" data-bs-target=#m${item.id}>Buy</a>
                <!-- Modal -->
                <center>
                <div class="card modal fade" id="m${item.id}" tabindex="-1" aria-labelledby="m${item.id}Label" aria-hidden="true">
                <div class="row g-0  modal-dialog">
                  <div class="modal-content">
                  <div style="border-radius: 5px; box-shadow: 5px 10px 15px rgb(55, 143, 146);">
                  <img src="${item.img}" width="490px" height="300px" style="margin-top:5px;border-radius: 5px;">
                  <p class="modal-title fs-5" id="m${item.id}Label">${item.product}</p>
                  </div>
                  </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                    <p class="card-text"  id="p${item.id}" hidden>${item.id}</p>
                    <h6 class="card-title" id="dre${item.id}" style="color: #125752;">${item.description}</h6>
                    <br>
                    <h4 class="fw-bolder" style="color: #125752;" id="pri${item.id}">${item.price}</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" id=${item.id} onclick="addOrder(${item.id})">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </center>
          `;
            
        });
        div_area.innerHTML = show ;
       
})

function addOrder(id){
    let logs = sessionStorage.getItem("login");
    if((logs == null) || (logs == "")) { 
        alert("Please log in first!");
        location.replace("login.html");
    }else{
        let array = localStorage.getItem("order");
        
        if (array == null){
            let orderlist = [];
            let new_id = document.getElementById("p"+id).innerText;
            let new_prod = document.getElementById("prod"+id).innerText;
            let new_dre= document.getElementById("dre"+id).innerText;
            let new_price = document.getElementById("pri"+id).innerText;

            let prod_img = document.getElementById("img" + id).src;
            console.log(prod_img);
            
            orderlist.push({id: new_id, product: new_prod, price: new_price,description: new_dre, img: prod_img }); 
            localStorage.setItem("order",JSON.stringify(orderlist));
            cartlength();

        }else{
            let orderlist = JSON.parse( localStorage.getItem("order"));
            let new_id = document.getElementById("p"+id).innerText;
            let new_prod = document.getElementById("prod"+id).innerText;
            let new_dre= document.getElementById("dre"+id).innerText;
            let new_price = document.getElementById("pri"+id).innerText;

            let prod_img = document.getElementById("img" + id).src;
            console.log(prod_img);
            
            orderlist.push({id: new_id, product: new_prod, price: new_price ,description: new_dre, img: prod_img}); 
            localStorage.setItem("order",JSON.stringify(orderlist));
            cartlength();
        }
    }

}

function cartlength(){

    let cart = JSON.parse(localStorage.getItem("order")); 
    if (cart == null){
        let cart_l = document.getElementById("cartlength");
        cart_l.innerText = "";
    }else{
        let cart_l = document.getElementById("cartlength");
        cart_l.innerText = cart.length;
    }
   
}
cartlength();
