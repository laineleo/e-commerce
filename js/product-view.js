document.addEventListener("DOMContentLoaded", function () {
    let mainImage = document.getElementById("main-image");

    if (mainImage) {
        let imageLink = sessionStorage.getItem("selectedImage");
        if (imageLink) {
            mainImage.setAttribute("src", imageLink);
        }
    }

    const addToCartButton = document.querySelector(".add-to-cart");
    const quantityInput = document.querySelector("input[type='number']");
    const priceElement = document.querySelector(".price");
    const productName = document.querySelector("h2").innerText;

    addToCartButton.addEventListener("click", function (event) {
        event.preventDefault();

        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const totalAmount = (quantity * price).toFixed(2);

        const product = {
            name: productName,
            price: price,
            quantity: quantity,
            total: totalAmount,
            image: mainImage.src
        };

        let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

        const cartCount = document.querySelector(".cart-btn p");
        cartCount.innerText = `Cart (${cartItems.length})`;

        showModal();
    });

    function showModal() {
        const modal = document.getElementById("success-modal");
        modal.style.display = "block";

        const closeButton = document.querySelector(".close-button");
        closeButton.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});