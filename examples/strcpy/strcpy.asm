R4      EQU 4
R5      EQU 5

    org 00h
START
    dis
    idl
    
    ldi EXSTRING.0
    plo R4
    ldi EXSTRING.1
    phi R4
    
    ldi 0C0h
    plo R5
    ldi 00h
    phi R5
    
    SEX R4

PUTCHR
    ldxa
    str R5
    inc R5
    bnz PUTCHR
    
ENDLOOP
    br ENDLOOP

EXSTRING  
    db "This is a string.", 0

    END