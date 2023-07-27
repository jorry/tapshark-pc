// var setRemSize = function () { if (document.documentElement.clientWidth > 750) { document.documentElement.style.fontSize = '100px'; } else { var _clientWidth = document.documentElement.clientWidth / 7.5 + "px"; document.documentElement.style.fontSize = _clientWidth; } }; setRemSize(); window.addEventListener("resize", setRemSize, false);
var setRemSize = function () {
    var _clientWidth = document.documentElement.clientWidth;
    if (_clientWidth <= 1200 && _clientWidth > 750) {
        document.documentElement.style.fontSize = '62.5px';
    } else if(_clientWidth <= 750){
        document.documentElement.style.fontSize = _clientWidth/ 7.5 + "px";
    }else {
        document.documentElement.style.fontSize = _clientWidth / 19.2 + 'px';
    }
};
setRemSize();
