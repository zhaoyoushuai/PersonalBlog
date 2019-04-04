var input = document.getElementById("search-input");
var btn = document.getElementById("search-btn");

btn.onclick = function(){
    window.location.href = "?search=" + input.value;
    console.log(123)
}

