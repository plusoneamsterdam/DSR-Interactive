let autoPaused = false;
let pauseDuration = 5000;
let valuePause = [];
let objectIndex = 0;

function setValue(firstValue = 0) {
    let vals = [];
    for (let i = 0; i < 5; i++) {
        vals[i] = firstValue;
    }
    vals[4] = 0;
    objectIndex += 1;
    valuePause.push(false);
    return {
        base: vals[0],
        from: vals[1],
        to: vals[2],
        user: vals[3],
        count: vals[4],
        index: objectIndex - 1 // dont know what this is ?!
    };
}
function updateValue(input, ease = easy) {
    if (input.count < 1) {
        input.base = lerp(input.from, input.to, ezEase(input.count, ease));
        input.count += increment;
    } else {
        input.base = input.to;
    }
}
function listenforValue(input) {
    if (input.to !== input.user) {
        input.to = input.user;
        copyValue(input);
    }
}
function autoValue(input, min, max, chance, floor = true, minWeight = 0) {
    if(!valuePause[input.index]){
        if (random(100) < chance){
            if (minWeight > 0 && random(100) < minWeight) {
                input.to = min;
            } else {
                max = floor ? max + 1 : max;
                input.to = random(min, max);
                input.to = floor ? Math.floor(input.to) : input.to;
            }
            copyValue(input);
        }
        valuePause[input.index] = true;
    }
    setTimeout(() => {
        valuePause[input.index] = false;
    }, 5000);
}
function copyValue(input) {
    input.from = input.base;
    input.user = input.to;
    input.count = 0;
}
function mouseReleased() {
    autoPaused = true;
    setTimeout(() => {
        autoPaused = false;
    }, pauseDuration);
}