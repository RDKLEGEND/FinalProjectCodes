console.log('welcome to javascript variable');


if(a!=null)
{
    //works no error we can access the variable a
    var a='dinesh';
    a='guruji';
}
console.log(a);
if(b!=null){
    let b='suresh';
    // throws error because we cant access variable declared inside loop from outside
    b='playboy';
}
console.log(b);
const c='vimal';
if(c!=null)
{
    // it will throw error because we cant change const varaiable value
    c='doctor';
}
console.log(c);