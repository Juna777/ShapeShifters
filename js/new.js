let array = JSON.parse(localStorage.getItem("order"));
console.log(array);

console.log(array.filter(existing));

function existing(item){
    return item.id == 1;
}