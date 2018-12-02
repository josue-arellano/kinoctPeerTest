//var Peer = require('simple-peer')
var p;


function copyText() {
    /* Get the text field */
    var copyText = document.getElementById("out_string");
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
}

function send(){
    p.send(initiator ? "host sent a ping" : "guest sent a ping")
}


function inst(initiator) {
    p = new SimplePeer({initiator: initiator, trickle: false}); // create peer

    // show input fields
    document.getElementById("input").style = "display: inline";
    document.getElementById("mode").style = "display: none";



    p.on('error', function (err) {
        console.log('error', err)
    });


    p.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data));
        //document.querySelector('#input_one').textContent = JSON.stringify(data)

        document.getElementById("out_string").value = JSON.stringify(data);
    });

    document.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        p.signal(JSON.parse(document.querySelector('#in_string').value))
    });


    p.on('connect', function () {
        //console.log('CONNECT');
        //p.send('whatever' + Math.random())
        p.send(initiator ? "guest" : "host");
    });

    p.on('data', function (data) {
        console.log('DATA: ' + data)
    });

    p.on('stream', function (stream) {
        console.log("STREAM")
        // got remote video stream, now let's show it in a video tag
        var video = document.querySelector('video')
        video.src = window.URL.createObjectURL(stream)
        video.play()
    })

}