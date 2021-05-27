let button = document.getElementById('extract');
button.onclick = function() {
    let images = document.getElementsByTagName('img');
    let gifs = [];
    images?.forEach(element => {
        element.src.includes('.gif');
        gifs = [...gifs, element.src];
    });
}