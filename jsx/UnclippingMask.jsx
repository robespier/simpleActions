// Unclipping Mask version 1.0.0 created: december 2018 author: Roman Sergeev
#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var docSelected = doc.selection;
  if (docSelected.length > 0) {
    if (docSelected[0].typename === 'GroupItem' && docSelected[0].clipped === true) {
      var clipGroup = docSelected[0].pageItems.length;
      var clipPath;
      for (var i = 0; i < clipGroup; i++) {
        if (docSelected[0].pageItems[i].typename === 'PathItem' && docSelected[0].pageItems[i].clipping === true) {
          clipPath = docSelected[0].pageItems[i];
        };
      };
      clipPath.moveToBeginning(docSelected[0]);
      docSelected[0].clipped = false;
      app.executeMenuCommand('ungroup');
      clipPath.remove();
    }
    else {
      alert ('Выделение не является объектом-маской!');
    };
  }
  else {
    alert ('Нет выделенных объектов!');
  };
}
else {
  alert('Нет открытых документов!');
};
