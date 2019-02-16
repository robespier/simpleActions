// Avoid Gap in Vector Objects
#target illustrator
if (app.documents.length > 0) {
  var doc = app.activeDocument;
  var pthItems = doc.pathItems;
  var totalCounter = 0;
  var uniformFilledCounter = 0;
  var gradientFilledCounter = 0;
  if (pthItems.length > 0) {
/*
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
*/
      var value = 50; // Не забыть убрать!!!
    	for(i=0; i < pthItems.length; i++) {
    		if (pthItems[i].editable) {
          compute(pthItems[i]);
        }
      };
      totalCounter = uniformFilledCounter + gradientFilledCounter;
      alert('В документе найдено ' + pthItems.length + ' контуров.' + '\nИз них обработано: ' + 'n' + '\n\nИзменено: ' + totalCounter + ' контуров.' + '\n\nИз них - ' + 'n' + ' контуров с однородной заливкой и \n' + 'n' + ' контуров с градиентной заливкой.' + '\n\nА также ' + 'n' + ' контуров с однородной обводкой и \n' + 'n' + ' контуров с градиентной обводкой.');

  }
  else {
    alert('Контуров для обработки не найдено!');
  };
}
else {
  alert('Нет открытых документов!');
};

////////////////////////////////////////////////////////////////////
//                       Блок функций                             //
////////////////////////////////////////////////////////////////////

function compute(obj) {
	if (obj.filled) {changeColor(obj.fillColor);};
  if (obj.stroked) {changeColor(obj.strokeColor);};
};

function changeColor(Color_Obj) {
  switch(Color_Obj.typename) {
    case 'CMYKColor': changeCMYK_uniformFill(Color_Obj); break;
    case 'GrayColor': changeGray_uniformFill(Color_Obj); break;
    case 'SpotColor': changeSpot_uniformFill(Color_Obj); break;
    case 'GradientColor': changeColor_gradientFill(Color_Obj); break;
   }
};

function changeCMYK_uniformFill(Color_Obj) {
  getCMYKColor(Color_Obj);
  setCMYKColor_uniformFill(Color_Obj);
};
function changeGray_uniformFill(Color_Obj) {
  getGrayColor(Color_Obj);
  setGrayColor_uniformFill(Color_Obj);
};
function changeSpot_uniformFill(Color_Obj) {
  getSpotColor(Color_Obj);
  setSpotColor_uniformFill(Color_Obj);
};

function getCMYKColor(Color) {
  var GetCyan, GetMagenta, GetYellow, GetBlack;
  GetCyan = Color.cyan;
  GetMagenta = Color.magenta;
  GetYellow = Color.yellow;
  GetBlack = Color.black;
  var GetCMYKColor = new CMYKColor();
  GetCMYKColor.cyan = GetCyan;
  GetCMYKColor.magenta = GetMagenta;
  GetCMYKColor.yellow = GetYellow;
  GetCMYKColor.black = GetBlack;
  return GetCMYKColor;
};
function setCMYKColor_uniformFill(Color) {
  var SetCyan, SetMagenta, SetYellow, SetBlack;
  if (Color.cyan < value) {SetCyan = 0;} else {SetCyan = Color.cyan};
  if (Color.magenta < value) {SetMagenta = 0;} else {SetMagenta = Color.magenta};
  if (Color.yellow < value) {SetYellow = 0;} else {SetYellow =   Color.yellow};
  if (Color.black < value) {SetBlack = 0;} else {SetBlack = Color.black};
  var SetColorCMYK = new CMYKColor();
  Color.cyan = SetCyan;
  Color.magenta = SetMagenta;
  Color.yellow = SetYellow;
  Color.black = SetBlack;
  uniformFilledCounter
  return SetColorCMYK;
};

function getGrayColor(Color) {
  var GetGray = Color.gray;
  var GetGrayColor = new GrayColor();
  GetGrayColor.gray = GetGray;
  return GetGrayColor;
};
function setGrayColor_uniformFill(Color) {
  var SetGray;
  if (Color.gray < value) {SetGray = 0;} else {SetGray = Color.gray;};
  var SetGrayColor = new GrayColor();
  Color.gray = SetGray;
  return SetGrayColor;
};

function getSpotColor(Color) {
  var GetSpot = Color.tint;
  var GetSpotColor = new SpotColor();
  GetSpotColor.tint = GetSpot;
  return GetSpotColor;
};
function setSpotColor_uniformFill(Color) {
  var SetSpot;
  if (Color.tint < value) {SetSpot = 0;} else {SetSpot = Color.tint;};
  var SetSpotColor = new SpotColor();
  Color.tint = SetSpot;
  return SetSpotColor;
};

function changeColor_gradientFill(Color_Obj) {
	var GetGradient_Obj = Color_Obj.gradient;
	var StopGradient = GetGradient_Obj.gradientStops;
	var CountStops = StopGradient.length;
	var ColorStops = new Array();

	for (g=0; g < CountStops; g++) {
   var ColorStop = new Object();
   var ColorStopType = StopGradient[g].color;
	 ColorStop.type = ColorStopType.typename;

   switch(ColorStop.type) {
     case 'CMYKColor':
      alert(ColorStop.type);
     break;
     case 'GrayColor':
      alert(ColorStop.type);
     break;
     case 'SpotColor':
       alert(ColorStop.type);
     break;
   };

	 ColorStops.push(ColorStop[g]);
 	};
};
