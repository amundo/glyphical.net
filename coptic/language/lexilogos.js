// copyright lexilogos.com 
var car;

// function transcrire() {
// car = document.conversion.saisie.value;

class Car{
  constructor(){
    this.rules = [] 
  }
  replace(regexp, replacement){
    this.rules.push([regexp.toString().slice(1,-2), replacement])
    return this
  }

  log(){
    console.log(JSON.stringify(this.rules, null, 2))
  }
}
car = new Car()

// variante
car = car.replace(/=/g, "̄");
car = car.replace(/̄̄/g, "︤");
car = car.replace(/︤̄/g, "︦");
car = car.replace(/︦̄/g, "︥");
car = car.replace(/︥̄/g, "");

car = car.replace(/\'/g, "̀");
car = car.replace(/̀̀/g, "");


car = car.replace(/\*/g, "");
car = car.replace(/\//g, "");
car = car.replace(/ⲧh/g, "ⲑ");
car = car.replace(/ⲑ&/g, "");
car = car.replace(/ⲕh/g, "ⲭ");
car = car.replace(/ⲭ&/g, "");
car = car.replace(/ⲡh/g, "ⲫ");
car = car.replace(/ⲫ&/g, "");
car = car.replace(/ⲡs/g, "ⲯ");
car = car.replace(/ⲯ&/g, "");
car = car.replace(/ⲥ_/g, "ⲋ");
car = car.replace(/c/g, "ϭ");
car = car.replace(/ϭ&/g, "");
car = car.replace(/a/g, "ⲁ");
car = car.replace(/ⲁ&/g, "");
car = car.replace(/b/g, "ⲃ");
car = car.replace(/ⲃ&/g, "");
//  car = car.replace(/&/g, "");
car = car.replace(/g/g, "ⲅ");
car = car.replace(/ⲅ&/g, "");
car = car.replace(/d/g, "ⲇ");
car = car.replace(/ⲇ&/g, "");
car = car.replace(/e/g, "ⲉ");
car = car.replace(/ⲉ&/g, "");
car = car.replace(/z/g, "ⲍ");
car = car.replace(/ⲍ&/g, "");
car = car.replace(/[èējq]/g, "ⲏ");
car = car.replace(/ⲏ&/g, "");
car = car.replace(/i/g, "ⲓ");
car = car.replace(/ⲓ&/g, "");
car = car.replace(/k/g, "ⲕ");
car = car.replace(/ⲕ&/g, "");
car = car.replace(/l/g, "ⲗ");
car = car.replace(/ⲗ&/g, "");
car = car.replace(/m/g, "ⲙ");
car = car.replace(/ⲙ&/g, "");
car = car.replace(/n/g, "ⲛ");
car = car.replace(/ⲛ&/g, "");
car = car.replace(/x/g, "ⲝ");
car = car.replace(/ⲝ&/g, "");
car = car.replace(/o/g, "ⲟ");
car = car.replace(/ⲟ&/g, "");
car = car.replace(/p/g, "ⲡ");
car = car.replace(/ⲡ&/g, "");
car = car.replace(/r/g, "ⲣ");
car = car.replace(/ⲣ&/g, "");
car = car.replace(/s/g, "ⲥ");
car = car.replace(/ⲥ&/g, "");
car = car.replace(/t/g, "ⲧ");
car = car.replace(/ⲧ&/g, "");
car = car.replace(/[uy]/g, "ⲩ");
car = car.replace(/ⲩ&/g, "");
car = car.replace(/[wō]/g, "ⲱ");
car = car.replace(/ⲱ&/g, "");
car = car.replace(/ⲥh/g, "ϣ");
car = car.replace(/ϣ&/g, "");
car = car.replace(/ⲇ_/g, "ϫ");
car = car.replace(/ϫ_/g, "ⲇ");
car = car.replace(/ϫ&/g, "");
car = car.replace(/ⲧ_/g, "ϯ");
car = car.replace(/ϯ_/g, "ⲑ");
car = car.replace(/ⲑ_/g, "ⲧ");
car = car.replace(/ϯ&/g, "");
car = car.replace(/f/g, "ϥ");
car = car.replace(/ϥ&/g, "");
car = car.replace(/h/g, "ϩ");
car = car.replace(/ϩ&/g, "");
car = car.replace(/ϩϩ/g, "ϧ");
car = car.replace(/ϧ&/g, "");
car = car.replace(/ⲦH/g, "Ⲑ");
car = car.replace(/ⲔH/g, "Ⲭ");
car = car.replace(/ⲠH/g, "Ⲫ");
car = car.replace(/ⲠS/g, "Ⲯ");
car = car.replace(/C/g, "Ϭ");
car = car.replace(/A/g, "Ⲁ");
car = car.replace(/B/g, "Ⲃ");
car = car.replace(/G/g, "Ⲅ");
car = car.replace(/D/g, "Ⲇ");
car = car.replace(/E/g, "Ⲉ");
car = car.replace(/Z/g, "Ⲍ");
car = car.replace(/[ÈĒJ]/g, "Ⲏ");
car = car.replace(/I/g, "Ⲓ");
car = car.replace(/K/g, "Ⲕ");
car = car.replace(/L/g, "Ⲗ");
car = car.replace(/M/g, "Ⲙ");
car = car.replace(/N/g, "Ⲛ");
car = car.replace(/X/g, "Ⲝ");
car = car.replace(/O/g, "Ⲟ");
car = car.replace(/P/g, "Ⲡ");
car = car.replace(/R/g, "Ⲣ");
car = car.replace(/S/g, "Ⲥ");
car = car.replace(/Ⲥ_/g, "Ⲋ");
car = car.replace(/T/g, "Ⲧ");
car = car.replace(/[UY]/g, "Ⲩ");
car = car.replace(/[WŌ]/g, "Ⲱ");
car = car.replace(/ⲤH/g, "Ϣ");
car = car.replace(/Ⲇ_/g, "Ϫ");
car = car.replace(/Ϫ_/g, "Ⲇ");
car = car.replace(/Ⲧ_/g, "Ϯ");
car = car.replace(/Ϯ_/g, "Ⲑ");
car = car.replace(/Ⲑ_/g, "Ⲧ");
car = car.replace(/F/g, "Ϥ");
car = car.replace(/H/g, "Ϩ");
car = car.replace(/ϨϨ/g, "Ϧ");
// cas particulier
car = car.replace(/ⲋ&/g, "");
// trait long
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");
car = car.replace(/&/g, "");


// diac grave
car = car.replace(/ⲁ"/g, "");
car = car.replace(/ⲃ"/g, "");
car = car.replace(/ⲅ"/g, "");
car = car.replace(/ⲇ"/g, "");
car = car.replace(/ⲉ"/g, "");
car = car.replace(/ⲍ"/g, "");
car = car.replace(/ⲏ"/g, "");
car = car.replace(/ⲑ"/g, "");
car = car.replace(/ⲓ"/g, "");
car = car.replace(/ⲕ"/g, "");
car = car.replace(/ⲗ"/g, "");
car = car.replace(/ⲙ"/g, "");
car = car.replace(/ⲛ"/g, "");
car = car.replace(/ⲝ"/g, "");
car = car.replace(/ⲟ"/g, "");
car = car.replace(/ⲡ"/g, "");
car = car.replace(/ⲣ"/g, "");
car = car.replace(/ⲥ"/g, "");
car = car.replace(/ⲧ"/g, "");
car = car.replace(/ⲩ"/g, "");
car = car.replace(/ⲫ"/g, "");
car = car.replace(/ⲭ"/g, "");
car = car.replace(/ⲯ"/g, "");
car = car.replace(/ⲱ"/g, "");
car = car.replace(/ϣ"/g, "");
car = car.replace(/ϩ"/g, "");
car = car.replace(/ϯ"/g, "");
car = car.replace(/ϫ"/g, "");
car = car.replace(/ϭ"/g, "");
car = car.replace(/ϥ"/g, "");
car = car.replace(/ϧ"/g, "");

// diac circ
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");

// diacr dot
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");
car = car.replace(/"/g, "");

// normal
car = car.replace(/"/g, "ⲁ");
car = car.replace(/"/g, "ⲃ");
car = car.replace(/"/g, "ⲅ");
car = car.replace(/"/g, "ⲇ");
car = car.replace(/"/g, "ⲉ");
car = car.replace(/"/g, "ⲍ");
car = car.replace(/"/g, "ⲏ");
car = car.replace(/"/g, "ⲑ");
car = car.replace(/"/g, "ⲓ");
car = car.replace(/"/g, "ⲕ");
car = car.replace(/"/g, "ⲗ");
car = car.replace(/"/g, "ⲙ");
car = car.replace(/"/g, "ⲛ");
car = car.replace(/"/g, "ⲝ");
car = car.replace(/"/g, "ⲟ");
car = car.replace(/"/g, "ⲡ");
car = car.replace(/"/g, "ⲣ");
car = car.replace(/"/g, "ⲥ");
car = car.replace(/"/g, "ⲧ");
car = car.replace(/"/g, "ⲩ");
car = car.replace(/"/g, "ⲫ");
car = car.replace(/"/g, "ⲭ");
car = car.replace(/"/g, "ⲯ");
car = car.replace(/"/g, "ⲱ");
car = car.replace(/"/g, "ϣ");
car = car.replace(/"/g, "ϩ");
car = car.replace(/"/g, "ϯ");
car = car.replace(/"/g, "ϫ");
car = car.replace(/"/g, "ϭ");
car = car.replace(/"/g, "ϥ");
car = car.replace(/"/g, "ϧ");


// startPos = document.conversion.saisie.selectionStart;
// endPos = document.conversion.saisie.selectionEnd;

// beforeLen = document.conversion.saisie.value.length;
// afterLen = car.length;
// adjustment = afterLen - beforeLen;

// document.conversion.saisie.value = car;

// document.conversion.saisie.selectionStart = startPos + adjustment;
// document.conversion.saisie.selectionEnd = endPos + adjustment;

// var obj = document.conversion.saisie;
// obj.focus();
// obj.scrollTop = obj.scrollHeight;
// }

car.log()