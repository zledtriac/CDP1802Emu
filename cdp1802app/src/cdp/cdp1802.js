
let registers = {
    R: Array(16).fill(0),
    D: 0,
    DF: 0,
    I: 0,
    N: 0,
    X: 0,
    B: 0,
    P: 0,
    T: 0,
    IE: 0,
    Q: 0
};

let memory = Array(256).fill(0);

const getRegisters = function() {
    return registers;
};

const getMemory = function() {
    return memory;
};

module.exports = {
    getRegisters: getRegisters,
    getMemory: getMemory
};