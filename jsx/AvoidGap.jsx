// Avoid Gap in Vector Objects
#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  if (doc.documentColorSpace === DocumentColorSpace.CMYK) {
    var pthItems = doc.pathItems;
    if (pthItems.length > 0) {
      app.executeMenuCommand('unlockAll');
      app.executeMenuCommand('deselectall');
      var minValue = prompt('Введите значение минимально допустимой точки в процентах в интервале от 2 до 5.\n\nДробные числа будут округлены до ближайших целых.', '3', 'Avoid Gap in Vector Objects');
      var value = minValue.replace(/,/g, '.' );
      if (!(value === null)) {
        if (!isNaN(value)) {
          value = Math.round(value);
          if (value < 2) {
            value = 3;
          }
          else if (value > 5) {
            value = 3;
          };
            }
            else {
              value = 3;
            };
      };
      	for(i=0; i < pthItems.length; i++) {
      		if (pthItems[i].editable) {
            compute(pthItems[i]);
          }
        };
        alert('Готово!')
    }
    else {
      alert('Контуров для обработки не найдено!');
    };
  }
  else {
    alert('Недопустимый цветовой режим документа!\nУстановите CMYK Color в меню File -> Document Color Mode\nи запустите скрипт заново!');
  };
}
else {
  alert('Нет открытых документов!');
};

////////////////////////////////////////////////////////////////////
//                       Блок функций                             //
////////////////////////////////////////////////////////////////////

function compute(obj) {
	if (obj.filled) {
    changeColor(obj.fillColor, obj);
  };
	if (obj.stroked) {
    changeColor(obj.strokeColor, obj);
  };
};
function changeColor(Color, obj) {
  switch(Color.typename) {
    case 'CMYKColor': changeCMYK(Color); break;
    case 'GrayColor': changeGray(Color); break;
    case 'SpotColor': changeSpot(Color); break;
    case 'GradientColor': changeGradient(Color, obj); break;
  };
};
function changeCMYK(Color) {
  var SetCyan, SetMagenta, SetYellow, SetBlack;
  if (Color.cyan < value) {SetCyan = 0;} else {SetCyan = Color.cyan};
  if (Color.magenta < value) {SetMagenta = 0;} else {SetMagenta = Color.magenta};
  if (Color.yellow < value) {SetYellow = 0;} else {SetYellow = Color.yellow};
  if (Color.black < value) {SetBlack = 0;} else {SetBlack = Color.black};
  Color.cyan = SetCyan; Color.magenta = SetMagenta; Color.yellow = SetYellow; Color.black = SetBlack;
};
function changeGray(Color) {
  var SetGray;
  if (Color.gray < value) {SetGray = 0;} else {SetGray = Color.gray;};
  Color.gray = SetGray;
};
function changeSpot(Color) {
  var SetSpot;
  if (Color.tint < value) {SetSpot = 0;} else {SetSpot = Color.tint;};
  Color.tint = SetSpot;
};
function changeGradient(Color, obj) {
  var NewColor = convertToCmyk(Color, obj);
  setGradientColor(NewColor);
};

function convertToCmyk(Color, obj) {
    var NewGradientColor = new GradientColor();
    var GetGradient = Color.gradient;
  	var StopGradient = GetGradient.gradientStops;
  	var CountStops = StopGradient.length;
  	for (g=0; g < CountStops; g++) {
        var newColor = new CMYKColor();
        switch(StopGradient[g].color.typename) {
          case 'CMYKColor':
            NewGradientColor.gradient = GetGradient;
            NewGradientColor.gradient.gradientStops = StopGradient;
            NewGradientColor.gradient.gradientStops[g].color = StopGradient[g].color;
          break;
          case 'GrayColor':
            newColor.cyan = 0;
            newColor.magenta = 0;
            newColor.yellow = 0;
            newColor.black = StopGradient[g].color.gray;
            StopGradient[g].color = newColor;
            NewGradientColor.gradient = GetGradient;
            NewGradientColor.gradient.gradientStops = StopGradient;
            NewGradientColor.gradient.gradientStops[g].color = StopGradient[g].color;
          break;
          case 'SpotColor':
            obj.selected = true;
            app.executeMenuCommand('Colors8');
            var sel = app.activeDocument.selection;
            var selColor = sel[0].fillColor;
            NewGradientColor.gradient = selColor.gradient;
            NewGradientColor.gradient.gradientStops = selColor.gradient.gradientStops;
            NewGradientColor.gradient.gradientStops[g].color = selColor.gradient.gradientStops[g].color;
            obj.selected = false;
          break;
       };
   };
   return NewGradientColor;
 };

function setGradientColor(NewColor) {
  var StopGradient = NewColor.gradient.gradientStops;
  var CountStops = StopGradient.length;

  var CyanValue = new Array();
  var MagentaValue = new Array();
  var YellowValue = new Array();
  var BlackValue = new Array();
  for (a=0; a < CountStops; a++) {
    CyanValue.push(StopGradient[a].color.cyan);
    MagentaValue.push(StopGradient[a].color.magenta);
    YellowValue.push(StopGradient[a].color.yellow);
    BlackValue.push(StopGradient[a].color.black);
  };

  var sortArray = CyanValue.sort(compareNumeric);
  var maxValue = sortArray[CyanValue.length - 1];
    if (maxValue >= value) {
      for (s=0; s < CountStops; s++) {
        if (StopGradient[s].color.cyan < value) {StopGradient[s].color.cyan = value};
      };
    };
    if (maxValue < value) {
      for (s=0; s < CountStops; s++) {
        StopGradient[s].color.cyan = 0;
      };
    };

  var sortArray = MagentaValue.sort(compareNumeric);
  var maxValue = sortArray[MagentaValue.length - 1];
    if (maxValue >= value) {
      for (s=0; s < CountStops; s++) {
        if (StopGradient[s].color.magenta < value) {StopGradient[s].color.magenta = value};
      };
    };
    if (maxValue < value) {
      for (s=0; s < CountStops; s++) {
        StopGradient[s].color.magenta = 0;
      };
    };

    var sortArray = YellowValue.sort(compareNumeric);
    var maxValue = sortArray[YellowValue.length - 1];
      if (maxValue >= value) {
        for (s=0; s < CountStops; s++) {
          if (StopGradient[s].color.yellow < value) {StopGradient[s].color.yellow = value};
        };
      };
      if (maxValue < value) {
        for (s=0; s < CountStops; s++) {
          StopGradient[s].color.yellow = 0;
        };
      };

      var sortArray = BlackValue.sort(compareNumeric);
      var maxValue = sortArray[BlackValue.length - 1];
        if (maxValue >= value) {
          for (s=0; s < CountStops; s++) {
            if (StopGradient[s].color.black < value) {StopGradient[s].color.black = value};
          };
        };
        if (maxValue < value) {
          for (s=0; s < CountStops; s++) {
            StopGradient[s].color.black = 0;
          };
        };

};

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
};
