jQuery.support.cors = true;
$(document).ready(
function () {
    //window.sessionStorage.strPaymentRetunValue = "W20150424IADT001664";///"W20150122IADT001195";
    //window.location = "Payment-Recipt.html";
    window.sessionStorage.strPaymentRetunValue = querySt("strPaymentReturnValue");
    if (window.sessionStorage.strPaymentRetunValue != "undefined") {
        window.location = "Payment-Recipt.html";
    }
});

//for getting page value like a Request.Query[""] //
function querySt(Key) {
    var url = window.location.href;
    KeysValues = url.split(/[\?&]+/);
    for (i = 0; i < KeysValues.length; i++) {
        KeyValue = KeysValues[i].split("=");
        if (KeyValue[0] == Key) {
            return KeyValue[1];
        }
    }
}