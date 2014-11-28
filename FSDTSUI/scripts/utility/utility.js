/*
*This file contain all the date time utility methods
**/

Date.prototype.yyyymmdd = function () {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd = this.getDate().toString();

    return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]);
};

//Checking date range
function checkDateWithinRange(myDate, startDate, endDate) {
    //var startDate = new Date(2012, 11, 1);
    //var endDate = new Date(2013, 0, 1);
    if (startDate <= myDate && myDate <= endDate) {
        //        alert('Date is in Range');
        return true;
    }
    else {
        //   alert('Date is not in Range');
        return false;
    }
}

function isEmptyDict(dictonaryObj) {
    for (var k in dictonaryObj)
        return false;
    return true
}

function drawCaptcha() {
    var a = Math.ceil(Math.random() * 10) + '';
    var b = Math.ceil(Math.random() * 10) + '';
    var c = Math.ceil(Math.random() * 10) + '';
    var d = Math.ceil(Math.random() * 10) + '';
    var e = Math.ceil(Math.random() * 10) + '';
    var f = Math.ceil(Math.random() * 10) + '';
    var g = Math.ceil(Math.random() * 10) + '';
    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    return code;
}

// Remove the spaces from the entered and generated code
function removeSpaces(string) {
    return string.split(' ').join('');
}