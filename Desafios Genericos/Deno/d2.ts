import { parse } from "https://deno.land/std@0.95.0/datetime/mod.ts"

const dateTime = parse("04-07-2022", "dd-mm-yyyy")

console.log(dateTime)