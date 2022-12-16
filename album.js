window.addEventListener("load", async function loadUrl() {
    const container = document.getElementById('photos');
    let gallery = []

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/photos')
        gallery = await response.json();
        let counter = 0
        gallery = gallery.filter(function () {
            return (counter++ < 20 && 1 == Math.round(Math.random()));
        });
    } catch (e) {
        const messageContainer = document.createElement("div")
        const message = document.createElement("p");
        const messageImage = document.createElement("img");
        message.innerHTML = "Ошибка - не удалось загрузить фото";
        messageImage.src = 'pictures/gif/error.gif';
        message.classList.add("error_message");
        messageImage.classList.add("message_image");
        messageContainer.classList.add("error_container");
        messageContainer.appendChild(message)
        messageContainer.appendChild(messageImage);
        container.appendChild(messageContainer);
        return
    } finally {
        document.getElementsByClassName("preLoad")[0].style.display = "none"
    }
    gallery.forEach(function (gal) {
        const newUrl = document.createElement("article");
        const title = document.createElement("div");

        const titleName = document.createElement("h3");
        titleName.innerHTML = gal.title;
        const thumbnailUrl = document.createElement("img");
        thumbnailUrl.src =  gal.thumbnailUrl;
        const mainPhoto = document.createElement("img");
        mainPhoto.src = gal.url;

        title.classList.add("title_in_album")
        titleName.classList.add("title_name_in_album")
        thumbnailUrl.classList.add("thumbnailUrl_of_photo")
        mainPhoto.classList.add("main_photo")
        newUrl.classList.add("photo_with_title")

        title.appendChild(thumbnailUrl)
        title.appendChild(titleName)
        newUrl.appendChild(title)
        newUrl.appendChild(mainPhoto)
        container.appendChild(newUrl)
    });
})