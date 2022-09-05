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

// for refreshing the page
window.addEventListener('load',loadLocalData);

// delete
userList.addEventListener('click',detetedata);

// edit
userList.addEventListener('click',editData);

// submit
btn.addEventListener('click',submit);

//show msg function
function showMsg(message,type){
    msg.textContent=message;
        msg.classList.add(type);
        setTimeout(()=>{msg.classList.remove(type);
        msg.textContent=''},2000);
}

// show output on frontend
function showData(obj){
    const createTextNode=`<li class="listItem">Name: ${obj.name} Email: ${obj.email}<button class="btn1 del">Delete</button><button class="btn1 edit">Edit</button></li>`;
    userList.innerHTML+=createTextNode;
}

function submit(event){
    event.preventDefault();

    // showing error messege if input is empty
    if(nameInput.value==='' || emailInput.value===''){
        showMsg("Please enter all field ❌","error");
    }
    else{
        // showing success messege on submitting
        showMsg("Expenses added ✅","success");

        // creating object from user detail 
        let obj={
            name:nameInput.value,
            email:emailInput.value
        };

        //Adding data to localStorage
        localStorage.setItem(`${obj.email}`,JSON.stringify(obj));

        /* if user input duplicate email id, new value will replace the older one in localStorage 
        but on frontend older one will be removed only when we refresh the page */
        // but i am still adding a functionanily to remove older obj on frontend
        let liArray =document.querySelectorAll('.listItem');
        liArray.forEach((li)=>{
            let liTextArray=li.firstChild.textContent.split(' ');
            if(liTextArray[liTextArray.length-1]==emailInput.value)
            li.remove();
        });


        // Adding data to frontend
        showData(obj);

        // clearing data
        nameInput.value='';
        emailInput.value='';
    }

}

// Show localstorage data on reload
function loadLocalData(){
        for(let i=0;i<localStorage.length;i++){
            let jsonData=localStorage.getItem(localStorage.key(i));
            let data=JSON.parse(jsonData);
            
            showData(data);
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