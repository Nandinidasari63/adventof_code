//   const output = [];
//   const data = x.split(",");
//   const actual = data.map((a) => parseInt(a));
//   const dup = actual.slice();

//   function findNumForAddMul(placeModes, array,index) {
//     let num1, num2, result;
//     if (placeModes[2] === "0") {
//       num1 = array[array[index + 1]];
//     } else {
//       num1 = array[index + 1];
//     }
//     if (placeModes[1] === "0") {
//       num2 = array[array[index + 2]];
//     } else {
//       num2 = array[index + 2];
//     }
//     if (placeModes[0] === "0") {
//       result = array[index + 3];
//     } else {
//       result = index + 3;
//     }
//     return [num1, num2, result];
//   }

//   function findAddressFor(placeModes, array,index) {
//     let resultIndex;
//     if (placeModes[0] === "0") {
//       resultIndex = array[index + 1];
//     } else {
//       resultIndex =index + 1;
//     }
//     return resultIndex;
//   }

//   function process(dup) {
//     let index = 0;
//     let put,num1,num2,result;
//     while (index < dup.length) {
//       const value = dup[index];
//       const numberInarray = value.toString().split("");
//       const instruction = parseInt(numberInarray.slice(-2).join(""));
//       let placeModes = numberInarray.slice(0, numberInarray.length - 2).join("");
//       if (instruction === 3 || instruction === 4) {
//         if (placeModes.length !== 1) placeModes = placeModes.padStart(1, "0");
//         const arrayOfNum = findAddressFor(placeModes, dup,index);
//       put = arrayOfNum;
//       }
//       if(instruction === 1 || instruction === 2){
//       if (placeModes.length < 3) placeModes = placeModes.padStart(3, "0");
//       console.log('oyy in padding for add',placeModes);
//         const arrayOfNum = findNumForAddMul(placeModes, dup,index);
//         num1 = arrayOfNum[0];
//         num2 = arrayOfNum[1];
//         result = arrayOfNum[2];
// console.log({num1,num2,result});
//       }

//       switch (instruction) {
//         case 1:
//           dup[result] = num1 + num2;
//           index = index + 4;
//           break;
//         case 2:
//           dup[result] = num1 * num2;
//           index = index + 4;
//           break;
//         case 99:
//           index = dup.length;
//           break;
//         case 3:
//           dup[put] = 1;
//           index = index + 2;
//           break;
//         case 4:
//           output.push(dup[put]);
//           index = index + 2;
//           break;
//       }
//     }
//     console.log('hi')

//     return dup;
//   }

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
  const computer = { program, index: 0, isHalted: false };
  return operationsOnProgram(computer);
};

const getArguments = (program, index) => {
  const instructionInStr = program[index].toString();
  const [modeOfResult, ModeOfInput2, ModeOfInput1] = instructionInStr.slice(0,instructionInStr.length - 2,).padStart(3, 0);
  console.log({modeOfResult,ModeOfInput1,ModeOfInput2});
  let [num1, num2] = program.slice(index + 1, index + 3);
  let result = index + 3;
  console.log({num1,num2,result});
  if (modeOfResult === "0") {         
    result = program[result];
  }
  if (ModeOfInput1 === "0") {
    num1 = program[num1];
  }
  if (ModeOfInput2 === "0") {
    num2 = program[num2];
  }
  console.log({num1,num2,result});
  return [num1, num2, result];
};

const performAdd = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const [input1, input2, result] = getArguments(program, index);
  computer.index = index + 4;
  program[result] = input1 + input2;
};

const performMul = (computer) => {
  const program = computer.program;
  const index = computer.index;
  const [input1, input2, result] = getArguments(program, index);
  computer.index = index + 4;
  program[result] = input1 * input2;
};

const performHalt = (computer) => {
  computer.isHalted = true;
};

function operationsOnProgram(computer) {
  while (computer.isHalted === false) {
    const operations = {
      1: performAdd,
      2: performMul,
      99: performHalt,
      //4: performOutput,
      //3: takeInput,
    };
    prompt("enter");
    console.clear();
    console.log(displayGrid(computer));
    const WholeInstruction = computer.program[computer.index].toString();
    const instruction = parseInt(WholeInstruction.slice(WholeInstruction.length - 2));
    console.log(instruction);
    operations[instruction](computer);
  }
  return computer;
}
const puzzleInput = "1001,4,66,4,33"
console.log("last answer", parseInput(puzzleInput));
