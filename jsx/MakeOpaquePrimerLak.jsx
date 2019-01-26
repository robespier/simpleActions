#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var docSelected = doc.selection;
  if (docSelected.length > 0) {
    if (docSelected[0].typename === 'PathItem' || docSelected[0].typename === 'CompoundPathItem') {
      var offsetPath = greateOffsetPath(docSelected[0]);
    }
    else {
      alert ('Выделение не является простым или составным контуром!');
    };
  }
  else {
    alert ('Нет выделенных объектов!');
  };
}
else {
  alert('Нет открытых документов!');
};
