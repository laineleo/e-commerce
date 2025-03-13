document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll(".product-click");

    productLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const image = this.querySelector(".image-click");
            const imageLink = image.getAttribute("src");
            const productName = this.querySelector("h5").innerText;
            const ratingText = this.querySelector(".rating-text").innerText;
            const description = this.querySelector(".described").innerText;
            const productPrice = this.querySelector(".product-price").innerText;
            const cleanedDescription = description.trim().replace(/\s+/g, ' ').replace(/\n/g, ' ');

            // Collect the mini images
            const miniImages = this.querySelectorAll(".mini-img");
            const miniImageLinks = Array.from(miniImages).map(img => img.getAttribute("src"));

            const productDetails = {
                image: imageLink,
                name: productName,
                rateText: ratingText,
                description: cleanedDescription,
                price: productPrice,
                miniImages: miniImageLinks // Add the new images here
            };
            sessionStorage.setItem("selectedProduct", JSON.stringify(productDetails));

            window.location.href = "product-view.html";
        });
    });
});