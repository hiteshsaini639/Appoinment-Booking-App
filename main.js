"use strict"
const myform=document.querySelector(".my-form");
const nameInput=document.querySelector("#name");
const emailInput=document.querySelector("#email");
const userList=document.querySelector("#users");
const msg=document.querySelector(".msg");
const body=document.querySelector("body");
const btn=document.querySelector(".btn");
const btndel=document.querySelector('.del');
const btnedit=document.querySelector('.edit');

myform.addEventListener('mouseover',()=>{
    myform.classList.add("bg-dark");
});

myform.addEventListener('mouseout',()=>{
    myform.classList.remove("bg-dark")
});

// Add eventlistener to window
window.addEventListener('load',loadLocalData);

// delete
userList.addEventListener('click',detetedata);

// edit
userList.addEventListener('click',editData);

btn.addEventListener('click',submit);

function submit(event){
    event.preventDefault();

    if(nameInput.value==='' || emailInput.value===''){
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
            name:nameInput.value,
            email:emailInput.value
        });

        localStorage.setItem(`${emailInput.value}`,obj);

        nameInput.value='';
        emailInput.value='';
    }

}

// Show localstorage data on reload
function loadLocalData(){
        for(let i=0;i<localStorage.length;i++){
            let jsonData=localStorage.getItem(localStorage.key(i));
            let data=JSON.parse(jsonData);
            let li=document.createElement('li');

            let btndel =document.createElement('button');
            let btnedit =document.createElement('button');

            btndel.className='btn1 del';
            btnedit.className='btn1 edit';

            btndel.appendChild(document.createTextNode('Delete'));
            btnedit.appendChild(document.createTextNode('Edit'));

            li.appendChild(document.createTextNode(`Name:- ${data.name} Email:- ${data.email}`));
            li.appendChild(btndel);
            li.appendChild(btnedit);
            userList.appendChild(li);
            
        }
    }

// Delete data
function detetedata(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
            let textArray=e.target.parentElement.firstChild.textContent.split(' ');
            localStorage.removeItem(textArray[textArray.length-1]);
            userList.removeChild(e.target.parentElement);
        }
    }
}

// Edit data
function editData(e){
    if(e.target.classList.contains('edit')){
        let textArray=e.target.parentElement.firstChild.textContent.split(' ');
        let obj=JSON.parse(localStorage.getItem(textArray[textArray.length-1]));
        nameInput.value=obj.name;
        emailInput.value=obj.email;
        localStorage.removeItem(textArray[textArray.length-1]);
        userList.removeChild(e.target.parentElement);
    }
}