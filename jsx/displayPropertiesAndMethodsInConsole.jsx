function prop (f)
{
$.writeln (f.reflect.name);
$.writeln ("\rProperties:");
var props = f.reflect.properties;
var array = [];
for (var i = 0; i < props.length; i++)
try {array.push (props[i].name  + ": " + f[props[i].name])} catch (_){}
array.sort ();
$.writeln (array.join ("\r"));
}

function meth (m)
{
var props = m.reflect.methods.sort();
$.writeln ("\rMethods:");
for (var i = 0; i < props.length; i++)
$.writeln (props[i].name);
}