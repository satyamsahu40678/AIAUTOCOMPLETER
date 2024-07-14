$(document).ready(function(){
    var autocomplete = document.getElementById("autocomplete");
    var mainInput = document.getElementById("mainInput");
    var foundName = '';
    var predicted = '';
    var apibusy = false;

    $('#mainInput').keyup(function(e) {
        if (mainInput.value == '') {
            autocomplete.textContent = '';
            return;
        }

        if (e.keyCode == 32) { // Space key
            CallMLDataSetAPI(e);
            scrolltobototm();
            return;
        }

        if (e.key == 'Backspace') {
            autocomplete.textContent = '';
            predicted = '';
            apibusy = true;
            return;
        }

        if (e.key != 'ArrowRight' && e.key != 'Tab') {
            if (autocomplete.textContent != '' && predicted) {
                var first_character = predicted.charAt(0);
                if (e.key == first_character) {
                    predicted = predicted.substr(1);
                    apibusy = true;
                } else {
                    autocomplete.textContent = '';
                    apibusy = false;
                }
            } else {
                autocomplete.textContent = '';
                apibusy = false;
            }
            return;
        } else {
            if (predicted) {
                if (!apibusy) {
                    mainInput.value = foundName;
                    autocomplete.textContent = '';
                }
            } else {
                return;
            }
        }
    });

    function CallMLDataSetAPI(event) {
        fetch('http://127.0.0.1:5000/api/predict?input_string='+event.target.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.predicted != '') {
                predicted = data.predicted;
                autocomplete.innerHTML = event.target.value + data.predicted;
                foundName = event.target.value + data.predicted;
            } else {
                predicted = '';
                autocomplete.textContent = event.target.value;
                foundName = event.target.value;
            }
        });
    }

    function scrolltobototm() {
        var target = document.getElementById('autocomplete');
        var target1 = document.getElementById('mainInput');
        setInterval(function(){
            target.scrollTop = target1.scrollHeight;
        }, 1000);
    }

    $("#mainInput").keydown(function(e) {
        if (e.keyCode === 9) { // Tab key
            e.preventDefault();
            presstabkey();
        }
    });

    function presstabkey() {
        if (predicted) {
            mainInput.value = foundName;
            autocomplete.textContent = '';
            predicted = '';
        } else {
            return;
        }
    }
});
