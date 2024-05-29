console.log('welcome to datatype lesson');
let a=66;
//in js no need to declare the variable datatype
console.log('type of variable a is '+typeof a);

let b='77';
console.log('type of variable b is '+typeof b);

let c=true;
console.log('type of variable c is '+typeof c);

let d={};
console.log('type of variable d is '+typeof d);

let e=[];
console.log('type of variable e array is '+typeof e);

let f;
console.log('type of variable f is '+typeof f);

let g=null;
//in js type of undefined is object
console.log('type of variable g is '+typeof g);

let h='dk'+10+11;
console.log(h);
//output is dk1011 cause js takes input from left to right

let i=22+10+'dk';
console.log(i);
//output is 32dk

//js always considers + as concat
let j='20';
let k=10;
console.log(j-k);
//output is 10
