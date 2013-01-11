// Generated by CoffeeScript 1.4.0
(function() {

  window.onload = function() {
    var equationBox, inputBox, message;
    inputBox = document.getElementById('inputBox');
    equationBox = document.getElementById('equationBox');
    message = equationBox.innerHTML;
    startEquations(inputBox, equationBox, message, true);
    return inputBox.onsearch = function() {
      var url;
      if (inputBox.value) {
        url = "http://www.wolframalpha.com/input/?i=" + (encodeURIComponent(inputBox.value));
        return chrome.tabs.create({
          url: url
        });
      } else {
        return equationBox.innerHTML = message;
      }
    };
  };

}).call(this);
