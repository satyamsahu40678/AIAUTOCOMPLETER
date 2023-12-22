$(document).ready(function(){
    //dummy random output. You can use api
function randomobj(obj) {
    var objkeys = Object.keys(obj)
    return objkeys[Math.floor(Math.random() * objkeys.length)]
}

var autocomplete = document.querySelectorAll("#autocomplete");
var mainInput = document.querySelectorAll("#mainInput");
var foundName = '';
var predicted = '';
var apibusy= false;
var mlresponsebusy = false;

$('#mainInput').keyup(function(e) {
//check if null value send
    if (mainInput[0].value == '') {
        autocomplete[0].textContent = '';
        return;
}
//check if space key press
    if (e.keyCode == 32) {
        CallMLDataSetAPI(e);
        scrolltobototm();
        return;
}
//check if Backspace key press
    if (e.key == 'Backspace'){
        autocomplete[0].textContent = '';
        predicted = '';
        apibusy = true;
        return;
}
//check if ArrowRight or Tab key press
    if(e.key != 'ArrowRight'){
        if (autocomplete[0].textContent != '' && predicted){
            var first_character = predicted.charAt(0);
            if(e.key == first_character){
                var s1 = predicted;
                var s2 = s1.substr(1);
                predicted = s2;
                apibusy = true;
            }else{
                autocomplete[0].textContent = '';
                apibusy= false;
            }
        }else{
            autocomplete[0].textContent = '';
            apibusy= false;
        }
        return;
        }else{
            if(predicted){
                if (apibusy == true){
                    apibusy= false;
                }
                if (apibusy== false){
                    mainInput[0].value = foundName;
                    autocomplete[0].textContent = '';
                }
            }else{
            return;
        }
    }

    function CallMLDataSetAPI(event) {
        //call api and get response
        //call api
       fetch('http://127.0.0.1:5000/api/predict?input_string='+event.target.value)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.predicted != ''){
            predicted = data.predicted;
            var new_text = event.target.value + data.predicted;
            autocomplete[0].textContent = new_text;
            foundName = new_text
        }else{
            predicted = '';
            var new_text1 = event.target.value + predicted;
            autocomplete[0].textContent = new_text1;
            foundName = new_text1
        }
        }
        )








    };
});
$('#mainInput').keypress(function(e) {
    var sc = 0;
    $('#mainInput').each(function () {
        this.setAttribute('style', 'height:' + (0) + 'px;overflow-y:hidden;');
        this.setAttribute('style', 'height:' + (this.scrollHeight+3) + 'px;overflow-y:hidden;');
        sc = this.scrollHeight;
    });
    $('#autocomplete').each(function () {
        if (sc <=400){
            this.setAttribute('style', 'height:' + (0) + 'px;overflow-y:hidden;');
            this.setAttribute('style', 'height:' + (sc+2) + 'px;overflow-y:hidden;');
        }
    }).on('input', function () {
        this.style.height = 0;
        this.style.height = (sc+2) + 'px';
    });
});
    function scrolltobototm() {
        var target = document.getElementById('autocomplete');
        var target1 = document.getElementById('mainInput');
        setInterval(function(){
            target.scrollTop = target1.scrollHeight;
        }, 1000);
    };
    $( "#mainInput" ).keydown(function(e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            presstabkey();
        }
    });
    function presstabkey() {
        if(predicted){
            if (apibusy == true){
                apibusy= false;
            }
            if (apibusy== false){
                mainInput[0].value = foundName;
                autocomplete[0].textContent = '';
            }
        }else{
        return;
        }
    };
});
