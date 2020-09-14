navigator.serviceWorker.register('worker.min.js')
navigator.serviceWorker.addEventListener('message', event => {
    if(event.origin != 'https://example.com'){
        return;
    }
    var meta = event.data.msg;
    meta = meta.substring(meta.indexOf("'") + 1,meta.lastIndexOf("'"));
    document.querySelector('div').innerText = meta;
});