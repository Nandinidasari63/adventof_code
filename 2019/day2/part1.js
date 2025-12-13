import { chunk } from "jsr:@std/collections";

const displayGrid = (computer) => {
  const program = computer.program;

  chunk(program, 12).forEach((row, rowIndex) => {
    const styles = [];
    const line = row.map((cell, colIndex) => {
      const absoluteIndex = rowIndex * 12 + colIndex;
      styles.push(
        absoluteIndex === computer.index
          ? "color:red;font-weight:bold"
          : "color:green"
      );
      return "%c" + String(cell).padStart(7);
    }).join(" ");
    
    console.log(line, ...styles);
  });
};

  const parseInput = (puzzleInput) => {
    const program = eval("[" + puzzleInput + "]");
    const computer = { program, index: 0, isHalted: false };
    return operationsOnProgram(computer);
  };

  const getArguments = (program, index) => program.slice(index + 1, index + 4);

  const performAdd = (computer) => {
    const program = computer.program;
    const index = computer.index;
    const [input1, input2, result] = getArguments(program, index);
    computer.index = index + 4;
    program[result] = program[input1] + program[input2];

  };

  const performMul = (computer) => {
    const program = computer.program;
    const index = computer.index;
    const [input1, input2, result] = getArguments(program, index);
    computer.index = index + 4;
    program[result] = program[input1] * program[input2];
  };

  const performHalt = (computer) => {
    console.log('hi in 99');
    computer.isHalted = true;
  };

  function operationsOnProgram(computer) {
    while (computer.isHalted === false) {
      const operations = {
        1: performAdd,
        2: performMul,
        99: performHalt,
      };
      prompt('enter');
      console.clear();
      console.log(displayGrid(computer));
    operations[computer.program[computer.index]](computer);
    }
    return computer;
  }
const puzzleInput = Deno.readTextFileSync("input.txt");
  console.log('last answer',parseInput(puzzleInput));