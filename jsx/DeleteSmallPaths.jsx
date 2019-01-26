
#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var lay = doc.activeLayer;
  if (lay.pageItems.length === 1) {
      if (lay.pageItems[0].typename === 'CompoundPathItem') {
        var areaMin = 0.75;
        var compoundPath = lay.pageItems[0];
        var pathItemsLength = compoundPath.pathItems.length;
        for (var i=1; i < pathItemsLength+1; i++) {
          var currentItem = pathItemsLength-i;
          if (Math.abs(compoundPath.pathItems[currentItem].area) < areaMin) {
            compoundPath.pathItems[currentItem].remove();
          }
        };
    }
    else {
      alert ('Содержимое активного слоя\nне является составным контуром!');
    };
  }
  else {
    alert ('На слое должен быть один объект!');
  };
}
else {
  alert('Нет открытых документов!');
};

/* Old version
#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var docSelected = doc.selection;
  if (docSelected.length > 0) {
      if (docSelected[0].parent.typename === 'CompoundPathItem') {
        var areaMin = Math.abs(docSelected[0].area);
        var compoundPath = docSelected[0].parent;
        var pathItemsLength = compoundPath.pathItems.length;
        for (var i=1; i < pathItemsLength+1; i++) {
          var currentItem = pathItemsLength-i;
          if (Math.abs(compoundPath.pathItems[currentItem].area) < areaMin) {
            compoundPath.pathItems[currentItem].remove();
          }
        };
    }
    else {
      alert ('Выделение не является частью составного контура!');
    };
  }
  else {
    alert ('Нет выделенных объектов!');
  };
}
else {
  alert('Нет открытых документов!');
};
*/
