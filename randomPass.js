const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numbers = '0123456789';

const specialCharacters = ' !@#$%^&*()_+~`|}{[]:;?><,./-=';

class Password {
  constructor(passwordLength) {
    this.passwordLength = passwordLength;
  }

  generatePassword() {
    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * 4);
      // 4 is the number of options for each character type in the password (lowerCase, upperCase, numbers, specialCharacters)
      switch (randomNumber) {
        case 0:
          password += lowerCase.charAt(
            Math.floor(Math.random() * lowerCase.length)
          );
          break;
        case 1:
          password += upperCase.charAt(
            Math.floor(Math.random() * upperCase.length)
          );
          break;
        case 2:
          password += numbers.charAt(
            Math.floor(Math.random() * numbers.length)
          );
          break;
        case 3:
          password += specialCharacters.charAt(
            Math.floor(Math.random() * specialCharacters.length)
          );
          break;
      }
    }
    return password;
  }

  generateSetOfPasswords(numberOfPasswords) {
    let setOfPasswords = [];
    for (let i = 0; i < numberOfPasswords; i++) {
      setOfPasswords.push(this.generatePassword());
    }
    return setOfPasswords;
  }
}

rl.question('How long is password ? \n:', (answer) => {
  let password = new Password(+answer);
  rl.question('How many passwords would you like to generate? \n:', (answer) => {
    let setOfPasswords = password.generateSetOfPasswords(+answer);
    console.log(setOfPasswords);
    rl.question('What is the name of the file? \n', (answer) => {
      fs.writeFileSync(answer+'.txt', setOfPasswords.join('\n:'));
      rl.close();
    });
  });
});
