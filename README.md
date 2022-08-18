# CDP1802Emu
This is a CDP1802 cpu emulator created with React and MUI. This project was made for training and educational purposes. The emulator only have 256 bytes of memory, enough to demonstrate loops, branches, and small programs. It's still in a development stage, but it's working.

Currently it doesn't have any compiler built into it, so it can only run compiled binary files. A compiler can be found on the https://www.retrotechnology.com/ what can be used to compile Assembly codes: https://www.retrotechnology.com/memship/a18.html

## Installation
In order to run the program you need to have Node.js installed on the PC. You can installit from the official website: https://nodejs.org/en/download/

If Node.js is already on your PC, In the commandline navigate to the cdp1802app folder and run "npm install".
```
cd cdp1802app
npm install
```
After the package installation finished. To start the development mode, run "npm start" and wait a few minutes, the server should start and open a webpage automatically at http://localhost:3000
```
npm start
```
## Usage
![UI](/img/screenshot.jpg)
On the left you can see the register blocks and on the middle you can see the a memory. Under the memory view, you can see the control buttons.\
Function of the buttons:
- **RESET:** It will resets the cpu to the init state (S1).
- **RUN:** It will start to stepping through the cycles automatically with a 500 milliseconds interval.
- **STOP:** It will stop the automatic stepping.
- **STEP:** It will step one full instruction.
- **NEXT CYCLE:** It will execute the current state, and goes to the next state.
- **OPEN FILE:** It will open up an open file dialog, you can load a compiled binary file.

The program counter and its position is highlighted with green, and the data pointer and its position is highlighted with yellow color.
