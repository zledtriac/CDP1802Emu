
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
    EF: 15,
    BUS: 0
};

let outputs = {
    N: 0,
    BUS: 0
};

let memory = Array(256).fill(0xFF);

let cpu_init = true;

function getRegisters() {
    return registers;
};

function getMemory() {
    return memory;
};

function loadMemory(data) {
    for(let i = 0; i < data.length; i++) {
        memory[i] = data[i];
    }
};

function resetCpu() {
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

function nextCycle() {
    
    if(registers.S === 0) {
        registers.I = (memory[registers.R[registers.P]] & 0xF0) >> 4;
        registers.N = (memory[registers.R[registers.P]] & 0x0F);
        registers.R[registers.P]++;
        registers.S++;
        return;
    }
    
    if(registers.S === 1) {
        inst.executeInstruction(memory, registers, inputs, outputs, cpu_init);
        cpu_init = false;
        return;
    }
    
    if(registers.S === 2) {
        registers.S = 0;
        return;
    }
    
    if(registers.S === 3) {
        registers.T = ((registers.X << 4) | registers.P) & 0xFF;
        registers.IE = 0;
        registers.P = 1;
        registers.X = 2;
    }
}

module.exports = {
    getRegisters: getRegisters,
    getMemory: getMemory,
    loadMemory: loadMemory,
    resetCpu: resetCpu,
    nextCycle: nextCycle
};