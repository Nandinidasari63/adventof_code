const dealIncrement = (deck, incNum) => {
  let copyDeck = Array.from({ length: deck.length });
  copyDeck[0] = deck[0];
  let num = incNum;
  for (let index = 1; index < deck.length; index++) {

    copyDeck[num] = deck[index];


    num = (num + incNum) % deck.length;

  }
  return copyDeck;
};

const dealToNewStack = (deck) => [...deck].reverse();


const cutNCards = (deck, n) => {
  if (n > 0) {
    return deck.slice(n).concat(deck.slice(0, n));
  } else {
    return deck.slice(deck.length + n).concat(deck.slice(0, deck.length + n));
  }
};

function main() {
  let deck = Array.from({ length: 10007 }, (_, i) => i);
  const text = Deno.readTextFileSync("part1_input.txt");
  const instructions = text.split("\n");

  const obj = {
    "deal with increment": dealIncrement,
    "deal into new stack": dealToNewStack,
    "cut": cutNCards,
  };
  for (let ins of instructions) {
    let item;
    console.log(ins,deck)
    if (ins !== "deal into new stack")
    {
      let items = ins.split(" ");
      item = parseInt(items[items.length - 1]);
      ins = items.slice(0, items.length - 1).join(" ");
    }
    deck = obj[ins](deck,item);
  }
  return deck;
}
const output = main();
console.log(output.indexOf(2019))
