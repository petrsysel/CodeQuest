/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */var d=function(p){var u=String.prototype.split,c=/()??/.exec("")[1]===p,g;return g=function(a,e,l){if(Object.prototype.toString.call(e)!=="[object RegExp]")return u.call(a,e,l);var n=[],i=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),r=0,e=new RegExp(e.source,i+"g"),x,t,o,h;for(a+="",c||(x=new RegExp("^"+e.source+"$(?!\\s)",i)),l=l===p?4294967295:l>>>0;(t=e.exec(a))&&(o=t.index+t[0].length,!(o>r&&(n.push(a.slice(r,t.index)),!c&&t.length>1&&t[0].replace(x,function(){for(var s=1;s<arguments.length-2;s++)arguments[s]===p&&(t[s]=p)}),t.length>1&&t.index<a.length&&Array.prototype.push.apply(n,t.slice(1)),h=t[0].length,r=o,n.length>=l)));)e.lastIndex===t.index&&e.lastIndex++;return r===a.length?(h||!e.test(""))&&n.push(""):n.push(a.slice(r)),n.length>l?n.slice(0,l):n},g}();export{d as b};
