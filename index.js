var txt = "From Streets To Style — We’ve Got Your Kicks.";
var speed = 70;
var i = 0;

function typewriter() {

    if (i < txt.length) {

        document.getElementById("Tagline").innerHTML += txt.charAt(i);
        i++;

        if(i == txt.length){

            let b = document.createElement("button");
            b.innerText = "SHOP NOW";
            b.id = "shopBtn";

            b.onclick = function(){
                document.getElementById("container").scrollIntoView({
                    behavior: "smooth"
                });
            };

            
            document.getElementById("wrap").appendChild(b);

        }

        setTimeout(typewriter, speed);

    }

}

window.onload = function() {
    typewriter();

};










function addCart(button){

    let card = button.parentElement;


    let product = {

        name: card.querySelector("h2").innerText,

      price: card.querySelector("h3").innerText.replace(/[^\d]/g,""),

        image: card.querySelector("img").src,

        quantity:1

    };


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    cart.push(product);


    localStorage.setItem("cart", JSON.stringify(cart));


    updateCartBadge();


    showCartPopup(card);

}



function showCartPopup(card){

    let popup = document.createElement("div");

    popup.innerText = "Added to Cart 🛒";

    popup.className = "cart-popup";


    card.appendChild(popup);


    setTimeout(()=>{

        popup.remove();

    },1500);

}



function updateCartBadge(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let badge = document.getElementById("cartBadge");


    if(badge){

        if(cart.length > 0){

            badge.innerText = cart.length;

        }
        else{

            badge.innerText = "";

        }

    }

}





function addWish(button){


    let card = button.parentElement;


    let product = {


        name: card.querySelector("h2").innerText,

        price: card.querySelector("h3").innerText.replace(/[^\d]/g,""),

        image: card.querySelector("img").src


    };



    let wishlist = 
    JSON.parse(localStorage.getItem("wishlist")) || [];



    let exists = wishlist.some(
        item => item.name === product.name
    );



    if(!exists){


        wishlist.push(product);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        button.innerText="❤️ Wishlisted";


        showWishPopup(card,"Added to Wishlist ❤️");


    }
    else{


        wishlist = wishlist.filter(
            item => item.name !== product.name
        );


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        button.innerText="🤍 Wishlist";


        showWishPopup(card,"Removed from Wishlist");


    }


    updateWishBadge();


}








function updateWishBadge(){


    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];



    let badge =
    document.getElementById("wishBadge");



    if(badge){


        badge.innerText =
        wishlist.length > 0 ? wishlist.length : "";


    }


}








function showWishPopup(card,message){


    let popup = document.createElement("div");


    popup.innerText = message;


    popup.className="cart-popup";


    card.appendChild(popup);



    setTimeout(()=>{


        popup.remove();


    },1500);


}

document.addEventListener("DOMContentLoaded", function(){

    updateCartBadge();
  updateWishBadge();
});





window.addEventListener("load", function(){

    if(window.location.hash === "#container"){

        document.getElementById("container").scrollIntoView({
            behavior:"smooth"
        });

    }

});