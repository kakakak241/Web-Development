let time_before = new Date().getTime();
window.onload = page_ready();
function page_ready(){
    document.getElementById("loading_time").innerHTML =
        "Time is <b>" + (new Date().getTime() - time_before) / 1000 + "</b> seconds;"
}