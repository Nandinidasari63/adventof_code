// dealIntoNewStack = new = (M - 1) - x (m = size , x = 2020)
// cut :new = x - N
// incrememt : new = x * incvalue   (mod 10)

const dealIncrement = (deckPosition, size, item) => {
  console.log({ deckPosition, item, size });
  return (deckPosition * item) % size;
};

const dealToNewStack = (deckPosition, size) => (size - 1) - deckPosition;

const cutNCards = (deckPosition, size, item) => deckPosition - item;

function main() {
  const text = Deno.readTextFileSync("part1_input.txt");
  const instructions = text.split("\n");
  let deckPosition = 2019;
  const size = 10007;
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
    deckPosition = obj[ins](deckPosition, size, item);
    console.log({ deckPosition });
  }
  return deckPosition;
}

const cardPosition = () => {
  const value = main();
  if (value < 0) return (10007 + value);
  return value;
};
console.log(cardPosition());
