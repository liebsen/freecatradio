var snackbarMsg=null,snackbarClock=null;const snackbar=function(a,s,c){var n=document.querySelector(".ui-snackbar");clearInterval(snackbarClock),void 0===c&&(c=5e3),s&&(snackbarMsg&&snackbarMsg.remove(),(snackbarMsg=document.createElement("div")).className="ui-snackbar__message",snackbarMsg.classList.add("ui-snackbar--"+a),snackbarMsg.textContent=s,document.querySelector(".ui-snackbar").appendChild(snackbarMsg),n.classList.remove("ui-snackbar--is-inactive"),snackbarClock=setTimeout((()=>{n.classList.add("ui-snackbar--is-inactive")}),c))};
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,(function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new i(e),n=s(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(2),s=n(3),i=n(4),a=n(22),u=r(n(10));u.Axios=i,u.create=function(e){return r(a(u.defaults,e))},u.Cancel=n(23),u.CancelToken=n(24),u.isCancel=n(9),u.all=function(e){return Promise.all(e)},u.spread=n(25),e.exports=u,e.exports.default=u},function(e,t,n){"use strict";function r(e){return"[object Array]"===f.call(e)}function o(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function i(e){if("[object Object]"!==f.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function a(e){return"[object Function]"===f.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}var c=n(3),f=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:function(e){return"[object ArrayBuffer]"===f.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:i,isUndefined:o,isDate:function(e){return"[object Date]"===f.call(e)},isFile:function(e){return"[object File]"===f.call(e)},isBlob:function(e){return"[object Blob]"===f.call(e)},isFunction:a,isStream:function(e){return s(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){function t(t,o){i(n[o])&&i(t)?n[o]=e(n[o],t):i(t)?n[o]=e({},t):r(t)?n[o]=t.slice():n[o]=t}for(var n={},o=0,s=arguments.length;o<s;o++)u(arguments[o],t);return n},extend:function(e,t,n){return u(t,(function(t,r){e[r]=n&&"function"==typeof t?c(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(2),s=n(5),i=n(6),a=n(7),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=u(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],(function(e){r.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t}))}})),o.forEach(["post","put","patch"],(function(e){r.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}})),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,(function(e,t){null!=e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,(function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),s=n(8),i=n(9),a=n(10);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return r(e),t.data=s(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(2),s=n(11),i={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:function(){var e;return("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(e=n(12)),e}(),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};o.forEach(["delete","get","head"],(function(e){a.headers[e]={}})),o.forEach(["post","put","patch"],(function(e){a.headers[e]=o.merge(i)})),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(2),o=n(13),s=n(16),i=n(5),a=n(17),u=n(20),c=n(21),f=n(14);e.exports=function(e){return new Promise((function(t,n){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"],(r.isBlob(p)||r.isFile(p))&&p.type&&delete d["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=unescape(encodeURIComponent(e.auth.password))||"";d.Authorization="Basic "+btoa(h+":"+m)}var y=a(e.baseURL,e.url);if(l.open(e.method.toUpperCase(),i(y,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in l?u(l.getAllResponseHeaders()):null,s={data:e.responseType&&"text"!==e.responseType?l.response:l.responseText,status:l.status,statusText:l.statusText,headers:r,config:e,request:l};o(t,n,s),l=null}},l.onabort=function(){l&&(n(f("Request aborted",e,"ECONNABORTED",l)),l=null)},l.onerror=function(){n(f("Network Error",e,null,l)),l=null},l.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||c(y))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){l&&(l.abort(),n(e),l=null)})),p||(p=null),l.send(p)}))}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(18),o=n(19);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}})),i):i}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){function n(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function o(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(s[o]=n(void 0,e[o])):s[o]=n(e[o],t[o])}t=t||{};var s={},i=["url","method","data"],a=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],c=["validateStatus"];r.forEach(i,(function(e){r.isUndefined(t[e])||(s[e]=n(void 0,t[e]))})),r.forEach(a,o),r.forEach(u,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(s[o]=n(void 0,e[o])):s[o]=n(void 0,t[o])})),r.forEach(c,(function(r){r in t?s[r]=n(e[r],t[r]):r in e&&(s[r]=n(void 0,e[r]))}));var f=i.concat(a).concat(u).concat(c),p=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===f.indexOf(e)}));return r.forEach(p,o),s}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new o(e),t(n.reason))}))}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r((function(t){e=t})),cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])}));
let currentSong=null,currentListeners=null;nowPlaying=()=>{const e=document.querySelector(".nowplaying");axios.get("https://icecast.freecatradio.com/status-json.xsl").then((t=>{let s=t.data.icestats.source,n="",a='<span class="mdi mdi-headphones"></span> ',i=0;s.title?(n=s.title,i=s.listeners):s[1]&&s[1].title?(a='<span class="mdi mdi-microphone-variant"></span> ',n=s[1].title,i=s[1].listeners):(n=s[0].title,i=s[0].listeners),i!==currentListeners&&(console.log("👂",i),currentListeners=i),currentSong!==n&&(e.classList.remove("fadeInUp","fadeOutUp"),e.classList.add("fadeOutUp"),currentSong=n,setTimeout((()=>{e.classList.remove("fadeInUp","fadeOutUp"),e.innerHTML=a+decodeURIComponent(n),e.classList.add("fadeInUp")}),1e3))}))},setInterval((()=>nowPlaying()),1e4),nowPlaying();
var modes=["waves1","waves2","waves3","waves4","waves5","waves6"],colors=["e11d74","f86808","cf1b1b","394989","2b580c","21209c","34a853","5b5656","8105d8"],mode=modes[0],color=`#${colors[0]}`,context=null,src=null,canvas=document.getElementById("canvas"),d={width:canvas.width=window.innerWidth,height:canvas.height=window.innerHeight};function at(t,e){for(t.moveTo(e[0],e[1]),Ce=2;Ce<e.length-1;Ce+=2)t.lineTo(e[Ce],e[Ce+1])}function ct(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function tt(t,e,h,o,i){t.beginPath(),t.arc(e,h,o,0,2*Math.PI),t.closePath(),t.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", "+i+")",t.fill()}function it(t,e,h,o,i,r){if(t.beginPath(),at(t,function(t,e,h,o){e=void 0!==e?e:.5,h=h||!1,o=o||16;var i,r,l,n,c,a,d,g,s,u,f,m,w,b=[],p=[];for(b=t.slice(0),h?(b.unshift(t[t.length-1]),b.unshift(t[t.length-2]),b.unshift(t[t.length-1]),b.unshift(t[t.length-2]),b.push(t[0]),b.push(t[1])):(b.unshift(t[1]),b.unshift(t[0]),b.push(t[t.length-2]),b.push(t[t.length-1])),w=2;w<b.length-4;w+=2)for(m=0;m<=o;m++)l=(b[w+2]-b[w-2])*e,n=(b[w+4]-b[w])*e,c=(b[w+3]-b[w-1])*e,a=(b[w+5]-b[w+1])*e,f=m/o,d=2*Math.pow(f,3)-3*Math.pow(f,2)+1,g=-2*Math.pow(f,3)+3*Math.pow(f,2),s=Math.pow(f,3)-2*Math.pow(f,2)+f,u=Math.pow(f,3)-Math.pow(f,2),i=d*b[w]+g*b[w+2]+s*l+u*n,r=d*b[w+1]+g*b[w+3]+s*c+u*a,p.push(i),p.push(r);return p}(e,h,o,i)),r){t.beginPath();for(var l=0;l<e.length-1;l+=2)t.rect(e[l]-2,e[l+1]-2,4,4)}}function visualize(t){context||(context=new AudioContext,src=context.createMediaElementSource(t));var e=context.createAnalyser(),h=context.createGain(),o=document.getElementById("canvas"),i=(o.width=window.innerWidth,o.height=window.innerHeight,o.getContext("2d"));const r=d.width;var l=0,n=[];for(Ce=0;Ce<512;Ce++){var c={};c.x=Math.floor(1920*Math.random()+1),c.y=Math.floor(1080*Math.random()+1),c.radius=Math.floor(1080*Math.random()/5+2),c.alpha=1,c.speed=Math.floor(50*Math.random()+30),n.push(c)}src.connect(h),h.connect(e),e.connect(context.destination),e.fftSize=1024;e.fftSize;var a=e.frequencyBinCount,g=new Uint8Array(a);!function t(){if(requestAnimationFrame(t),e.smoothingTimeConstant=.9,e.getByteFrequencyData(g),"waves1"==mode){i.clearRect(0,0,d.width,d.height),i.lineWidth=0,i.miterLimit=1;var h=[];i.beginPath(),i.moveTo(0,d.height);for(var o=0;o<r+20;o+=20){var c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c]*d.height/255+2)}it(i,h,.5),i.lineTo(r,d.height),i.lineTo(0,d.height),i.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.1)",i.fill(),i.closePath(),i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c]*d.height/255+2)}it(i,h,.5),i.lineTo(r,d.height),i.lineTo(0,d.height),i.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.15)",i.fill(),i.closePath(),i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c+c]*d.height/255+2)}it(i,h,.5),i.lineTo(r,d.height),i.lineTo(0,d.height),i.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.2)",i.fill(),i.closePath(),i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c+c+c]*d.height/255+2)}it(i,h,.5),i.lineTo(r,d.height),i.lineTo(0,d.height),i.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.25)",i.fill(),i.closePath()}else if("waves2"==mode){i.clearRect(0,0,d.width,d.height),i.lineWidth=2,i.miterLimit=1,i.beginPath(),i.moveTo(0,d.height);for(h=0;h<g.length/2;h+=1)i.lineTo(h*d.width/g.length*2,d.height-g[h]*d.height/255+2);i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.5)",i.stroke(),i.closePath()}else if("waves3"==mode){i.clearRect(0,0,d.width,d.height),i.lineWidth=1,i.miterLimit=1,i.beginPath();for(h=0;h<d.width;h+=3){o=Math.round(g.length/2*h/d.width);i.moveTo(h,d.height),i.lineTo(h,d.height-g[o]*d.height/255+2),i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.5)"}i.stroke()}else if("waves4"==mode){i.clearRect(0,0,d.width,d.height),i.lineWidth=1,i.miterLimit=1,i.beginPath(),i.moveTo(0,d.height);for(h=0;h<g.length/2;h+=1)i.lineTo(h*d.width/g.length*2,d.height-g[h]*d.height/255+2);i.lineTo(d.width,d.height),i.lineTo(0,d.height),i.fillStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.5)",i.fill(),i.closePath()}else if("waves5"==mode){i.clearRect(0,0,d.width,d.height),i.lineWidth=3,i.lineCap="round",i.miterLimit=1,i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.2)";h=[];i.beginPath(),i.moveTo(0,d.height);for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c]*d.height/255+2)}it(i,h,.5),i.stroke(),i.closePath(),i.lineWidth=2,i.lineCap="round",i.miterLimit=1,i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.3)",i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c]*d.height/255+2)}it(i,h,.5),i.stroke(),i.closePath(),i.lineWidth=2,i.lineCap="round",i.miterLimit=1,i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.4)",i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c+c]*d.height/255+2)}it(i,h,.5),i.stroke(),i.closePath(),i.lineWidth=2,i.lineCap="round",i.miterLimit=1,i.strokeStyle="rgba("+ct(color).r+", "+ct(color).g+", "+ct(color).b+", 0.5)",i.beginPath(),i.moveTo(0,d.height),h=[];for(o=0;o<r+20;o+=20){c=Math.round(g.length/8*o/r);h.push(o),h.push(d.height-g[c+c+c+c]*d.height/255+2)}it(i,h,.5),i.stroke(),i.closePath()}else if("waves6"==mode){i.clearRect(0,0,d.width,d.height),l++;for(h=0;h<g.length/2;h++)tt(i,Math.cos(l/n[h].speed)*n[h].radius+n[h].x,Math.sin(l/n[h].speed)*n[h].radius+n[h].y,n[h].radius*g[h]/255,(g[h]/255/2+.5)/5)}}()}
function init(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then((e=>{console.log("Service worker registered")}),(e=>{console.error("Service worker not registered --\x3e",e)}))}document.addEventListener("DOMContentLoaded",init,!1);
function init(){if(!navigator.onLine){document.querySelector(".page-status").innerHTML="offline"}}document.addEventListener("DOMContentLoaded",init,!1);
const socket=io("https://api.freecatradio.com"),audio=document.getElementById("stream"),playBtn=document.getElementById("playBtn"),switchControls=document.getElementById("switchControls"),switchColor=document.getElementById("switchColor"),switchVisualiser=document.getElementById("switchVisualiser"),chatForm=document.getElementById("chat_form"),chatContent=document.getElementById("chat_content"),userName=document.getElementById("username"),messageInput=document.getElementById("message");let initChat=!1;document.querySelectorAll(".toggleChat").forEach((e=>{e.onclick=()=>{if(!initChat){socket.emit("request_history"),socket.on("history",(e=>{e.history.forEach((e=>{addLine(e)}))}));let e="Anonymous";localStorage.getItem("username")&&(e=localStorage.getItem("username")),userName.innerHTML=e,initChat=!0}document.getElementById("chat").classList.toggle("active"),document.getElementById("chatControls").classList.toggle("active")}})),document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("loading")&&(document.getElementById("loading").classList.add("animated","fadeOut"),setTimeout((()=>{document.getElementById("loading").remove()}),500))})),togglePlay=()=>{document.getElementById("switchControls").classList.remove("fadeOut","fadeIn"),playBtn.classList.contains("is-playing")?(audio.pause(),audio.currentTime=0,playBtn.classList.remove("is-playing"),document.getElementById("canvas").classList.remove("active"),document.getElementById("overlay").classList.remove("active"),document.getElementById("switchControls").classList.remove("active")):(playBtn.classList.add("is-playing"),document.getElementById("canvas").classList.add("active"),document.getElementById("overlay").classList.add("active"),document.getElementById("switchControls").classList.add("active"),audio.play(),visualize(audio))};let nextVisualizer=()=>{let e=modes.findIndex((e=>e===mode));e++,e>=modes.length&&(e=0),mode=modes[e]},nextColor=()=>{let e=colors.findIndex((e=>e===color.replace("#","")));e++,e>=colors.length&&(e=0),color=`#${colors[e]}`};switchVisualiser.onclick=()=>{nextVisualizer()},switchColor.onclick=()=>{nextColor()},playBtn.onclick=()=>{togglePlay()},userName.onclick=()=>{var e=prompt("Input your name","Anonymous");e.length>10&&(e=e.substring(0,10)),socket.emit("change_username",e),localStorage.setItem("username",e),userName.innerHTML=e},chatForm.onsubmit=()=>{const e=messageInput.value;return messageInput.value="",socket.emit("message",{message:e}),!1},messageInput.onkeyup=()=>{messageInput.value&&socket.emit("typing")},socket.on("message",(e=>{addLine(e)})),addLine=e=>{chatContent.innerHTML+=`<p class="message"><span class="flag" style="background-image:url('/img/flags/${e.country}.png')"></span><span class="username">${e.username}</span> ${e.message}</p>`};
