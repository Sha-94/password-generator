// Assignment code here
var passwordRules = [];
var passwordCriteria = {};
const LOWERCASE_ID = "lowercase";
const UPPERCASE_ID = "uppercase";
const NUMERIC_ID = "numeric";
const SPECIAL_CHARS_ID = "specialChars";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  passwordCriteria = {
    length: getPasswordLength(),
    lowercaseFlag: getLowercaseFlag(),
    uppercaseFlag: getUppercaseFlag(),
    numericFlag: getNumericFlag(),
    specialCharsFlag: getSpecialCharsFlag(),
  }
 
  console.log(passwordCriteria);
  if(!isCriteriaValid(passwordCriteria)){
    alert("You must select at least one character type.");
    writePassword();
  }

  buildPasswordRules(passwordCriteria);
  var password = generatePassword(passwordCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

/* Generates a random index from 0 up to the last index in passwordRules array to choose a random char type. Once the char type is selected,
  a random character of that char type is appended to the password.*/
function generatePassword(passwordCriteria) {
  console.log("generating a password");
    let password = "";
    for(index = 0; index < passwordCriteria.length; index++){
        switch(passwordRules[randomNumber(0,passwordRules.length - 1)]){
          case LOWERCASE_ID: 
               password += getRandomLowercaseChar();
          break;
          case UPPERCASE_ID: 
              password += getRandomUppercaseChar();
          break;
          case NUMERIC_ID: 
              password += randomNumber(0,9);
          break;
          case SPECIAL_CHARS_ID:
              password += getRandomSpecialChar();
           break;
        }
    }

    return password;
}

function buildPasswordRules(passwordCriteria) {
  passwordRules = [];
  console.log("in build: ", passwordCriteria);

  if (passwordCriteria.lowercaseFlag) {
    passwordRules.push(LOWERCASE_ID);
  }

  if(passwordCriteria.uppercaseFlag){
    passwordRules.push(UPPERCASE_ID);
  }
  if (passwordCriteria.numericFlag){
    passwordRules.push(NUMERIC_ID);
  }

  if (passwordCriteria.specialCharsFlag){
    passwordRules.push(SPECIAL_CHARS_ID)
  }
}

function getPasswordLength() {
  let passwordLength;

  while( !passwordLength || passwordLength < 8 || passwordLength > 128 ){
    !passwordLength || alert("password must be 8 - 128 chars long");
    passwordLength = parseInt(prompt("How many characters would you like the password to be? (range 8 - 128 chars)"));
  }

  return passwordLength;
}

function getLowercaseFlag() {
  return confirm("Use lowercase characters? ");
}

function getUppercaseFlag(){
  return confirm("Use uppercase characters?");
}

function getNumericFlag(){
  return confirm ("Use numbers?");
}

function getSpecialCharsFlag(){
  return confirm("Use special characters?");
}

function isCriteriaValid(passwordCriteria){
  return passwordCriteria.lowercaseFlag || passwordCriteria.uppercaseFlag 
  || passwordCriteria.numericFlag || passwordCriteria.specialCharsFlag;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);;
};

function getRandomLowercaseChar(){
  return String.fromCharCode(randomNumber(97, 122));
}

function getRandomUppercaseChar(){
  return String.fromCharCode(randomNumber(65, 90));
}

function getRandomSpecialChar(){
  return String.fromCharCode(randomNumber(33,47));
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
