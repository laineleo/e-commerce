document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".cart-container");
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p>There are no items in this cart.</p><a href="dashboard.html">Continue Shopping</a>`;
        cartContainer.classList.remove("has-items");
    } else {
        cartContainer.innerHTML = '';
        cartContainer.classList.add("has-items");

        cartItems.forEach((item, index) => {
            const cartItemCard = document.createElement("div");
            cartItemCard.classList.add("cart-item-card");
            cartItemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="item-h4">${item.name} <span class="price-span">$ ${item.price}</span></h4>
                    <p class="quantity-p">Quantity <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}"></p>
                    <p class="total-p">Total Amount<span class="item-total">$${item.total}</span></p>
                    <button class="remove-item" data-index="${index}">X</button>
                </div>
            `;
            cartContainer.appendChild(cartItemCard);
        });

        updateTotalAmount(cartItems);
        updateOrderSummary(cartItems); 

        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", function () {
                const index = this.dataset.index;
                const newQuantity = parseInt(this.value);
                cartItems[index].quantity = newQuantity;
                cartItems[index].total = (newQuantity * cartItems[index].price).toFixed(2);
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                updateTotalAmount(cartItems);
                updateOrderSummary(cartItems);
                this.nextElementSibling.innerText = cartItems[index].total;
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                cartItems.splice(index, 1);
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                updateOrderSummary(cartItems); 
                location.reload();
            });
        });
    }

    function updateTotalAmount(items) {
        const totalAmount = items.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);
        const totalElement = document.querySelector(".shipping-summary .total");
        totalElement.innerText = `$${totalAmount}`;

        const modalTotalElement = document.getElementById("total-amount");
        if (modalTotalElement) {
            modalTotalElement.innerText = `$${totalAmount}`;
        }
    }

    function updateOrderSummary(items) {
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalItemsElement = document.getElementById("total-items");
        if (totalItemsElement) {
            totalItemsElement.innerText = totalItems;
        }
    }

    // Payment- modal and required inputs
    const modal = document.getElementById('payment-modal');
    const proceedCheckoutButton = document.getElementById('proceed-checkout');
    const shippingForm = document.querySelector('.shipping-form');
    const paymentForm = document.getElementById('payment-form');

    //overlay element for modal background
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    if (proceedCheckoutButton) {
        proceedCheckoutButton.addEventListener('click', function(event) {
            event.preventDefault();

            const inputs = Array.from(shippingForm.querySelectorAll('input[required]'));
            const firstInvalid = inputs.find(input => !input.value.trim());

            if (firstInvalid) {
                firstInvalid.reportValidity();
                return;
            }

            const totalAmount = document.querySelector(".shipping-summary .total").innerText;
            const modalTotalElement = document.getElementById("total-amount");
            if (modalTotalElement) {
                modalTotalElement.innerText = totalAmount;
            }

            openModal();
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const paymentInputs = Array.from(paymentForm.querySelectorAll('input[required]'));
            const firstInvalidPayment = paymentInputs.find(input => !input.value.trim());

            if (firstInvalidPayment) {
                firstInvalidPayment.reportValidity();
                return;
            }

            showNotification('Payment successful! Thank you for your purchase.');
            paymentForm.reset();
            shippingForm.reset();
            closeModal();
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('payment-notification');
        notification.innerText = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);

    }

    window.openModal = function () {
        if (modal) {
            overlay.style.display = 'block'; 
            modal.style.display = 'block'; 
        }
    }

    window.closeModal = function () {
        if (modal) {
            overlay.style.display = 'none'; 
            modal.style.display = 'none'; 
        }
    }

    window.onclick = function(event) {
        if (event.target === overlay) {
            closeModal();
        }
    }

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
