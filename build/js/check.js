var a;
var b;

function getMessage(a, b) {
    if (typeof(a) === "boolean" && a) {
        return ('Переданное GIF-изображение анимировано и содержит ' + b + ' кадров');
    } else if (typeof(a) === "boolean" && a == false) {
        return ('Переданное GIF-изображение не анимировано');
    } else if (typeof(a) === "number") {
        return ('Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов');
    } else if (Object.prototype.toString.call(a) == '[object Array]') {

        if (Object.prototype.toString.call(b) == '[object Array]') {
            return ('Пока!');
        }
        var sum = 0;
        for(var i in a) { sum = sum + a[i]; }
        return ('Количество красных точек во всех строчках изображения: ' + sum);
    }
    else {
        return false;
    }
}