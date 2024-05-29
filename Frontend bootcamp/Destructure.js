console.log('Destructure');
let fruit=['Mango','cherry','apple','orange','banana','melons'];
let myfavfruit=fruit[0];//standard approach storing value using index
console.log(myfavfruit);
let[a,b,c, ,...d]=fruit;//destructure approach
// using space after c skips one value
console.log(a);
console.log(b);
console.log(c);
console.log(d);//stores all value that are not stored in previous value
let[ , , , , ,g]=fruit;
console.log(g);

//destructuring object

let obj={
    cat:1,
    cow:2,
    dog:3,
    horse:4
};
let deobj=obj.dog;
console.log(deobj);

let{cat,cow:i,horse:j}=obj;
console.log(cat);
console.log(i);
console.log(j);