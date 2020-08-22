;(function () {
    var socket = window.io(window.location.origin)
    socket.on('message', function (command) {
        if (command === 'reload') {
            window.location.reload()
        }
    })
})()
