// Generated by CoffeeScript 1.10.0
(function() {
  var loadEquations;

  loadEquations = function(tabId, tab) {
    var getInputBoxes, storeURL;
    storeURL = 'https://chrome.google.com/webstore';
    getInputBoxes = "inputBoxes = document.querySelectorAll('input[id*=AnSwEr]'); inputBoxes.length";
    if (tab.url.slice(0, 4) === 'http' && tab.url.slice(0, storeURL.length) !== storeURL) {
      return chrome.tabs.executeScript(tabId, {
        code: getInputBoxes
      }, function(result) {
        if (result[0] > 0) {
          chrome.tabs.insertCSS(tabId, {
            file: "mathscribe/jqmath-0.4.3.css"
          });
          return chrome.tabs.executeScript(tabId, {
            file: "mathscribe/jquery-3.1.0.min.js"
          }, function() {
            return chrome.tabs.executeScript(tabId, {
              file: "mathscribe/jqmath-etc-0.4.4.min.js"
            }, function() {
              return chrome.tabs.executeScript(tabId, {
                file: "equation.js"
              }, function() {
                return chrome.tabs.executeScript(tabId, {
                  file: "webwork.js"
                });
              });
            });
          });
        }
      });
    }
  };

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      return chrome.permissions.contains({
        permissions: ['tabs'],
        origins: ["http://*/*", "https://*/*"]
      }, function(permitted) {
        if (permitted) {
          return loadEquations(tabId, tab);
        }
      });
    }
  });

}).call(this);

//# sourceMappingURL=eventPage.js.map
