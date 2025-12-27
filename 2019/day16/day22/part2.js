// Modular inverse
function modInv(a, m) {
  let [m0, x0, x1] = [m, 0, 1];
  while (a > 1) {
    let q = Math.floor(a / m);
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return (x1 + m0) % m0;
}

// Reverse deal with increment
const dealIncrement = (deckCardInPosition, size, item) =>
  ((deckCardInPosition * modInv(item, size)) % size + size) % size;

// Reverse deal into new stack
const dealToNewStack = (deckCardInPosition, size) =>
  (size - 1) - deckCardInPosition;

// Reverse cut
const cutNCards = (deckCardInPosition, size, item) =>
  ((deckCardInPosition + item) % size + size) % size;


function main() {
  const text = Deno.readTextFileSync("part2_input.txt");
  const instructions = text.split("\n").reverse();
  let position = 2020; // the position you want to track
  const size = 119315717514047;   // deck size
  let deckCardInPosition = position;

  const obj = {
    "deal with increment": dealIncrement,
    "deal into new stack": dealToNewStack,
    "cut": cutNCards,
  };

  for (let ins of instructions) {
    let item;
    if (ins !== "deal into new stack") {
      let items = ins.split(" ");
      item = parseInt(items[items.length - 1]);
      ins = items.slice(0, items.length - 1).join(" ");
    }
    deckCardInPosition = obj[ins](deckCardInPosition, size, item);
    console.log({ deckCardInPosition });
  }

  return deckCardInPosition;
}

console.log(main());
//9902396776529