var doc = app.activeDocument;
var emptyMasks = new Array();
for (var i = 0; i < doc.pageItems.length; i++) {
  if (doc.pageItems[i].typename == 'GroupItem' && doc.pageItems[i].clipped == true && doc.pageItems[i].pageItems.length == 1) {
    emptyMasks.push(doc.pageItems[i]);
  };
};
var emptyMasksLength = emptyMasks.length;
for (var i = 0; i < emptyMasksLength; i++) {
  emptyMasks[i].remove();
};
alert ('Is done!');
