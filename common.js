document.addEventListener("DOMContentLoaded", function(){

    let searchBox = document.getElementById("search");


    if(searchBox){

        searchBox.addEventListener("input", function(){

            let value = searchBox.value.toLowerCase();


            let cards = document.querySelectorAll(".card, .cart-card");


            cards.forEach(card=>{


                let name = card.querySelector("h2")
                .innerText
                .toLowerCase();


                card.style.display =
                name.includes(value)
                ? "flex"
                : "none";


            });


        });

    }



    updateCartBadge();
    updateWishBadge();

});



function updateCartBadge(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let badge=document.getElementById("cartBadge");

    if(badge){

        badge.innerText =
        cart.length ? cart.length : "";

    }

}




function updateWishBadge(){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


    let badge=document.getElementById("wishBadge");


    if(badge){

        badge.innerText =
        wishlist.length ? wishlist.length : "";

    }

}



document.addEventListener("DOMContentLoaded",function(){

    updateCartBadge();

    updateWishBadge();

});