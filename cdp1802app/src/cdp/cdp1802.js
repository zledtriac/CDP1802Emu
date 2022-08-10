
const inst = require("./instructions");

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
    IE: 1,
    Q: 0,
    S: 1
};

let inputs = {
    Interrupt: 1,
    EF: 15
};

let memory = Array(256).fill(0xFF);

let cpu_init = true;

const getRegisters = function() {
    return registers;
};

const getMemory = function() {
    return memory;
};

const loadMemory = function(data) {
    for(let i = 0; i < data.length; i++) {
        memory[i] = data[i];
    }
};

const resetCpu = function() {
    for(let i = 0; i < registers.R.length; i++) {
        registers.R[i] = 0;
    }
    
    registers.I = 0;
    registers.N = 0;
    registers.Q = 0;
    registers.X = 0;
    registers.P = 0;
    registers.IE = 1;
    registers.S = 1;
    cpu_init = true;
};

const nextCycle = function() {
    
    if(registers.S === 0) {
        registers.I = (memory[registers.R[registers.P]] & 0xF0) >> 4;
        registers.N = (memory[registers.R[registers.P]] & 0x0F);
        registers.R[registers.P]++;
        registers.S++;
        return;
    }
    
    if(registers.S === 1) {
        inst.executeInstruction(memory, registers, inputs, cpu_init);
        return;
    }    
}

module.exports = {
    getRegisters: getRegisters,
    getMemory: getMemory,
    loadMemory: loadMemory,
    resetCpu: resetCpu,
    nextCycle: nextCycle
};