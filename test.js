const password = 'Lmao123@';
const email = 'lmaogmail.com';
let isCorrect = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
let isValid = /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

if (isCorrect.test(password) === true && isValid.test(email)) {
      return console.log(`Simon todo ta weno`);
} else {
    return console.error('No papi, ta malo todo');
}