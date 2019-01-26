#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var docSelected = doc.selection;
  if (docSelected.length > 0) {
    app.executeMenuCommand('Fit Artboard to selected Art');
  }
  else {
    alert ('Нет выделенных объектов!');
  };
}
else {
alert('Нет открытых документов!');
};
