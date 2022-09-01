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
const ul = document.querySelector(".student-list")

function showPage(list, page) {
   let start = (page * 9) - 9
   let end = page * 9
   ul.innerHTML = ""
   // Loop through the student list
   for (let i = 0; i < list.length; i++) {
      // Check if the the student is to be displayed on the current page by checking if they are one of the nine students
      if (i >= start && i < end) {
         // Dynamically change the relevant information to properly display student blocks
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
         // Append each new student block to the student list section of the page
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
   // Loop through the number of buttons to be made and create correctly numbered button
   for (let i = 0; i < numOfButtons; i++) {
      // Create li and button elements and assign relevant tags
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.type = "button"
      // 'i + 1' is used because 'i' starts at 0, but the page numbers start at 1
      button.textContent = `${i + 1}`
      li.appendChild(button)
      // Append each new button after the previous button
      ulPagination.insertAdjacentElement("beforeend", li)
   }
   // Setting the first pagination button as 'active' as the default
   if (ulPagination.firstChild) {
      ulPagination.firstChild.firstChild.className = "active"
   }
   // Putting functionality when pagination buttons are clicked
   ulPagination.addEventListener("click", (e) => {
      let btn = e.target
      let pageNum = parseInt(btn.textContent)
      if (btn.tagName === "BUTTON") {
         // Displays page associated with the correct page number
         showPage(list, pageNum)
         // Loop through the page number buttons to see which should have the 'active' class
         for (let i = 0; i < ulPagination.children.length; i++) {
            // 'i + 1' is used because 'i' starts at 0, but the page numbers start at 1
            // If the button is associated with the correct page number, that button is assigned the 'active' class
            if (pageNum === (i + 1)) {
               ulPagination.children[i].firstChild.className = "active"
            } else {
               // If the button is not associated with the correct page number, that button's class attribute is cleared
               ulPagination.children[i].firstChild.className = ""
            }
         }
      }
   })
}


// Call functions
showPage(data, 1)
addPagination(data)

/*
Create the Search Bar
This builds HTML structure for the search bar dynamically
*/

const header = document.querySelector("header")
// Create label element and assign relevant tags
const label = document.createElement("label")
label.for = "search"
label.className = "student-search"
// Create span element and assign relevant tag
const span = document.createElement("span")
span.textContent = "Search by name"
// Create input element and assign relevant tags
const input = document.createElement("input")
input.id = "search"
input.placeholder = "Search by name..."
// Create button element and assign relevant tag
const button = document.createElement("button")
button.type = button
// Create img element and assign relevant tags
const img = document.createElement("img")
img.src = "img/icn-search.svg"
img.alt = "Search icon"
// Append elements to respective parent nodes
button.appendChild(img)
label.append(span, input, button)
header.appendChild(label)

/*
Create the `searchStudents` function within an event listener for input into the search bar
*/

input.addEventListener("input", (e) => {
   let studentList = []
   let searchTerm = input.value.toLowerCase()
   let studentName = ""
   if (searchTerm !== null) {
      // If there is input into search bar, loop through students
      for (let i = 0; i < data.length; i++) {
         // If the student's name includes the search term, they will be appended to the new student list to be displayed
         studentName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`
         // -1 will result if the search term is not present in the student name
         if (studentName.indexOf(searchTerm) !== -1) {
            studentList.push(data[i])
         }
      }
   } else {
      // If there is nothing in search, all data will be displayed
      studentList = data
   }
   // If the search term yields no results, 'no results' message will be displayed in place of the student list
   if (studentList.length === 0) {
      let noResults = `<h3>No results found</h3>`
      ul.innerHTML = ""
      ul.innerHTML = noResults
   } else {
      // If the search term yields results, display student blocks with matching students
      showPage(studentList, 1)
   }
   // Display correct pagination based on the number of search results
   addPagination(studentList)
})