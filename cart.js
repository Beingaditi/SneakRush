let cart = JSON.parse(localStorage.getItem("cart")) || [];

let emptyCart = document.getElementById("empty");
let cartContainer = document.querySelector(".cart-container");
let cartItems = document.getElementById("cartItems");

let subtotal = document.getElementById("subtotal");
let total = document.getElementById("total");



function renderCart(){


    cart = JSON.parse(localStorage.getItem("cart")) || [];


    cartItems.innerHTML = "";


    let bill = 0;



    if(cart.length === 0){


        emptyCart.style.display = "flex";

        cartContainer.style.display = "none";


        if(subtotal){
            subtotal.innerText = "₹0";
        }


        if(total){
            total.innerText = "₹0";
        }


        return;

    }



    emptyCart.style.display = "none";

    cartContainer.style.display = "flex";




    cart.forEach((product,index)=>{


        if(!product.quantity){

            product.quantity = 1;

        }



        let price = Number(product.price);


        bill += price * product.quantity;



        cartItems.innerHTML += `


        <div class="cart-card">


        <img src="${product.image}" class="cart-img">


        <div class="product-info">


        <h2>${product.name}</h2>


        <h3>₹${product.price}</h3>



        <div class="quantity">


        <button onclick="changeQty(${index},-1)">
        -
        </button>


        <span>${product.quantity}</span>


        <button onclick="changeQty(${index},1)">
        +
        </button>


        </div>



        </div>



        <button class="remove" onclick="removeItem(${index})">

        🗑 Remove

        </button>



        </div>


        `;


    });



    subtotal.innerText = "₹" + bill;

    total.innerText = "₹" + bill;



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}





function changeQty(index,value){


    cart[index].quantity += value;



    if(cart[index].quantity < 1){

        cart[index].quantity = 1;

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    renderCart();

}





function removeItem(index){


    cart.splice(index,1);



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    renderCart();


}








renderCart();