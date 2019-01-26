// Duplicate content all selected layers on new layer
#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
    var doc = app.activeDocument;
    var docSelected = doc.selection;
    if (docSelected.length > 0) {
        var layer = doc.layers;
// Check validity layers name
        for (var i=0; i < layer.length; i++) {
            if (!isNaN(layer[i].name)) {
                var newName = 'Pantone ' + layer[i].name;
                layer[i].name = newName;
            };
        };
// Preparation and check layer 'cut'
        var cutLayer = checkLayer('cut', layer);
        if (cutLayer) {
          layer['cut'].visible = true;
          layer['cut'].locked = false;
          if (layer['cut'].pageItems.length > 0) {
            if (layer['cut'].pageItems.length === 1) {
              var cutPath = layer['cut'].pageItems[0];
// Definition orientation cut
        var cutRate = cutPath.width/cutPath.height;
        if (cutRate >= 1) {
          var moveDirection = 'height';
        };
        else {
          var moveDirection = 'width';
        };
// Get selected layers
        var selectedLayers = new Array;
        for (var i=0; i < layer.length; i++) {
            for (var j=0; j < layer[i].pageItems.length; j++) {
                var a = layer[i].pageItems[j];
                if (a.selected && (layer[i].name != 'cut')) {
                    selectedLayers.push(layer[i].name);
                    break;
                };
            };
        };
// Greate blank layer
        var blankLayer = checkLayer('blank', layer);
        if (blankLayer) {
            layer['blank'].visible = true;
            layer['blank'].locked = false;
        };
        else {
            newLayer ('blank');
        };
// Duplicate all selected layers
        for (var i=0; i < selectedLayers.length; i++) {
            duplicateLayer (selectedLayers[i], cutPath, moveDirection);
        };
// Deselect all
        var docSelected = doc.selection;
        for (var j=0; j<docSelected.length; j++) {
            docSelected[j].selected = false;
        };

            alert ('Все выбранные слои сдублированы на слой "blank"');
            };
              else {
              alert ('На слое высечки должен быть 1 объект');
              };
          };
            else {
            alert ('На слое высечки нет контуров');
            };
        };
          else {
          alert ('Слой высечки не найден. Создайте или переименуйте слой "cut"');
          };
    };
      else {
      alert ('Выберите объекты на одном или нескольких слоях');
      };
};
  else {
  alert ('Нет открытых документов');
  };

///////////////////////////////////////////////////////////////////////////

// Duplicate all items selected layers on layer 'blank'
function duplicateLayer(name, item, moveDirection) {

  // Create dummy group
  var newGroup = layer['blank'].groupItems.add();
  newGroup.name = layer[name].name;

  // Duplicate content current layer
  var layerItems = layer[name].pageItems.length;
  for (var j=1; j < layerItems+1; j++) {
    var currentItem = layerItems-j;
    var newItem = layer[name].pageItems[currentItem].duplicate(layer['blank'].groupItems[name], ElementPlacement.PLACEATBEGINNING);
    switch (moveDirection) {
      case 'width':
        itemMove = newItem.position[0] + (item.width) * (i+1) *1.1;
        newItem.position = new Array (itemMove, newItem.position[1]);
        break;
      case 'height':
        itemMove = newItem.position[1] + (item.height) * (i+1) *1.3;
        newItem.position = new Array (newItem.position[0], itemMove);
        break;
    };
  };

  // Duplicate cutPath
  var cutItem = layer['cut'].pageItems[0].duplicate(layer['blank'].groupItems[name], ElementPlacement.PLACEATBEGINNING);
  switch (moveDirection) {
    case 'width':
      itemMove = cutItem.position[0] + (item.width) * (i+1) *1.1;
      cutItem.position = new Array (itemMove, cutItem.position[1]);
      break;
    case 'height':
      itemMove = cutItem.position[1] + (item.height) * (i+1) *1.3;
      cutItem.position = new Array (cutItem.position[0], itemMove);
      break;
  };

  // Create label
  var labelItem = layer['blank'].groupItems[name].textFrames.pointText([(item.position[0]), (item.position[1])]);
  labelItem.contents = layer[name].name;
  switch (moveDirection) {
    case 'width':
      itemMove = labelItem.position[0] + (item.width) * (i+1) *1.1;
      labelItem.position = new Array (itemMove + item.width/2, labelItem.position[1] + 20);
      labelItem.story.textRange.justification = Justification.CENTER;
      break;
    case 'height':
      itemMove = labelItem.position[1] + (item.height) * (i+1) *1.3;
      labelItem.position = new Array (labelItem.position[0] + item.width/2, itemMove + 15);
      labelItem.story.textRange.justification = Justification.CENTER;
      break;
  };
};
