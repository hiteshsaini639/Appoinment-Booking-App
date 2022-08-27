"use strict"
const myform=document.querySelector(".my-form");
const fnameInput=document.querySelector("#fname");
const lnameInput=document.querySelector("#lname");
const userList=document.querySelector("#users");
const msg=document.querySelector(".msg");
const body=document.querySelector("body");
const btn=document.querySelector(".btn");

myform.addEventListener('mouseover',()=>{
    myform.classList.add("bg-dark");
});

myform.addEventListener('mouseout',()=>{
    myform.classList.remove("bg-dark")
});

btn.addEventListener('click',submit);
let number=1;
function submit(event){
    event.preventDefault();

    if(fnameInput.value==='' || lnameInput.value===''){
        msg.classList.add("error");
        msg.textContent="Please enter all field";
        setTimeout(function(){
        msg.classList.remove("error");
        msg.textContent='';},3000);
    }
    else{
        msg.textContent="Submitted";
        msg.classList.add('success');
        setTimeout(()=>{msg.classList.remove('success');
        msg.textContent='';},1000);

        localStorage.setItem(`First name ${number}`,`${fnameInput.value}`);
        localStorage.setItem(`Last Name ${number}`,`${lnameInput.value}`);
        ++number;
        fnameInput.value='';
        lnameInput.value='';
    }
}