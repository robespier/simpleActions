// Unclipping Mask
// Script to extend the functionality of the Clipping Mask in Adobe Illustrator
// version: 2.0.0
// release: May 2019
// author: Roman Sergeev
// mail: robespier@rambler.ru | skype: romaya7 | github: robespier
#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var sel = doc.selection;
  var clipPath = null;
  var clipGroup = sel[0].pageItems.length;
  if (sel.length > 0) {
    if (sel[0].typename == 'GroupItem' && sel[0].clipped == true) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'PathItem' && sel[0].pageItems[i].clipping == true) {
            clipPath = sel[0].pageItems[i];
            break;
          };
        };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'CompoundPathItem' && sel[0].pageItems[i].pathItems[0].clipping == true) {
            clipPath = sel[0].pageItems[i];
            break;
          }
        };
      };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'PluginItem') {
            sel[0].pageItems[i].remove();
            app.redraw();
            if (sel[0].clipped == false) {
             app.undo();
             clipPath = sel[0].pageItems[i];
             break;
            }
            else {
              app.undo();
            }
          };
        };
      };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'TextFrame' && sel[0].pageItems[i].kind == 'TextType.POINTTEXT') {
            sel[0].pageItems[i].convertPointObjectToAreaObject();
            app.redraw();
            if (sel[0].clipped == false) {
             app.undo();
             clipPath = sel[0].pageItems[i];
             break;
            }
            else {
              app.undo();
            }
          }
        };
      };
      if (clipPath == null) {
        for (var i = 0; i < clipGroup; i++) {
          if (sel[0].pageItems[i].typename == 'TextFrame' && sel[0].pageItems[i].kind == 'TextType.PATHTEXT') {
            sel[0].pageItems[i].convertPointObjectToAreaObject();
            app.redraw();
            if (sel[0].clipped == true) {
             clipPath = sel[0].pageItems[i];
             break;
            }
            else {
              app.undo();
            }
          }
        };
      };
      app.executeMenuCommand('releaseMask');
      clipPath.remove();
    }
    else {
      alert ('Выделение не является объектом-маской!\nSelection is not a mask object!');
    };
  }
  else {
    alert ('Нет выделенных объектов!\nNo objects selected!');
  };
}
else {
  alert ('Нет открытых документов!\nNo open documents!');
};
