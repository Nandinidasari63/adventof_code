export const calculateFuel = (mass,sum) =>
{
  if(mass <= 5){
    return +mass;
  }
const fuel = Math.floor(mass/3) - 2;
  return  sum + calculateFuel( fuel,fuel);
}

export const allFuels = (data) =>
{
  const array = data.split('\n');
 
  console.log(array)
  return array.reduce((sum,mass) => sum + calculateFuel(mass,0),0);
}

// function factorial(x){
//   if (x === 0) return 1;
// return x * factorial(x-1);
// }
// console.log(factorial(5));