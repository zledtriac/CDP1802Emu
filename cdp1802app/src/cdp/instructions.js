
let temp_interrupt = 1;
let input_data_cnt = 0;

const group0 = function(memory, registers, inputs, init) {
    if(registers.N > 0) {
        registers.D = memory[registers.R[registers.N]];
        return 0;
    }
    
    if(init) {
        temp_interrupt = 1;
        return 0;
    }
    
    if((temp_interrupt !== (inputs.Interrupt & registers.IE)) & temp_interrupt) {
        temp_interrupt = inputs
        return 0
    }
        
    return 1;
};

const group1 = function(memory, registers, inputs, init) {
    registers.R[registers.N] = (registers.R[registers.N] + 1) & 0xFFFF;
    return 0;
};

const group2 = function(memory, registers, inputs, init) {
    registers.R[registers.N] = (registers.R[registers.N] - 1) & 0xFFFF;
    return 0;
};

const group3 = function(memory, registers, inputs, init) {
    return 0;
};

const group4 = function(memory, registers, inputs, init) {
    return 0;
};

const group5 = function(memory, registers, inputs, init) {
    return 0;
};

const group6 = function(memory, registers, inputs, init) {
    return 0;
};

const group7 = function(memory, registers, inputs, init) {
    switch(registers.N) {
        case 0:
            registers.P = memory[registers.R[registers.X]] & 0x0F;
            registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
            registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
            registers.IE = 1;
            return 0;
        
        case 1:
            registers.P = memory[registers.R[registers.X]] & 0x0F;
            registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
            registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
            registers.IE = 0;
            return 0;
    }
    
    return 0;
};

const instructionGroups = [
    group0,
    group1,
    group2,
    group3,
    group4,
    group5,
    group6,
    group7
];

const executeInstruction = function(memory, registers, inputs, init) {
    registers.S = instructionGroups[registers.I](memory, registers, inputs, init);
    temp_interrupt = registers.IE & inputs.Interrupt;
}

module.exports = {
    executeInstruction: executeInstruction
};