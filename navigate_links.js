window.addEventListener("load", function () {
    let links = document.querySelectorAll("nav.menu a")
    console.log(links)
    function currentLink(){
        let path = window.location.href;
        let currentElement = path.split('#');

        console.log(currentElement)

        if(currentElement.length > 1) {
            currentElement = currentElement[1]
        }

        links.forEach((item) => {
            console.log('#' + currentElement === item.hash)
            '#' + currentElement === item.hash ? item.classList.add("navigates") : item.classList.remove("navigates")
        })
    }
    window.addEventListener("scroll", currentLink)
    currentLink()
})