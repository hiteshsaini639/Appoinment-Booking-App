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

// Add eventlistener to window
window.addEventListener('load',loadLocalData);

btn.addEventListener('click',submit);

let number=localStorage.getItem('number');
if(number==null)
number=1;
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

        let obj=JSON.stringify({
            firstName:fnameInput.value,
            lastName:lnameInput.value
        });

        localStorage.setItem(`obj ${number}`,obj);
        localStorage.setItem('number',`${++number}`);
        fnameInput.value='';
        lnameInput.value='';
    }

}

// Show localstorage data on reload
function loadLocalData(){
    let total=localStorage.getItem('number');
    if(number!=null){
        for(let i=1;i<total;i++){
            let jsonData=localStorage.getItem(`obj ${i}`);
            // if(jsonData==null) break;
            let data=JSON.parse(jsonData);
            let li=document.createElement('li');
            li.appendChild(document.createTextNode(`${data.firstName} ${data.lastName}`));
            userList.appendChild(li);
        }
    }
}