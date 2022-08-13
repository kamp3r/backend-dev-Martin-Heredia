import {
  red,
  green,
  bgWhite,
  yellow,
} from 'https://deno.land/std@0.95.0/fmt/colors.ts';

const getMin = (numbers: number[]) => Math.min(...numbers);
const getMax = (numbers: number[]) => Math.max(...numbers);
const getAverage = (numbers: number[]) => {
  const reduxer = (acummulator: number, curr: number) => acummulator + curr;
  return numbers.reduce(reduxer) / numbers.length;
};

const numbers = Deno.args.map((elem) => parseInt(elem, 10));
const minimo = getMin(numbers);
const maximo = getMax(numbers);
const promedio = getAverage(numbers);
const outPut = `
    Numeros: ${numbers},
    Minimo: ${minimo},
    Maximo: ${maximo},
    Promedio: ${promedio}
`;
Deno.writeTextFile('numbers.txt', outPut);

console.log(bgWhite(`Numeros: ${numbers}`));
console.log(bgWhite(yellow(`Minimo: ${minimo}`)));
console.log(bgWhite(red(`Maximo: ${maximo}`)));
console.log(bgWhite(green(`Promedio: ${promedio}`)));
