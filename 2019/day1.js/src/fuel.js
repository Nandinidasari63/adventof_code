export const calculateFuel = (mass) =>
{
  return Math.floor(mass/3) - 2;
  
}

export const allFuels = (data) =>
{
  const array = data.split('\n');

  console.log(array)
  return array.reduce((sum,mass) => sum + calculateFuel(mass) ,0)
}

export const fuelASFuel = (data) =>
{
  let sum = 0;
  if(fuel <= 0){
    return 0;
  }
  const fuel = allFuels(data);
  sum += calculateFuel(fuel);
}
