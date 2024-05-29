console.log(`Callback`);
let dk=(dinesh,bad)=>{
    console.log(dinesh);
    bad();
}
let callme=()=>{
    console.log('sivakasi');
}
dk('RDK',callme);
/*let data='dinesh;22';
let arr=new Array();
arr=data.split(";");
console.log(arr);*/