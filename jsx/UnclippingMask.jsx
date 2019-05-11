#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var sel = doc.selection;
  if (sel.length > 0) {
    if (sel[0].typename == 'GroupItem' && sel[0].clipped == true) {
      var clipPath = null;
      var clipGroup = sel[0].pageItems.length;
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'PathItem' && sel[0].pageItems[i].clipping == true) {
            clipPath = sel[0].pageItems[i];
          };
        };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'CompoundPathItem' && sel[0].pageItems[i].pathItems[0].clipping == true) {
            clipPath = sel[0].pageItems[i];
          }
        };
      };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'PluginItem') {
            clipPath = sel[0].pageItems[i];
          }
        };
      };
      app.executeMenuCommand('releaseMask');
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
