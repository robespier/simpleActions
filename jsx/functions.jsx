// Select All
function selectAll() {
  var doc = app.activeDocument;
  for (var i=0; i < doc.pageItems.length; i++) {
      doc.pageItems[i].selected = true;
  };
};

// Deselect All
function deselectAll() {
  var doc = app.activeDocument;
  var docSelected = doc.selection;
  for (var i=0; i < docSelected.length; i++) {
      docSelected[i].selected = false;
  };
};

// Check Layer in Active Document
function checkLayer(name, context) {
  var checkOut;
  for (var i = 0; i < context.length; i++) {
    if (layer[i].name === name) {
      checkOut = true;
      break;
    }
    else {
        checkOut = false;
    };
  };
  return checkOut;
};

// Check Group in Layer
function checkGroup(name, context) {
  var checkOut;
  for (var i = 0; i < context.length; i++) {
    if (group[i].name === name) {
      checkOut = true;
      break;
    }
    else {
        checkOut = false;
    };
  };
  return checkOut;
};

// Create new layer
function newLayer(name) {
  var addLayer = layer.add();
  addLayer.name = name;
};

// Convert mm to pt
function mmtp(mm) {
  return mm*2.83464566929134
};

// Get Pretty Current Date
function getPrettyDate() {
  var d = new Date();
  var prettyDate;
  var numberDate = d.getDate();
    if (numberDate < 10) {
      prettyDate = '0' + d.getDate();
    }
    else {
      prettyDate = d.getDate();
    };
  var prettyMonth;
  var numberMonth = d.getMonth()+1;
    if (numberMonth < 10) {
      prettyMonth = "0" + numberMonth;
    }
    else {
      prettyMonth = numberMonth;
    };
  var year = d.getFullYear();
  var hours = d.getHours();
  var prettyMinutes;
  var numberMinutes = d.getMinutes();
    if (numberMinutes < 10) {
      prettyMinutes = '0' + d.getMinutes();
    }
    else {
      prettyMinutes = d.getMinutes();
    }
  var date = prettyDate + '.' + prettyMonth + '.' + year + ' ' + hours + ':' + prettyMinutes;
  return date;
};

// Greate offsetPath
function greateOffsetPath(path) {
  var value;
  value = prompt('Введите значение отступа от контура высечки (в миллиметрах)...\nОтрицательное значение сделает отступ внутрь контура.', '2', 'Offset Path'); // Окно диалога для ввода значения Offset Path
    if (value != null) {
      var offsetvalue = mmtp(value);
      var jointype ='Round'; // Default value
      var miterlimitvalue = '4'; // Default value
      var targetPath = path.duplicate(); // Дублируем исходный контур
      xmlstring = '<LiveEffect name="Adobe Offset Path"><Dict data="R mlim '+miterlimitvalue + ' R ofst ' + offsetvalue + ' I jntp ' + jointype + '"/></LiveEffect>';
      targetPath.applyEffect(xmlstring); // Применяем эффект Offset Path для контура
      deselectAll(); // Убираем выделение в активном документе
      targetPath.selected = true; // Выделяем целевой контур
      app.executeMenuCommand('expandStyle'); // Expand Appearance для эффекта Offset Path
    };
  return targetPath;
};

// Create Spot Swatch
function createSpotSwatch(name, color) {
  var cmykColor = new CMYKColor();
    cmykColor.cyan = color[0];
    cmykColor.magenta = color[1];
    cmykColor.yellow = color[2];
    cmykColor.black = color[3];
  var spot = app.activeDocument.spots.add();
    spot.color = cmykColor;
    spot.colorType = ColorModel.SPOT;
    spot.name = name;
};
