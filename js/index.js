function getloc(){
    navigator.geolocation.getCurrentPosition(x);
}

function x(position){
   console.log(position);
   let x = document.getElementById("loc");
   x.innerHTML = "";
}

getloc();


