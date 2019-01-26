#target illustrator
// Open Blank File in Adobe Illustrator

// Создаем объект File для бланка
  var blankFile = new File ('C:/' + 'Program Files/' + 'Adobe/' + 'Adobe Illustrator CC 2015/' + 'Cool Extras/' + 'en_US/' + 'Templates/' + 'template.ait');

// Открываем File
  app.open(blankFile);

// Вставка текущей даты
  var myDoc = app.activeDocument;
  var myLayer = myDoc.layers['blank'];
  var myGroup = myLayer.groupItems['footer'].groupItems['date'];
  var myItem = myGroup.textFrames['currentDate'];
  var d = new Date();
  var prettyDate;
  var numberDate = d.getDate();
    if (numberDate < 10) {
      prettyDate = '0' + d.getDate();
    }
      else {
        prettyDate = d.getDate();
      }
  var prettyMonth = d.getMonth()+1;
  var prettyYear = d.getFullYear();
  var date = prettyDate + '.' + prettyMonth + '.' + prettyYear;
  myItem.contents = date;
