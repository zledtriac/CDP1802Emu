//import ROM from "C:/Users/utilizador/Documents/GitHub/CDP1802Emu/cdp1802app/src/MemoryView.js";
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
    S: 1,
    IN: Array(8).fill(0),
	OUT: Array(8).fill(0),

	N0: 0,
	N1: 0,
	N2: 0,
	CDP: 0
	
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

let memory = Array(2048).fill(0xFF);
let RAM = Array(256).fill(0xFF);
let DMA_IN = Array(512).fill(0xFF);
let DMA_OUT = Array(512).fill(0xFF);

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
	registers.OUT = Array(8).fill(0);
	registers.IN = Array(8).fill(0);
	
    cpu_init = true;
};

function CDPSWITCH(){
	
	registers.CDP = 1;
};

const nextCycle = function() {
    
    if(registers.S === 0) {
        registers.I = (memory[registers.R[registers.P]] & 0xF0) >> 4;
        registers.N = (memory[registers.R[registers.P]] & 0x0F);
        registers.R[registers.P]++;
        registers.S++;
		//registers.OUT[registers.N] = outputs.BUS;
	//	if(registers.I === 6 && registers.N > 0 && registers.N < 8) {
  //registers.OUT[registers.N] = outputs.BUS;
//}
        return;
    }
    
    if(registers.S === 1) {
        inst.executeInstruction(memory, registers, inputs, outputs, cpu_init);
        cpu_init = false;
		
		if(registers.I === 6 && registers.N > 0 && registers.N < 8) {
  registers.OUT[registers.N] = outputs.BUS;
}
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
    nextCycle: nextCycle,
	memory: memory,
	CDPRAM:RAM
};
