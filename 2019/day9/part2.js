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
          : "color:green",
      );
      return "%c" + String(cell).padStart(7);
    }).join(" ");

    console.log(line, ...styles);
  });
};

const parseInput = (puzzleInput) => {
  const program = eval("[" + puzzleInput + "]");
  const computer = { program, index: 0, isHalted: false, RB: 0 };
  return operationsOnProgram(computer);
};

const getArguments = (program, index, RB) => {
  const instructionInStr = program[index].toString();
  const [modeOfResult, ModeOfInput2, ModeOfInput1] = instructionInStr.slice(
    0,
    instructionInStr.length - 2,
  ).padStart(3, 0);
  console.log({ modeOfResult, ModeOfInput1, ModeOfInput2 });
  let [num1, num2] = program.slice(index + 1, index + 3);
  let result = index + 3;
  console.log({ num1, num2, result });
  if (modeOfResult === "0") {
    result = program[result];
  }
  if (modeOfResult === "2") {
    result = RB + program[result] ?? 0;
  }

  if (ModeOfInput1 === "0") {
    num1 = program[num1];
  }
  if (ModeOfInput1 === "2") {
    num1 = program[RB + num1] ?? 0;
  }
  if (ModeOfInput2 === "0") {
    num2 = program[num2];
  }
  if (ModeOfInput2 === "2") {
    num2 = program[RB + num2] ?? 0;
  }
  console.log({ num1, num2, result });
  return [num1, num2, result];
};

const performAdd = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const [input1, input2, result] = getArguments(program, index, RB);
  computer.index = index + 4;
  program[result] = input1 + input2;
};

const performMul = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const [input1, input2, result] = getArguments(program, index, RB);
  computer.index = index + 4;
  program[result] = input1 * input2;
};

const performHalt = (computer) => {
  computer.isHalted = true;
};

const getAddress = (program, index, RB) => {
  const instructionInStr = program[index].toString();
  const modeOfResult = instructionInStr.slice(0, instructionInStr.length - 2);
  if (modeOfResult.length === 0) {
    return program[index + 1] ?? 0;
  } else if (modeOfResult[0] === "1") {
    return index + 1;
  } else {
    return RB + program[index + 1] ?? 0;
  }
};

const performOutput = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const resultIndex = getAddress(program, index, RB);
  console.log("output is", program[resultIndex]);
  computer.index = index + 2;
};

const takeInput = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const resultIndex = getAddress(program, index, RB);
  console.log("pacing 1 index in ", resultIndex, program[resultIndex]);
  program[resultIndex] = 2;
  console.log("after placing", program[resultIndex]);
  computer.index = index + 2;
};

const nonZero = (computer) => {
  const program = computer.program;
  const RB = computer.RB;
  const index = computer.index;
  const [input1, input2, result] = getArguments(program, index, RB);
  computer.index = input1 !== 0 ? input2 : index + 3;
};

const zero = (computer) => {
  const program = computer.program;
  const RB = computer.RB;
  const index = computer.index;
  const [input1, input2, result] = getArguments(program, index, RB);

  computer.index = input1 === 0 ? input2 : index + 3;
};

const lessThan = (computer) => {
  const RB = computer.RB;
  const program = computer.program;
  const index = computer.index;
  const [input1, input2, result] = getArguments(program, index, RB);
  program[result] = input1 < input2 ? 1 : 0;
  computer.index = index + 4;
};

const BothEqual = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const [input1, input2, result] = getArguments(program, index, RB);
  program[result] = input1 === input2 ? 1 : 0;
  computer.index = index + 4;
};

const modifyRB = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const RB = computer.RB;
  const resultIndex = getAddress(program, index, RB);
  computer.RB = computer.RB + program[resultIndex];
  computer.index = index + 2;
};

function operationsOnProgram(computer) {
  while (computer.isHalted === false) {
    const operations = {
      1: performAdd,
      2: performMul,
      99: performHalt,
      4: performOutput,
      3: takeInput,
      5: nonZero,
      6: zero,
      7: lessThan,
      8: BothEqual,
      9: modifyRB,
    };
    //  prompt("enter");
    // process.stdout.write("\x1b[2J\x1b[H");
    //console.clear();
    //displayGrid(computer);
    console.log("index is ", computer.index);
    const WholeInstruction = computer.program[computer.index].toString();
    const instruction = parseInt(
      WholeInstruction.slice(WholeInstruction.length - 2),
    );
    console.log(instruction);
    operations[instruction](computer);
  }
  return computer;
}

console.log("last answer", parseInput(puzzleInput));
