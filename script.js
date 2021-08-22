// Assignment code here

// assigning objects to be related to checkboxes/values

const resultP = document.getElementById('result');
const lengthP = document.getElementById('length');
const uppercaseP = document.getElementById('upperCase');
const lowercaseP = document.getElementById('lowerCase');
const integerP = document.getElementById('integer');
const specialCharP = document.getElementById('specialChar');
const generateP = document.getElementById('generate');

// functions to retrieve characters for password

function getInteger() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSpecialChar() {
  const specialChar = "!@#$%^&*()_+=-`~[]{}\|;:,.<>/";
  return specialChar[Math.floor(Math.random() * specialChar.length)];
}

function getUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//object containing items set to functions
//IF isLowerCheck = true, call getLowercase function, etc

const baseFunction = {
  isLowerCheck: getLowercase,
  isUpperCheck: getUppercase,
  isIntegerCheck: getInteger,
  isSpecialCheck: getSpecialChar
};

// function to generate password

function generatePassword() {

  //setting values to match user input if option is checked
  const length = +lengthP.value;
  const isLowerCheck = lowercaseP.checked;
  const isUpperCheck = uppercaseP.checked;
  const isIntegerCheck = integerP.checked;
  const isSpecialCheck = specialCharP.checked;

  //function to make sure anything at all is checked
  const checks = isLowerCheck + isUpperCheck + isIntegerCheck + isSpecialCheck;

  // blank slate for the generated password

  let generatedPassword = "";

  // array of possible checked options, which filters out unchecked options, retrieves data from checked options
  const boxArray = [{ isIntegerCheck }, { isUpperCheck }, { isLowerCheck }, { isSpecialCheck }].filter
  (
    item => Object.values(item)[0]
  );

  // calling checks func, if no options are checked, return an empty string
  if (checks === 0) {
    return '';
  }

  // for loop which takes checked items from array and loops them until length is met
  for (let i = 0; i < length; i += checks) {
    boxArray.forEach(type => {
      //function to take array items and retrieve values based on which is checked
      const funcCheck = Object.keys(type)[0];
      //calling basefunction object and looping through it's items until parameters are met, setting result to generatedPassword
      generatedPassword += baseFunction[funcCheck]();
    });
  }
  //object containing the generated password returned as a string, starting at 0 and ending at appropriate length
  const displayedPassword = generatedPassword.slice(0, length);
  //returning displayed password function
  return displayedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
