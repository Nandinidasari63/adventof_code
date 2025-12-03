import { allFuels } from '../src/part2.js';
import { assertEquals } from "jsr:@std/assert";


// Deno.test(" fuel ", () =>
//   assertEquals(allFuels('12'),2));

Deno.test("1-digit: 1", () =>
  assertEquals(allFuels('14\n1969'),968));

// Deno.test("2 values ", () =>
//   assertEquals(allFuels('14\n12'),4));

// const input =  Deno.readTextFileSync('../data/input.txt');

// Deno.test("1-digit: 1", () =>
//   assertEquals(allFuels('100756\n'),50346));

export const input =  Deno.readTextFileSync('../data/input.txt');
Deno.test("1-digit: 1", () =>
  assertEquals(allFuels(input),3481005));

