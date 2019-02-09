// Generated by CoffeeScript 2.3.2
(function() {
  var className, createDataTransfer, enableInputBox, i, imageToDataURL, imgURL, inputBox, inputBoxes, len, observer, picker, ref, responseClassName;

  imgURL = chrome.extension.getURL('icon.png');

  className = 'qe-input-box';

  inputBoxes = window.inputBoxes || [];

  responseClassName = 'freebirdFormeditorViewResponsesQuestionviewItemsShortText';

  enableInputBox = function(element) {
    var button, equation, equationBox, image, wrapper;
    if (!element) {
      return;
    }
    wrapper = element.closest('.freebirdFormviewerViewItemsTextItemWrapper, .freebirdFormeditorViewResponsesQuestionviewQuestionAnswerPreview');
    if (!wrapper) {
      return;
    }
    if (element.classList.contains(className) || element.getElementsByClassName(className).length) {
      return;
    }
    element.classList.add(className);
    image = document.createElement('img');
    image.src = imgURL;
    image.style.display = 'block';
    button = document.createElement('button');
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.padding = '0';
    button.style.marginLeft = '5px';
    button.appendChild(image);
    equation = null;
    equationBox = null;
    button.onclick = function() {
      var inputBox, value;
      if (equation) {
        equation.disable();
        equation = null;
        equationBox.remove();
        equationBox = null;
        return;
      }
      equationBox = document.createElement('div');
      equationBox.style.display = 'inline-block';
      equationBox.style.marginTop = '5px';
      equationBox.style.fontSize = '1.5em';
      if (element.classList.contains(responseClassName)) {
        equationBox.style.paddingTop = '20px';
        equationBox.style.paddingLeft = '36px';
      }
      wrapper.parentNode.insertBefore(equationBox, wrapper);
      if (element.tagName === 'INPUT') {
        inputBox = element;
      } else {
        value = element.innerText;
        inputBox = document.createElement('input');
        inputBox.value = value;
      }
      return equation = new Equation(inputBox, equationBox);
    };
    return element.parentNode.insertBefore(button, element.nextSibling);
  };

  for (i = 0, len = inputBoxes.length; i < len; i++) {
    inputBox = inputBoxes[i];
    enableInputBox(inputBox);
  }

  observer = new MutationObserver(function(mutations) {
    var base, j, len1, mutation, results;
    results = [];
    for (j = 0, len1 = mutations.length; j < len1; j++) {
      mutation = mutations[j];
      inputBox = typeof (base = mutation.target).querySelector === "function" ? base.querySelector(`.freebirdFormviewerViewItemsTextShortText, .${responseClassName}`) : void 0;
      if (inputBox) {
        inputBox.style.display = 'inline-block';
        results.push(enableInputBox(inputBox));
      } else {
        results.push(void 0);
      }
    }
    return results;
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  createDataTransfer = function(url, name) {
    var data, dt, file, parts, type;
    parts = url.split(',');
    type = parts[0].split(':')[1].split(';')[0];
    data = Uint8Array.from(atob(parts[1]), function(c) {
      return c.charCodeAt(0);
    });
    file = new File([data], name, {
      type: type
    });
    dt = new DataTransfer;
    dt.items.add(file);
    return dt;
  };

  imageToDataURL = function(img, width, height) {
    var canvas, ctx;
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
  };

  picker = (ref = document.querySelector('#doclist')) != null ? ref.querySelector('div') : void 0;

  if (picker) {
    picker.addEventListener('drop', function(e) {
      var img, url;
      url = e.dataTransfer.getData('text/uri-list');
      if (!url.startsWith('data:image/png;base64,')) {
        return;
      }
      img = document.createElement('img');
      img.onload = function() {
        var dt, input;
        url = imageToDataURL(img, img.width / 2, img.height / 2);
        dt = createDataTransfer(url, 'equation.png');
        input = picker.querySelector('input[type=file]');
        input.files = dt.files;
        return input.dispatchEvent(new Event('change'));
      };
      return img.src = url;
    });
  }

}).call(this);

//# sourceMappingURL=google-forms.js.map
