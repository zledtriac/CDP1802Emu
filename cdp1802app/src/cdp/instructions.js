
let input_data_cnt = 0;

function IDL(memory, registers, inputs, outputs) {
    return 1;
};

function LDN(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.N]];
    return 0;
};

function INC(memory, registers, inputs, outputs) {
    registers.R[registers.N] = (registers.R[registers.N] + 1) & 0xFFFF;
    return 0;
};

function DEC(memory, registers, inputs, outputs) {
    registers.R[registers.N] = (registers.R[registers.N] - 1) & 0xFFFF;
    return 0;
};

function BR(memory, registers, inputs, outputs) {
    const conditions = [
        true,
        registers.Q,
        !registers.D,
        registers.DF,
        (inputs.EF ^ 0x0F) & 0x01,
        (inputs.EF ^ 0x0F) & 0x02,
        (inputs.EF ^ 0x0F) & 0x04,
        (inputs.EF ^ 0x0F) & 0x08,
        false,
        !registers.Q,
        registers.D,
        !registers.DF,
        inputs.EF & 0x01,
        inputs.EF & 0x02,
        inputs.EF & 0x04,
        inputs.EF & 0x08
    ];
    
    if(conditions[registers.N]) {
        registers.R[registers.P] = (registers.R[registers.P] & 0xFF00) | (memory[registers.R[registers.P]] & 0x00FF);
        return 0;
    }
    
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

function LDA(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.N]];
    registers.R[registers.N] = (registers.R[registers.N] + 1) & 0xFFFF;
    return 0;
};

function STR(memory, registers, inputs, outputs) {
    memory[registers.R[registers.N]] = registers.D;
    return 0;
};

function IRX(memory, registers, inputs, outputs) {
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

function OUT(memory, registers, inputs, outputs) {
    outputs.N = registers.N & 0x07;
    outputs.BUS = inputs.BUS = memory[registers.R[registers.X]];
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

function INP(memory, registers, inputs, outputs) {
    outputs.N = registers.N & 0x07;
    memory[registers.R[registers.X]] = registers.D = inputs.BUS;
    return 0;
};

function RET(memory, registers, inputs, outputs) {
    registers.P = memory[registers.R[registers.X]] & 0x0F;
    registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    registers.IE = 1;
    return 0;     
};

function DIS(memory, registers, inputs, outputs) {
    registers.P = memory[registers.R[registers.X]] & 0x0F;
    registers.X = (memory[registers.R[registers.X]] & 0xF0) >> 4;
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    registers.IE = 0;
    return 0;     
};

function LDXA(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]];
    registers.R[registers.X] = (registers.R[registers.X] + 1) & 0xFFFF;
    return 0;
};

function STXD(memory, registers, inputs, outputs) {
    memory[registers.R[registers.X]] = registers.D;
    registers.R[registers.X] = (registers.R[registers.X] - 1) & 0xFFFF;
    return 0;
};

function ADC(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]] + registers.D + registers.DF;
    registers.DF = (registers.D & 0x100) ? 1 : 0;
    registers.D = registers.D & 0xFF;
    return 0;
};

function SDB(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.X]] - registers.D - (registers.DF ^ 0x01);
    registers.DF = (registers.D & 0x100) ? 0 : 1;
    registers.D = registers.D & 0xFF;
    return 0;
};

function SHRC(memory, registers, inputs, outputs) {
    let temp_df = registers.D & 0x01;
    registers.D = ((registers.D >> 1) | ((registers.DF) ? 0x80 : 0x00)) & 0xFF;
    registers.DF = temp_df;
    return 0;
};

function SMB(memory, registers, inputs, outputs) {
    registers.D = registers.D - memory[registers.R[registers.X]] - (registers.DF ^ 0x01);
    registers.DF = (registers.D & 0x100) ? 0 : 1;
    registers.D = registers.D & 0xFF;
    return 0;
};

function SAV(memory, registers, inputs, outputs) {
    memory[registers.R[registers.X]] = registers.T;
    return 0;
};

function MARK(memory, registers, inputs, outputs) {
    registers.T = (registers.P | (registers.X << 4)) & 0xFF;
    memory[registers.R[2]] = registers.T;
    registers.X = registers.P;
    registers.R[2] = (registers.R[2] - 1) & 0xFFFF;
    return 0;
};

function REQ(memory, registers, inputs, outputs) {
    registers.Q = registers.N & 0x01;
    return 0;
};

function ADCI(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.P]] + registers.D + registers.DF;
    registers.DF = (registers.D & 0x100) ? 1 : 0;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

function SDBI(memory, registers, inputs, outputs) {
    registers.D = memory[registers.R[registers.P]] - registers.D - (registers.DF ^ 0x01);
    registers.DF = (registers.D & 0x100) ? 0 : 1;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

function SHLC(memory, registers, inputs, outputs) {
    registers.D = (registers.D << 1) | registers.DF;
    registers.DF = (registers.D & 0x100) ? 1 : 0;
    return 0;
};

function SMBI(memory, registers, inputs, outputs) {
    registers.D = registers.D - memory[registers.R[registers.X]] - (registers.DF ^ 0x01);
    registers.DF = (registers.D & 0x100) ? 0 : 1;
    registers.D = registers.D & 0xFF;
    registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

function GLO(memory, registers, inputs, outputs) {
    if(registers.I & 0x01) {
        registers.D = (registers.R[registers.N] >> 8) & 0x00FF;
        return 0;
    }
    
    registers.D = registers.R[registers.N] & 0x00FF;
    return 0;
};

function PLO(memory, registers, inputs, outputs) {
    if(registers.I & 0x01) {
        registers.R[registers.N] = (registers.R[registers.N] & 0x00FF) | (registers.D << 8);
        return 0;
    }
    
    registers.R[registers.N] = (registers.R[registers.N] & 0xFF00) | registers.D;
    return 0;
};

function LBR(memory, registers, inputs, outputs) {
    const conditions = [
        [ true,               true          ],
        [ registers.Q,        true          ],
        [ !registers.D,       true          ],
        [ registers.DF,       true          ],
        [ false,              false         ],
        [ false,              !registers.Q  ],
        [ false,              registers.D   ],
        [ false,              !registers.DF ],
        [ false,              true          ],
        [ !registers.Q,       false         ],
        [ registers.D,        false         ],
        [ !registers.DF,      false         ],
        [ false,              registers.IE  ],
        [ false,              registers.Q   ],
        [ false,              !registers.D  ],
        [ false,              registers.DF  ]
    ];
        
    if(!input_data_cnt) {
        if(conditions[registers.N][0]) registers.B = memory[registers.R[registers.P]];
        if(conditions[registers.N][1]) registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
        input_data_cnt++;
        return 1;
    }

    if(conditions[registers.N][0]) {
        registers.R[registers.P] = ((registers.B << 8) | memory[registers.R[registers.P]]) & 0xFFFF;
        input_data_cnt = 0;
        return 0;
    }
    if(conditions[registers.N][1]) registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    input_data_cnt = 0;
    return 0;
};

function SEP(memory, registers, inputs, outputs) {
    if(registers.I & 0x01) {
        registers.P = registers.N;
        return 0;
    }
    
    registers.X = registers.N;
    return 0;
};

function LDX(memory, registers, inputs, outputs) {    
    let MRX = memory[registers.R[registers.X]];
    if(registers.N & 0x08) MRX = memory[registers.R[registers.P]];
    
    const results = [
        [MRX, false],
        [MRX | registers.D, false],
        [MRX & registers.D, false],
        [MRX ^ registers.D, false],
        [MRX + registers.D, true],
        [MRX - registers.D, true],
        [(registers.N & 0x08) ? registers.D << 1 : registers.D >> 1 , true],
        [registers.D - MRX, true]
    ];
    
    if(results[registers.N & 0x07][1]) {
        if(registers.N === 0x04 || registers.N === 0x0C || registers.N === 0x0E) {
            registers.DF = (results[registers.N & 0x07][0] & 0x100) ? 1 : 0;
        }
        if(registers.N === 0x05 || registers.N === 0x07 || registers.N === 0x0D || registers.N === 0x0F) {
            registers.DF = (results[registers.N & 0x07][0] & 0x100) ? 0 : 1;
        }
        if(registers.N === 0x06) {
            registers.DF = (registers.D & 0x01) ? 1 : 0;
        }
    }
    
    registers.D = results[registers.N & 0x07][0] & 0xFF;
    if(registers.N & 0x08 && registers.N !== 0x0E) registers.R[registers.P] = (registers.R[registers.P] + 1) & 0xFFFF;
    return 0;
};

const instructions = [
    [ IDL, LDN, LDN,  LDN,  LDN, LDN, LDN,  LDN, LDN, LDN,  LDN, LDN, LDN,  LDN,  LDN,  LDN  ], //Group 0
    [ INC, INC, INC,  INC,  INC, INC, INC,  INC, INC, INC,  INC, INC, INC,  INC,  INC,  INC  ], //Group 1
    [ DEC, DEC, DEC,  DEC,  DEC, DEC, DEC,  DEC, DEC, DEC,  DEC, DEC, DEC,  DEC,  DEC,  DEC  ], //Group 2
    [ BR,  BR,  BR,   BR,   BR,  BR,  BR,   BR,  BR,  BR,   BR,  BR,  BR,   BR,   BR,   BR   ], //Group 3
    [ LDA, LDA, LDA,  LDA,  LDA, LDA, LDA,  LDA, LDA, LDA,  LDA, LDA, LDA,  LDA,  LDA,  LDA  ], //Group 4
    [ STR, STR, STR,  STR,  STR, STR, STR,  STR, STR, STR,  STR, STR, STR,  STR,  STR,  STR  ], //Group 5
    [ IRX, OUT, OUT,  OUT,  OUT, OUT, OUT,  OUT, INP, INP,  INP, INP, INP,  INP,  INP,  INP  ], //Group 6
    [ RET, DIS, LDXA, STXD, ADC, SDB, SHRC, SMB, SAV, MARK, REQ, REQ, ADCI, SDBI, SHLC, SMBI ], //Group 7
    [ GLO, GLO, GLO,  GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO,  GLO,  GLO  ], //Group 8
    [ GLO, GLO, GLO,  GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO, GLO, GLO,  GLO,  GLO,  GLO  ], //Group 9
    [ PLO, PLO, PLO,  PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO,  PLO,  PLO  ], //Group A
    [ PLO, PLO, PLO,  PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO, PLO, PLO,  PLO,  PLO,  PLO  ], //Group B
    [ LBR, LBR, LBR,  LBR,  LBR, LBR, LBR,  LBR, LBR, LBR,  LBR, LBR, LBR,  LBR,  LBR,  LBR  ], //Group C
    [ SEP, SEP, SEP,  SEP,  SEP, SEP, SEP,  SEP, SEP, SEP,  SEP, SEP, SEP,  SEP,  SEP,  SEP  ], //Group D
    [ SEP, SEP, SEP,  SEP,  SEP, SEP, SEP,  SEP, SEP, SEP,  SEP, SEP, SEP,  SEP,  SEP,  SEP  ], //Group E
    [ LDX, LDX, LDX,  LDX,  LDX, LDX, LDX,  LDX, LDX, LDX,  LDX, LDX, LDX,  LDX,  LDX,  LDX  ]  //Group F
];

function executeInstruction(memory, registers, inputs, outputs, init) {
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