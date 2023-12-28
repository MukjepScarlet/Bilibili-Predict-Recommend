Array.prototype.last = function() {
    return this[this.length - 1];
}

Array.prototype.randomChoice = function() {
    return this[~~(this.length * Math.random())];
}