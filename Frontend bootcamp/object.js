console.log('Welcome to object practice');

let obj={
dinesh:21,
    nideesh:22,
    priya:23,
    anandi:24,
    hobby:['games','silence','observing']
};
console.log(obj);
console.log(JSON.stringify(obj));
let ob=JSON.stringify(obj);
console.log(JSON.parse(ob));
obj.dinesh=10;
console.log(obj);


