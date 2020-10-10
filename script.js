// Assignment code here
var passwordCriteria = {
  length: null,
  lowercaseFlag: false,
  uppercaseFlag: false,
  numericFlag: false,
  specialCharsFlag: false
};
var passwordRules = [];
const LOWERCASE_ID = "lowercase";
const UPPERCASE_ID = "uppercase";
const NUMERIC_ID = "numeric";
const SPECIAL_CHARS_ID = "specialChars";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  setPasswordCriteria();

  while(!isCriteriaValid(passwordCriteria)){
    alert("You must select at least one character type.");
    setPasswordCriteria();
  }

  buildPasswordRules(passwordCriteria);
  var password = generatePassword(passwordCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

/* Generates a random index (from 0 up to the last index in passwordRules array) to choose a random char type. Once the char type is selected,
  a random character of that char type is appended to the password.*/
function generatePassword(passwordCriteria) {
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

// Set the password criteria based on user discretion
function setPasswordCriteria(){
  passwordCriteria.length = getPasswordLength();
  passwordCriteria.lowercaseFlag = getLowercaseFlag();
  passwordCriteria.uppercaseFlag = getUppercaseFlag();
  passwordCriteria.numericFlag = getNumericFlag();
  passwordCriteria.specialCharsFlag = getSpecialCharsFlag();
}

// Builds an array of char types that the user requested
function buildPasswordRules(passwordCriteria) {
  passwordRules = [];
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

// Prompts user for password length of 8 - 128 characters
function getPasswordLength() {
  let passwordLength;

  while( !passwordLength || passwordLength < 8 || passwordLength > 128 ){
    !passwordLength || alert("The password must be 8 - 128 chars long.");
    passwordLength = parseInt(prompt("How many characters would you like the password to be? (range 8 - 128 chars)"));
  }

  return passwordLength;
}

//Prompt user to use lowercase chars
function getLowercaseFlag() {
  return confirm("Use lowercase characters? ");
}

//Prompt user to use uppercase chars
function getUppercaseFlag(){
  return confirm("Use uppercase characters?");
}

//Prompt user to use numerical values
function getNumericFlag(){
  return confirm ("Use numbers?");
}

//Prompt user to use special chars
function getSpecialCharsFlag(){
  return confirm("Use special characters?");
}

//Ensure that at least one character type has been selected
function isCriteriaValid(passwordCriteria){
  return passwordCriteria.lowercaseFlag || passwordCriteria.uppercaseFlag 
  || passwordCriteria.numericFlag || passwordCriteria.specialCharsFlag;
}

//Random number generator
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);;
};

//Random lowercase char generator
function getRandomLowercaseChar(){
  return String.fromCharCode(randomNumber(97, 122));
}

//Random uppercase char generator
function getRandomUppercaseChar(){
  return String.fromCharCode(randomNumber(65, 90));
}

//Random special char generator
function getRandomSpecialChar(){
  return String.fromCharCode(randomNumber(33,47));
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
