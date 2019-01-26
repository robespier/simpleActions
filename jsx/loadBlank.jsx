// Загружает шаблон бланка в активный документ Illustrator
#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var layer = doc.layers;
// Подготовка и проверка слоя бланка
  var layerName = 'blank';
  var blankLayer = checkLayer(layerName, layer);
  if (blankLayer) {
    layer[layerName].visible = true;
    layer[layerName].locked = false;
    deselectAll();
    doc.activeLayer = layer[layerName];
  }
  else {
    newLayer(layerName);
  };
  
// Fit All (Artboards) in Window
//    app.executeMenuCommand('fitall');

// Создаем объект File для бланка
    var blankFile = new File ('C:/' + 'Program Files/' + 'Adobe/' + 'Adobe Illustrator CC 2015/' + 'Cool Extras/' + 'en_US/' + 'Templates/' + 'template.ait');
// Открываем File
    app.open(blankFile);
// Вставка текущей даты
    var doc = app.activeDocument;
    var myLayer = doc.layers['blank'];
    var myGroup = myLayer.groupItems['footer'].groupItems['date'];
    var myItem = myGroup.textFrames['currentDate'];
    myItem.contents = getPrettyDate();
// Select All
    selectAll();
// Копирование в буфер
    app.executeMenuCommand('copy');
// Закрываем активный документ
    doc.close(SaveOptions.DONOTSAVECHANGES);
// Вставка из буфера
    app.executeMenuCommand('paste');
    deselectAll();
}
else {
  alert('Нет открытых документов!');
};
