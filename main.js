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

myform.addEventListener("mouseover", () => {
  myform.classList.add("bg-dark");
});

myform.addEventListener("mouseout", () => {
  myform.classList.remove("bg-dark");
});

// for refreshing the page
window.addEventListener("load", getAPIcall);

// delete
userList.addEventListener("click", deteteData);

// edit
//userList.addEventListener("click", editData);

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
  const createTextNode = `<li class="listItem" id="${obj._id}">Name: ${obj.name} Email: ${obj.email}<button class="btn1 del">Delete</button><button class="btn1 edit">Edit</button></li>`;
  userList.innerHTML += createTextNode;
}

function submit(event) {
  event.preventDefault();

  // showing error messege if input is empty
  if (nameInput.value === "" || emailInput.value === "") {
    showMsg("Please enter all field ❌", "error");
  } else {
    // if user input duplicate email id
    let liArray = document.querySelectorAll(".listItem");
    liArray.forEach((li) => {
      let liTextArray = li.firstChild.textContent.split(" ");
      if (liTextArray[liTextArray.length - 1] == emailInput.value) {
        deleteDataFromFrontAndBack(li)
          .then(() => showMsg("User data replaced", "success"))
          .catch((err) => showMsg(err.message, "error"));
      }
    });

    // creating object from user detail
    let obj = {
      name: nameInput.value,
      email: emailInput.value,
    };

    // Sending data to backend API
    axios
      .post(
        "https://crudcrud.com/api/128c6fbbcaa84272b0df3724c1c7b624/UserDetails",
        obj
      )
      .then((res) => {
        // showing success messege on submitting
        showMsg("User added ✅", "success");
        showData(res.data);
      })
      .catch((err) => showMsg(err.message, "error"));

    // clearing data
    nameInput.value = "";
    emailInput.value = "";
  }
}

// Show API call data on reload
function getAPIcall() {
  axios
    .get(
      "https://crudcrud.com/api/128c6fbbcaa84272b0df3724c1c7b624/UserDetails"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        showData(res.data[i]);
      }
    })
    .catch((err) => showMsg(err.message, "error"));
}

// Delete data from frontend
function deleteDataFromFrontAndBack(li) {
  userList.removeChild(li);
  return axios.delete(
    `https://crudcrud.com/api/128c6fbbcaa84272b0df3724c1c7b624/UserDetails/${li.id}`
  );
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

// Edit data
// function editData(e) {
//   if (e.target.classList.contains("edit")) {
//     let textArray = e.target.parentElement.firstChild.textContent.split(" ");
//     let obj = JSON.parse(localStorage.getItem(textArray[textArray.length - 1]));
//     nameInput.value = obj.name;
//     emailInput.value = obj.email;
//     localStorage.removeItem(textArray[textArray.length - 1]);
//     userList.removeChild(e.target.parentElement);
//   }
// }
