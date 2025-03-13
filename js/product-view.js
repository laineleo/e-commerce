document.addEventListener("DOMContentLoaded", function () {
    const productDetails = JSON.parse(sessionStorage.getItem("selectedProduct"));

    let mainImage;

    // Define a maximum quantity limit
    const MAX_QUANTITY = 10; // Set your desired limit here

    if (productDetails) {
        mainImage = document.getElementById("main-image");
        const productNameElement = document.querySelector("h2");
        const ratingTxt = document.querySelector(".rating-text-view");
        const priceElement = document.querySelector(".price");
        const descriptionElement = document.querySelector(".product-description");

        mainImage.setAttribute("src", productDetails.image);
        productNameElement.innerText = productDetails.name;
        ratingTxt.innerText = productDetails.rateText;
        priceElement.innerText = productDetails.price;
        descriptionElement.innerText = productDetails.description;
    }

    const addToCartButton = document.querySelector(".add-to-cart");
    const quantityInput = document.querySelector("input[type='number']");
    const priceElement = document.querySelector(".price");
    const totalPriceElement = document.querySelector(".total-price"); // Select the total price element
    const productName = document.querySelector("h2").innerText;

    // Function to update the total amount
    function updateTotalAmount() {
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const totalAmount = (quantity * price);
        totalPriceElement.innerText = `$${totalAmount}`; // Update the total price element
    }

    // Update total amount when quantity changes
    quantityInput.addEventListener("input", function () {
        let quantity = parseInt(quantityInput.value);

        // Check if quantity exceeds the maximum limit
        if (quantity > MAX_QUANTITY) {
            quantity = MAX_QUANTITY; // Set to max limit
            quantityInput.value = quantity; // Update the input field
            alert(`You can only add up to ${MAX_QUANTITY} items.`); // Optional alert
        }

        updateTotalAmount();
    });

    addToCartButton.addEventListener("click", function (event) {
        event.preventDefault();

        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const totalAmount = (quantity * price);

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

    updateTotalAmount();

    const profileBtn = document.getElementById("profile-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");
    
    profileBtn.addEventListener("click", function (event) {
        event.stopPropagation(); 
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});