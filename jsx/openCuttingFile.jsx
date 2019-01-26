// Open Cutting File in Adobe Illustrator
#target illustrator

// Корень Cutting Folder
  var CuttingRoot = 'W:/';

  // Окно диалога для ввода номера высечки
  var cut_number;
  cut_number = prompt('Введите номер высечки...',  '', 'Открыть высечку в Adobe Illustrator');

  // Проверяем введено ли что-нибудь
  if (cut_number != '') {

  // Проверяем введены ли только цифры
    if (!isNaN(cut_number)) {

app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

  // Режем строку cut_number на массив из чисел
      var knife = cut_number.split('');

      if (knife.length === 4) {

  // Создаем объект Folder для IML-высечек
        var targetFolder = new Folder (CuttingRoot + 'SHOBER' + '/' + knife[0]);

  // Получаем все файлы из целевой папки
        var files = targetFolder.getFiles('*.ai');

  // Получаем только имя файла с расширением
        var filesName = new Array;
        for (var i=0; i < files.length; i++) {
          var a = files[i].toString();
          var b = a.substr(12);
          filesName.push(b);
        };

  // Проверяем есть ли такой файл и сохраняем его полное имя
        var fullFileName;
        for (var i=0; i < filesName.length; i++) {
          var c = filesName[i].substr(0,4);
          if (c === cut_number) {
            fullFileName = filesName[i];
            break;
          }
        };

  // Создаем объект File для IML-высечек
        var targetFile = new File (targetFolder + '/' + fullFileName);

      }
  // Создаем часть пути для обычных высечек
      else {
        var mother;
        if (knife[1] === '0') {
          mother = 'z' + knife[2] + knife[3];
        }
        else {
          mother = 'z' + knife[1] + knife[2] + knife[3];
        };

  // Создаем объект Folder обычных высечек
        var targetFolder = new Folder (CuttingRoot + knife[0] + '/' + mother);

  // Получаем все файлы из целевой папки
        var files = targetFolder.getFiles('*.ai');

  // Получаем только имя файла с расширением
        var filesName = new Array;
        for (var i=0; i < files.length; i++) {
          var a = files[i].toString();
          var b = a.lastIndexOf('/');
          var d = a.substr(b+1);
          filesName.push(d);
        };

  // Создаем объект File для обычных высечек (самоклейки)
        var targetFile = new File (CuttingRoot + knife[0] + '/' + mother + '/' + cut_number + '.ai');
      };
  // Открываем File
        app.open(targetFile);
  // Fit All (Artboards) in Window
        app.executeMenuCommand('fitall');

app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;
    }
    else {
      alert ('Вводите только цифры!');
    }
  }
  else {
    alert ('Номер не введен!');
  };
