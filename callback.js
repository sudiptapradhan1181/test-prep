function loadScript(src, callback) {
    const script =  document.createElement('script')
    script.src = src
    script.onload = function () {
        callback()
    }
    script.onerror = function() {
        callback(new Error('script failed'))
    }
    document.head.append(script)
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodashjs/3.2.0/lodash.js', function(error) {
    if(error){
        console.log(error)
    }else {
        console.log(_)
    }
})