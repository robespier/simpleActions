// name: Remove Mask Save Appearance
// description: script removes clipping masks with content from one element,
// keeping the outline and appearance of the object
// supported versions: CS6, CC
// version: 1.3
// release: May 2019
// author: Roman Sergeev
// mail: robespier@rambler.ru | skype: romaya7 | github: robespier
#target illustrator
if (app.documents.length > 0) {
  ﻿var doc = app.activeDocument;
  if (doc.pageItems.length > 0) {
    app.executeMenuCommand('unlockAll');
    app.executeMenuCommand('showAll');
    app.executeMenuCommand('deselectall');
    for (var i = 0; i < doc.pageItems.length; i++) {
      if (doc.pageItems[i].typename == 'GroupItem' && doc.pageItems[i].clipped == true) {
        if (doc.pageItems[i].pageItems.length == 2) {
          if (doc.pageItems[i].pageItems[0].clipping == true) {
            var clipPath = doc.pageItems[i].pageItems[0];
            var clipContent = doc.pageItems[i].pageItems[1];
          }
          else {
            var clipPath = doc.pageItems[i].pageItems[1];
            var clipContent = doc.pageItems[i].pageItems[0];
          };
          if (clipContent.typename == ('PathItem' || 'CompoundPathItem')) {
            clipContent.selected = true;
            doc.graphicStyles.removeAll();
            createNewGraphicStyle();
            doc.graphicStyles[1].applyTo(clipPath);
            doc.graphicStyles[1].remove();
            doc.pageItems[i].selected = true;
            app.executeMenuCommand('releaseMask');
            clipContent.remove();
            app.executeMenuCommand('deselectall');
          }
          else {
            continue;
          };
        };
      };
    };
    alert ('Готово!');
  }
  else {
    alert ('В документе нет ни одного объекта!');
  };
}
else {
  alert ('Нет открытых документов!');
};

function createNewGraphicStyle () {
  addGraphicStyle();
    function addGraphicStyle () {
      var ActionString = [
      '﻿/version 3',
      '/name [ 10',
      '	4d7920416374696f6e73',
      ']',
      '/isOpen 1',
      '/actionCount 1',
      '/action-1 {',
      '	/name [ 17',
      '		4e65772047726170686963205374796c65',
      '	]',
      '	/keyIndex 0',
      '	/colorIndex 0',
      '	/isOpen 0',
      '	/eventCount 1',
      '	/event-1 {',
      '		/useRulersIn1stQuadrant 0',
      '		/internalName (ai_plugin_styles)',
      '		/localizedName [ 14',
      '			47726170686963205374796c6573',
      '		]',
      '		/isOpen 0',
      '		/isOn 1',
      '		/hasDialog 1',
      '		/showDialog 0',
      '		/parameterCount 1',
      '		/parameter-1 {',
      '			/key 1835363957',
      '			/showInPalette -1',
      '			/type (enumerated)',
      '			/name [ 17',
      '				4e65772047726170686963205374796c65',
      '			]',
      '			/value 1',
      '		}',
      '	}',
      '}'
      ].join('\n');
      createAction(ActionString);
      var ActionString = null;
      app.doScript('New Graphic Style', 'My Actions', false);
      app.unloadAction('My Actions', '');
  };
  function createAction (str) {
    var f = new File('~/Local Settings/Temp/newStyle.aia');
    f.open('w');
    f.write(str);
    f.close();
    app.loadAction(f);
    f.remove();
  };
};
