window.addEventListener("load", function () {
    let links = document.querySelectorAll("nav.menu a")
    console.log(links)
    function activeLink(){
        let path = window.location.href;
        let currentElement = path.split('#');
        if(currentElement.length > 1) {
            currentElement = currentElement[1]
        }

        for (let i = 0; i < links.length; ++i) {
            console.log('#' + currentElement === links[i].hash)
            if ('#' + currentElement === links[i].hash) {
                links[i].classList.add("navigates")
            } else {
                links[i].classList.remove("navigates")
            }
        }
    }
    window.addEventListener("scroll", activeLink)
    activeLink()
})