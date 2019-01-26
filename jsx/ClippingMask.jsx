// Create Clipping Mask with Offset Path for Adobe Illustrator Layer
#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var layer = doc.layers;
  var cutLayer = checkLayer ('cut', layer);
  if (cutLayer) {
    layer['cut'].visible = true;
    layer['cut'].locked = false;
    if (layer['cut'].pageItems.length > 0) {
      if (layer['cut'].pageItems.length === 1) {
        var cutPath = layer['cut'].pageItems[0];
        if (cutPath.typename === 'PathItem') {
          if (cutPath.closed != true) {
            cutPath.closed = true;
          };
        var activeLayer = doc.activeLayer;
        if (activeLayer.pageItems.length > 0) {
          if (activeLayer.name != 'cut') {
              var tPath = greateOffsetPath(cutPath);
              tPath.name = "Clipping Path";
              var clipGroup = activeLayer.groupItems.add();
              clipGroup.name = 'Clip Group';
              var layerItems = activeLayer.pageItems.length;
              for (var j=1; j < layerItems; j++) {
                var currentItem = layerItems-j;
                activeLayer.pageItems[currentItem].moveToBeginning(clipGroup);
              };
              var clippingPath = layer['cut'].pageItems[0].moveToBeginning(clipGroup);
              activeLayer.groupItems[0].clipped = true;
              deselectAll();
          }
          else {
            alert('Слой высечки нельзя маскировать! \nПожалуйста, выберите другой слой.');
          };
        }
        else {
          alert('На активном слое нет объектов!');
        };
        }
        else {
          alert('Маской может быть только простой контур!');
        };
      }
      else {
        alert('На слое высечки должен быть только 1 объект!');
      };
    }
    else {
      alert('На слое высечки нет объектов!');
    };
  }
  else {
    alert('Слой высечки не найден! Создайте или переименуйте слой "cut"');
  };
}
else {
  alert('Нет открытых документов!');
};
