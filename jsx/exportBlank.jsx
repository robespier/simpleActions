#target illustrator
#include "functions.jsx";
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var docRef = doc.path;

  updateDateTime();

  // Экспорт в jpg
  exportOptions  = new ExportOptionsJPEG();
  type = ExportType.JPEG;
  fileSpec = new File (docRef +  '\\' + doc.name);
  exportOptions.antiAliasing = true;
  exportOptions.qualitySetting = 100;
  exportOptions.horizontalScale = 416;
  exportOptions.verticalScale = 416;

  doc.exportFile (fileSpec, type, exportOptions);

  // Открытие файла бланка в просмотрщике Windows
  var replaceExtension =  doc.name.replace('eps', 'jpg');
  var blankRef = new File (docRef +  '\\' + replaceExtension);
  blankRef.execute();
}
else {
  alert ('Нет открытых документов!');
};
