"use strict";
const myform = document.querySelector(".my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const userList = document.querySelector("#users");
const msg = document.querySelector(".msg");
const body = document.querySelector("body");
const btn = document.querySelector(".btn");
const btndel = document.querySelector(".del");
const btnedit = document.querySelector(".edit");
const heading = document.querySelector("form h2");
let editing = false;
let editingLi;
const APIendpoint = "https://crudcrud.com/api/26d25124b882440693f15e1977744889";

myform.addEventListener("mouseover", () => {
  myform.classList.add("bg-dark");
});

myform.addEventListener("mouseout", () => {
  myform.classList.remove("bg-dark");
});

// for refreshing the page
window.addEventListener("DOMContentLoaded", getDataOnLoad);

// delete
userList.addEventListener("click", deteteData);

// edit
userList.addEventListener("click", editData);

// submit
btn.addEventListener("click", submit);

//show msg function
function showMsg(message, type) {
  msg.textContent = message;
  msg.classList.add(type);
  setTimeout(() => {
    msg.classList.remove(type);
    msg.textContent = "";
  }, 2000);
}

// show output on frontend
function showData(obj) {
  const createTextNode = `<li class="listItem" id="${obj._id}" name="${obj.name}" email="${obj.email}" >Name: ${obj.name} Email: ${obj.email}<button class="btn1 del">Delete</button><button class="btn1 edit">Edit</button></li>`;
  userList.innerHTML += createTextNode;
}

//submit
function submit(event) {
  event.preventDefault();

  // showing error messege if input is empty
  if (nameInput.value === "" || emailInput.value === "") {
    showMsg("Please enter all field ❌", "error");
  } else {
    // creating object from user detail
    let obj = {
      name: nameInput.value,
      email: emailInput.value,
    };

    // if user input duplicate email id
    let liArray = document.querySelectorAll(".listItem");
    liArray.forEach((li) => {
      if (li.getAttribute("email") == emailInput.value) {
        editing = true;
        editingLi = li;
      }
    });

    if (editing) {
      //Edit User
      axios
        .put(`${APIendpoint}/UserDetails/${editingLi.id}`, obj)
        .then((res) => {
          // showing success messege on submitting
          showMsg("User Edited ✅", "success");
          editingLi.innerHTML = `Name: ${obj.name} Email: ${obj.email}<button class="btn1 del">Delete</button><button class="btn1 edit">Edit</button>`;
          editingLi.setAttribute("name", obj.name);
          editingLi.setAttribute("email", obj.email);
          editing = false;
          heading.innerHTML = "Add User";
        })
        .catch((err) => showMsg(err.message, "error"));
    } else {
      //Add user
      axios
        .post(`${APIendpoint}/UserDetails`, obj)
        .then((res) => {
          // showing success messege on submitting
          showMsg("User added ✅", "success");
          showData(res.data);
        })
        .catch((err) => showMsg(err.message, "error"));
    }

    // clearing data
    nameInput.value = "";
    emailInput.value = "";
  }
}

// Show data on reload
function getDataOnLoad() {
  axios
    .get(`${APIendpoint}/UserDetails`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        showData(res.data[i]);
      }
    })
    .catch((err) => showMsg(err.message, "error"));
  editing = false;
  heading.innerHTML = "Add User";
}

// Delete data from frontend and backend
function deleteDataFromFrontAndBack(li) {
  userList.removeChild(li);
  return axios.delete(`${APIendpoint}/UserDetails/${li.id}`);
}

// Delete data
function deteteData(e) {
  if (e.target.classList.contains("del")) {
    if (confirm("Are You Sure?")) {
      deleteDataFromFrontAndBack(e.target.parentElement)
        .then(() => showMsg("Deleted", "success"))
        .catch((err) => showMsg(err.message, "error"));
    }
  }
}

//Edit data
function editData(e) {
  if (e.target.classList.contains("edit")) {
    editingLi = e.target.parentElement;
    editing = true;
    heading.innerHTML = "Edit User";
    nameInput.value = editingLi.getAttribute("name");
    emailInput.value = editingLi.getAttribute("email");
  }
}
