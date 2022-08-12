
let input_data_cnt = 0;

const IDL = function(memory, registers, inputs, outputs) {
    return 1;
};

const LDN = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.N]];
    return 0;
};

const INC = function(memory, registers, inputs, outputs) {
    registers.R[registers.N] = (registers.R[registers.N] + 1) & 0xFFFF;
    return 0;
};

const DEC = function(memory, registers, inputs, outputs) {
    registers.R[registers.N] = (registers.R[registers.N] - 1) & 0xFFFF;
    return 0;
};

// Short branches-----------------------------------------------------------------------------------------------------------------

const BR = function(memory, registers, inputs, outputs) {
    registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
    return 0;
};

const BQ = function(memory, registers, inputs, outputs) {
    if(registers.Q) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BZ = function(memory, registers, inputs, outputs) {
    if(!registers.D) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BDF = function(memory, registers, inputs, outputs) {
    if(registers.DF) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const B1 = function(memory, registers, inputs, outputs) {
    if((inputs.EF ^ 0x0F) & 0x01) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const B2 = function(memory, registers, inputs, outputs) {
    if((inputs.EF ^ 0x0F) & 0x02) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const B3 = function(memory, registers, inputs, outputs) {
    if((inputs.EF ^ 0x0F) & 0x04) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const B4 = function(memory, registers, inputs, outputs) {
    if((inputs.EF ^ 0x0F) & 0x08) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const NBR = function(memory, registers, inputs, outputs) {
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BNQ = function(memory, registers, inputs, outputs) {
    if(!registers.Q) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BNZ = function(memory, registers, inputs, outputs) {
    if(registers.D) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BNF = function(memory, registers, inputs, outputs) {
    if(!registers.DF) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BN1 = function(memory, registers, inputs, outputs) {
    if(inputs.EF & 0x01) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BN2 = function(memory, registers, inputs, outputs) {
    if(inputs.EF & 0x02) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BN3 = function(memory, registers, inputs, outputs) {
    if(inputs.EF & 0x04) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const BN4 = function(memory, registers, inputs, outputs) {
    if(inputs.EF & 0x08) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

//--------------------------------------------------------------------------------------------------------------------------------

const LDA = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.N]];
    registers.R[registers.N] = (registers.R[registers.N] + 1) & 0xFFFF;
    return 0;
};

const STR = function(memory, registers, inputs, outputs) {
    memory[registers.R[registers.N]] = registers.D;
    return 0;
};

const IRX = function(memory, registers, inputs, outputs) {
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

const OUT = function(memory, registers, inputs, outputs) {
    outputs.N = registers.N & 0x07;
    outputs.BUS = inputs.BUS = memory[registers.R[registers.X]];
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

const INP = function(memory, registers, inputs, outputs) {
    outputs.N = registers.N & 0x07;
    memory[registers.R[registers.X]] = registers.D = inputs.BUS;
    return 0;
};

const RET = function(memory, registers, inputs, outputs) {
    registers.P = memory[registers.R[registers.X]] & 0x0F;
    registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    registers.IE = 1;
    return 0;     
};

const DIS = function(memory, registers, inputs, outputs) {
    registers.P = memory[registers.R[registers.X]] & 0x0F;
    registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    registers.IE = 0;
    return 0;     
};

const LDXA = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]];
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

const STXD = function(memory, registers, inputs, outputs) {
    memory[registers.R[registers.X]] = registers.D;
    registers.R[registers.X] = (registers.R[registers.X] - 1) & 0xFFFF;
    return 0;
};

const ADC = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]] + registers.D + registers.DF;
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    return 0;
};

const SDB = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]] - registers.D - (registers.DF ^ 0x01);
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    return 0;
};

const SHRC = function(memory, registers, inputs, outputs) {
    registers.D = (registers.D >> 1) | ((registers.D & 0x01) << 7);
    return 0;
};

const SMB = function(memory, registers, inputs, outputs) {
    registers.D = registers.D - memory[registers.R[registers.X]] - (registers.DF ^ 0x01);
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    return 0;
};

const SAV = function(memory, registers, inputs, outputs) {
    memory[registers.R[registers.X]] = registers.T;
    return 0;
};

const MARK = function(memory, registers, inputs, outputs) {
    registers.T = (registers.P | (registers.X << 4)) & 0xFF;
    memory[registers.R[2]] = registers.T;
    registers.X = registers.P;
    registers.R[2] = (registers.R[2] - 1) & 0xFFFF;
    return 0;
};

const REQ = function(memory, registers, inputs, outputs) {
    registers.Q = (registers.N - 0x0A) & 0x01;
    return 0;
};

const ADCI = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.P]] + registers.D + registers.DF;
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const SDBI = function(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.P]] - registers.D - (registers.DF ^ 0x01);
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const SHLC = function(memory, registers, inputs, outputs) {
    registers.D = (registers.D << 1) | registers.DF;
    registers.DF = (registers.D & 0x100) ? 1 : 0;
    return 0;
};

const SMBI = function(memory, registers, inputs, outputs) {
    registers.D = registers.D - memory[registers.R[registers.X]] - (registers.DF ^ 0x01);
    registers.DF = (registers.D >> 8) & 0x01;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const GLO = function(memory, registers, inputs, outputs) {
    if(registers.I & 0x01) {
        registers.D = (registers.R[registers.N] >> 8) & 0x00FF;
        return 0;
    }
    
    registers.D = registers.R[registers.N] & 0x00FF;
    return 0;
};

const PLO = function(memory, registers, inputs, outputs) {
    if(registers.I & 0x01) {
        registers.R[registers.N] = (registers.R[registers.N] & 0x00FF) | (registers.D << 8);
        return 0;
    }
    
    registers.R[registers.N] = (registers.R[registers.N] & 0xFF00) | registers.D;
    return 0;
};

// Long branches-------------------------------------------------------------------------------------------------------------------------------

const LBR = function(memory, registers, inputs, outputs) {
    const conditions = [
        true,
        registers.Q === 1,
        registers.D === 0,
        registers.DF === 1,
        false,
        
    ];
};

const instructions = [
    [ IDL, LDN, LDN,  LDN,  LDN, LDN, LDN,  LDN, LDN, LDN,  LDN, LDN, LDN,  LDN,  LDN,  LDN  ], //Group 0
    [ INC, INC, INC,  INC,  INC, INC, INC,  INC, INC, INC,  INC, INC, INC,  INC,  INC,  INC  ], //Group 1
    [ DEC, DEC, DEC,  DEC,  DEC, DEC, DEC,  DEC, DEC, DEC,  DEC, DEC, DEC,  DEC,  DEC,  DEC  ], //Group 2
    [ BR,  BQ,  BZ,   BDF,  B1,  B2,  B3,   B4,  NBR, BNQ,  BNZ, BNF, BN1,  BN2,  BN3,  BN4  ], //Group 3
    [ LDA, LDA, LDA,  LDA,  LDA, LDA, LDA,  LDA, LDA, LDA,  LDA, LDA, LDA,  LDA,  LDA,  LDA  ], //Group 4
    [ STR, STR, STR,  STR,  STR, STR, STR,  STR, STR, STR,  STR, STR, STR,  STR,  STR,  STR  ], //Group 5
    [ IRX, OUT, OUT,  OUT,  OUT, OUT, OUT,  OUT, INP, INP,  INP, INP, INP,  INP,  INP,  INP  ], //Group 6
    [ RET, DIS, LDXA, STXD, ADC, SDB, SHRC, SMB, SAV, MARK, REQ, REQ, ADCI, SDBI, SHLC, SMBI ], //Group 7
    [ GLO, GLO, GLO,  GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO,  GLO,  GLO  ], //Group 8
    [ GLO, GLO, GLO,  GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO,  GLO,  GLO  ], //Group 9
    [ PLO, PLO, PLO,  PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO,  PLO,  PLO  ], //Group A
    [ PLO, PLO, PLO,  PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO,  PLO,  PLO  ], //Group B
];

const executeInstruction = function(memory, registers, inputs, outputs, init) {
    if(init) {
        input_data_cnt = 0;
        registers.S = 0;
        return;
    }
    registers.S = instructions[registers.I][registers.N](memory, registers, inputs, outputs);
    if(!inputs.Interrupt && registers.IE) registers.S = 3;
}

module.exports = {
    executeInstruction: executeInstruction
};