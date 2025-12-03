import { calculateFuel,allFuels } from '../src/fuel.js';
import { assertEquals } from "jsr:@std/assert";


Deno.test("1-digit: 1", () =>
  assertEquals(calculateFuel(12),2));

Deno.test("1-digit: 1", () =>
  assertEquals(calculateFuel(14),2));

Deno.test("1-digit: 1", () =>
  assertEquals(calculateFuel(1969),654));

const input =  Deno.readTextFileSync('../data/input.txt');

Deno.test("1-digit: 1", () =>
  assertEquals(allFuels(input),3481005));
