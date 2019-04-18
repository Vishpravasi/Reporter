if (!String.prototype.trim) {//for ie8 & slim browser compatible for trim() function
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

String.prototype.trimStart = function (c) {
    c = c ? c : ' ';
    var i = 0;
    for (; i < this.length && this.charAt(i) == c; i++);
    return this.substring(i);
}

String.prototype.trimEnd = function (c) {
    c = c ? c : ' ';
    var i = this.length - 1;
    for (; i >= 0 && this.charAt(i) == c; i--);
    return this.substring(0, i + 1);
}