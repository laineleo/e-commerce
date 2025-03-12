document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll(".product-click");

    productLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const image = this.querySelector(".image-click");
            const imageLink = image.getAttribute("src");

            sessionStorage.setItem("selectedImage", imageLink);

            window.location.href = "product-view.html";
        });
    });
});