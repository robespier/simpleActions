// Обновляет бланк в активном документе Illustrator
#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var layer = doc.layers;
  var layerName = 'blank';
  if (checkLayer(layerName, layer)) {
    if (layer[layerName].pageItems.length != 0) {
      var group = layer[layerName].groupItems;
      var groupName = 'footer';
      if (checkGroup(groupName, group)) {
// Обновление текущей даты
      var myLayer = layer[layerName];
      var myGroup = myLayer.groupItems['footer'].groupItems['date'];
      var myItem = myGroup.textFrames['currentDate'];
      myItem.contents = getPrettyDate();
      }
      else {
        alert('Группа footer на слое blank не найдена!');
      }
    }
    else {
      alert('Слой blank пуст!');
    };
  }
  else {
    alert('Слой blank не найден!');
  };
}
else {
  alert('Нет открытых документов!');
};
