document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll(".product-click");

    productLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const image = this.querySelector(".image-click");
            const imageLink = image.getAttribute("src");
            const productName = this.querySelector("h5").innerText;
            const rating = this.querySelector("i");
            const ratingText = this.querySelector(".rating-text").innerText;
            const description = this.querySelector(".described").innerText;
            const productPrice = this.querySelector(".product-price").innerText;
            const cleanedDescription = description.trim().replace(/\s+/g, ' ').replace(/\n/g, ' ');

            console.log("Cleaned Description before storing:", cleanedDescription);

            const productDetails = {
                image: imageLink,
                name: productName,
                rate: rating,
                rateText: ratingText,
                description: cleanedDescription,
                price: productPrice
            };
            sessionStorage.setItem("selectedProduct", JSON.stringify(productDetails));

            console.log(sessionStorage);

            window.location.href = "product-view.html";
        });
    });
});