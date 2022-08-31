/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   let start = (page * 9) - 9
   let end = page * 9
   const ul = document.querySelector(".student-list")

   ul.innerHTML = ""

   for (let i = 0; i < list.length; i++) {
      if (i >= start && i < end) {
         let studentBlock =
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
         ul.insertAdjacentHTML("beforeend", studentBlock)
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const ulPagination = document.querySelector(".link-list")
function addPagination(list) {
   numOfButtons = Math.ceil(list.length / 9)
   ulPagination.innerHTML = ""

   for (let i = 0; i < numOfButtons; i++) {
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.type = "button"
      button.textContent = `${i + 1}`
      li.appendChild(button)
      ulPagination.insertAdjacentElement("beforeend", li)
   }
   // Setting the first pagination button as active as default
   ulPagination.firstChild.firstChild.className = "active"
   ulPagination.addEventListener("click", (e) => {
      let btn = e.target
      let pageNum = parseInt(btn.textContent)
      if (btn.tagName === "BUTTON") {
         showPage(data, pageNum)
         for (let i = 0; i < ulPagination.children.length; i++) {
            if (pageNum === (i + 1)) {
               ulPagination.children[i].firstChild.className = "active"
            } else {
               ulPagination.children[i].firstChild.className = ""
            }
         }
      }
   })
}


// Call functions
showPage(data, 1)
addPagination(data)