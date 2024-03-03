const fs = require('fs');

// New users to add
const newUsers = [
  { username: 'shay', password: '12345678' },
  { username: 'may', password: '12345678' },
  { username: 'matan', password: '12345678' },
  { username: 'tzahi', password: '12345678' },
  { username: 'daniel', password: '12345678' },
  { username: 'naomi', password: '12345678' },
  { username: 'alex', password: '12345678' },
  { username: 'nir', password: '12345678' }
];

// Encode username and password for new users
newUsers.forEach(user => {
  user.username = Buffer.from(user.username).toString('base64');
  user.password = Buffer.from(user.password).toString('base64');
});


// Read existing users from the users.json file
let existingUsers = [];
try {
  existingUsers = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  // Combine existing and new users
} catch (error) {
  console.error('Error reading existing users:', error);
}

// Filter out duplicate users by username
const filteredNewUsers = newUsers.filter(newUser => {
  return !existingUsers.some(existingUser => existingUser.username === newUser.username);
});

// Combine existing users with filtered new users
const allUsers = existingUsers.concat(filteredNewUsers);

try{
// Write the updated array of users back to the users.json file
fs.writeFileSync('users.json', JSON.stringify(allUsers, null, 2));
console.log('New users added successfully.');
}catch(error){
    console.error('Error writin new users:', error);  
}


