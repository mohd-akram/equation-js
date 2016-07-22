// Generated by CoffeeScript 1.10.0
(function() {
  var button, equation, imgURL, optionsDiv;

  button = document.createElement('button');

  imgURL = chrome.extension.getURL('icon.png');

  button.innerHTML = "<img src=\"" + imgURL + "\" alt=\"Quick Equations\">";

  optionsDiv = document.getElementsByClassName('input-bottom-buttons')[0];

  optionsDiv.appendChild(button);

  equation = null;

  button.onclick = function(e) {
    var equationBox;
    equationBox = window.equationBox;
    if (!equationBox) {
      equationBox = document.createElement('div');
      equationBox.id = 'equationBox';
      equationBox.innerHTML = 'Type an equation above';
      view.parentNode.insertBefore(equationBox, view);
      equation = new Equation(query, equationBox);
    } else {
      equation.disable();
      view.parentNode.removeChild(equationBox);
    }
    return e.preventDefault();
  };

}).call(this);

//# sourceMappingURL=wolfram.js.map
