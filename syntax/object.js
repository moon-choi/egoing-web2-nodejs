var members = ['a', 'b', 'c']

var i = 0;
while (i < members.length) {
  console.log('array:', members[i]);
  i = i + 1;
}


var roles = {
  programmer: 'a',
  designer: 'b',
  manager: 'c'
}

for (var role in roles) {
  console.log('key:', role, 'value:', roles[role])
}