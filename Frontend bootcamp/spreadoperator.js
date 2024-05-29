console.log('SpreadOperator');
let num1=[1,2,3];
let num2=[4,5,6];
let combinedarray=[...num1,...num2];
console.log(num1);
console.log(num2);
console.log(combinedarray);
let str='RDK is a goodboy';
console.log(...str);
let obj1={
nideesh:23
};
let obj2={
dinesh:21
};
let combinedobject={
...obj1,
...obj2
};
console.log(obj1);
console.log(obj2);
console.log(combinedobject);
let fruit=['grapes','apple','mango'];
//let favfruit=fruit;
let favfruit=[...fruit];
fruit.push('chikoo');
console.log(favfruit);