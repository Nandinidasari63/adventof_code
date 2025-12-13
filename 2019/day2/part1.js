const alarm = (data) => {
  const x = data.split(",");
  const actual = x.map((a) => parseInt(a));
  const y = actual.slice();
  return process(y);
};

function process(dup) {
  for (let index = 0; index < dup.length;) {
    switch (dup[index]) {
      case 1:
        dup[dup[index + 3]] = dup[dup[index + 1]] + dup[dup[index + 2]];
        console.log(dup[index +3],dup[dup[index+3]])
        break;
      case 2:
        dup[dup[index+3]] = dup[dup[index+1]] * dup[dup[index+2]];
        break;
      case 99:
        index = dup.length;
        break;
    }
    index+=4;
  }
  return dup;
}
