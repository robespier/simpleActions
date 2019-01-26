#target illustrator
// Open Windows Folder From Adobe Illustrator

// Корень Базы Jpeg-ов
var JpegRoot = 'V:/';

// Окно диалога для ввода номера паспорта
var number;
number = prompt('Введите номер паспорта...',  '', 'Открыть папку в Проводнике Windows');

// Проверяем введен ли какой-нибудь номер
if (number != null) {


// Делаем из строки number массив из отдельных символов
    var knife = number.split('');

// Проверяем массив
if (knife.length > 0) {

// Собираем массив как нам надо (1+3+3)
var father = knife[0];
var split_mother = knife.slice(1,4);
var mother = split_mother.join('');
var split_child = knife.slice(4,7);
var child = split_child.join('');

// Создаем объект Folder
targetFolder = new Folder (JpegRoot + father + '/' + mother + '/' + child);

// Открываем папку в Проводнике Windows
targetFolder.execute();
    }
      else {
        alert ('Номер не введен!');
      }
};
