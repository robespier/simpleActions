var offsetPathWindow = new Window ("dialog", "Offset Path", undefined, {closeButton: true});
offsetPathWindow.preferredSize = [299, 183];
offsetPathWindow.orientation = "column";
  var group = offsetPathWindow.add ("group");
  group.orientation = "column";
  group.alignChildren = ["right", ""];
  group.margins = [0, 7, 110, 0];
    var inputGroup1 = group.add ("group");
    inputGroup1.spacing = 2;
      var value = 2;
      var offsetLabel = inputGroup1.add ("statictext", undefined, "&Offset:");
      var offset = inputGroup1.add ("edittext", [0, 0, 98, 21], value + " mm");
      offset.active = true;
    var inputGroup2 = group.add ("group");
    inputGroup2.spacing = 2;
      var numbers = ["Miter", "Round", "Bevel"];
      inputGroup2.add ("statictext", undefined, "&Joins:");
      var joins = inputGroup2.add ("dropdownlist", [0, 0, 98, 21], numbers);
      joins.selection = 0;
    var inputGroup3 = group.add ("group");
    inputGroup3.spacing = 2;
      var miterlimitvalue = 4;
      inputGroup3.add ("statictext", undefined, "&Miter limit:");
      var miter = inputGroup3.add ("edittext", [0, 0, 98, 21], miterlimitvalue);
  var group2 = offsetPathWindow.add ("group");
  group2.orientation = "row";
  group2.margins = [0, 7, 0, 0];
  group2.spacing = 15;
  group2.alignment = "right";
/*
    var checkGroup = group2.add ("group");
      var checkboxPreview = checkGroup.add ("checkbox", undefined, "&Preview");
      checkboxPreview.shortcutKey = "p";
*/
    var buttonGroup = group2.add ("group");
    buttonGroup.spacing = 5;
    buttonGroup.add ("button", [0, 0, 92, 26], "OK", {name: "ok"});
    buttonGroup.add ("button", [0, 0, 92, 26], "Cancel", {name: "cancel"});
offset.addEventListener ("keydown", function (k) {handle_key (k, this);});
miter.addEventListener ("keydown", function (k) {handle_key (k, this);});
joins.addEventListener ("keydown", function (k) {
  k = k.keyName;
  var i = 0;
  while (i < numbers.length-1 && numbers[i].charAt(0) != k) {
    ++i;
  }
  if (numbers[i].charAt(0) == k)
  joins.selection = i;
});
offsetPathWindow.show();
alert(offsetPathWindow.show());
///////////////////////////////////////////////////////////////////////////////

function handle_key (key, control) {
  var step;
  key.shiftKey ? step = 10 : step = 1;
  switch (key.keyName) {
    case "Up": control.text = update (control.text, step); break;
    case "Down": control.text = update (control.text, -step);
  }
}; // handle_key
function update (str, incr) {
  try {
    var array = str.split(" ");
    var num = String (Number (array[0])+incr);
    if (array.length == 2) {
      num += " "+array[1];
    }
    return num;
  }
  catch (_) {alert ("Illegal input"); return str;}
}; // update

function mmtp(mm) {
  return mm*2.83464566929134
}; // mmtp
