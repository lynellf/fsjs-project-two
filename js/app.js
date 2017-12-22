// Define the array of students
const students = document.querySelectorAll('.student-item'),

// Define the page element. We'll need to append the pagination element to it
page = document.querySelector('.page'),

// Define the div element for holding the search bar
pageHeader = document.querySelector('.page-header'),

// Defining the structure of the pagnation elements
paginationDiv = document.createElement('div'),
paginationList = document.createElement('ul'),

// Defining the structure of the search elements
searchContainer = document.createElement('div'),
searchBar = document.createElement('input'),
searchSubmit = document.createElement('button'),

// Split the array of students into groups of ten
grouper = (array) => {
    let groups = [],
    group = [];
    // We want to push 10 students into the group array
    for (let i = 0; i < array.length; i++) {
        group.push(array[i])
        // When the group array length is equal to ten, we want to push it to the groups array and start over
        if(group.length === 10) {
            groups.push(group);
            group = [];
        }
    }
    // Whatever remains in the group array shall get pushed into the groups array and return the array
    groups.push(group);
    return groups;
},

// We'll need to create links to display each group students
// The list item links shall correspond to the each array item in the studentGroup
linkGenerator = (position) => {
    for (let i = 0; i < studentGroups.length; i++) {
        const listItem = document.createElement('li'),
        listLink = document.createElement('a');
        listItem.appendChild(listLink);
        if (i === position ) {
            listLink.className = 'active';
        }
        listLink.textContent = `${i + 1}`;
        listLink.setAttribute('href', '#');
        paginationList.appendChild(listItem);
    }
},

// Preparing search elements for appending to the DOM
generateSearch = () => {
    searchContainer.className = 'student-search';
    searchBar.setAttribute('placeholder', 'Search for students...');
    searchSubmit.textContent = 'Search';
    pageHeader.appendChild(searchContainer);
    searchContainer.appendChild(searchBar);
    searchContainer.appendChild(searchSubmit);
},

search = () => {
    // We'll need to grab the names of each of the students and store them in a format comparable with a query
    const studentNames = document.querySelectorAll('.student-details > h3'),
        query = searchBar.value.toLowerCase();
    let results = [],
        studentArrays;

    for (let i = 0; i < students.length; i++) {
        let studentName = studentNames[i].textContent;
        if (studentName.indexOf(query) > -1) {
            results.push(students[i]);
        }
    }
    studentArrays = grouper(results)
    filterStudents(studentArrays);
},

// Intially, we want to hide all but the first ten students.
// However, if the list of students is less than 10, we still need them displayed
filterStudents = (array) => {
    const errorMsg = document.createElement('p');
    if (array[0].length >= 10) {
        for (let i = 1; i < array.length; i++) {
            array[i].forEach(student => {
                student.style.display = "none";
            });
        }
    } else if(array[0].length > 0) {
        students.forEach(student => {
            student.style.display = 'none';
        });

        for (let i = 0; i < array.length; i++) {
            array[i].forEach(student => {
                student.style.display = '';
            });
        }
    } else {
        students.forEach(student => {
            student.style.display = 'none';
        });
        errorMsg.className = 'error';
        errorMsg.textContent = 'There\'s nothing here.';
        page.insertBefore(errorMsg, paginationDiv);
    }
};

// We're calling the grouper function to generate the arrays and store them within the studentGroups variable
let studentGroups = grouper(students),

// We'll want the index value of the current array of students displayed
activeArray = 0;

filterStudents(studentGroups);

// We're about to append the pagination element to the DOM, before this add the class name
paginationDiv.className = 'pagination';
page.appendChild(paginationDiv);

// Append the unordered list to the DOM as well
paginationDiv.appendChild(paginationList);

// Append the list of links for navigation 
linkGenerator(0);

// When the user clicks the link, the corresponding array of students is displayed
paginationDiv.addEventListener('click', (event)=> {
    const listItems = document.querySelectorAll('a');
    let arrayValue = parseInt(event.target.textContent) - 1,
        initialArrays = grouper(students),
        chosenArray = initialArrays.splice(arrayValue, 1);

    if (event.target.tagName === 'A') {
        chosenArray.forEach(array => {
            for (let i = 0; i < array.length; i++) {
                array[i].style.display = '';
            }
        });

        initialArrays.forEach(array => {
            for(let i = 0; i < array.length; i++) {
                array[i].style.display = 'none';
            }
        });

        // We want whichever array is displayed to have its corresponding page link as active
        listItems.forEach(item => {
            item.className = ''
        });
        listItems[arrayValue].className = 'active';
    }
    
    event.preventDefault();
});

// Appending search elements to the DOM now...
generateSearch();

// When the user clicks the search button, the matching students shall display
searchSubmit.addEventListener('click', () => {
    search();
});

// When the user presses return on the keyboard, the matching students shall display
searchBar.addEventListener('keydown', (event) => {
    if (13 === event.keyCode) {
        search();
    }
})


// When the page loads, your program should hide all but the first 10 students in the list.

// Look at the HTML in the example-meets.html on lines 119-137 -- this is an example of the markup you'll need to add dynamically to the index.html page to create pagination links.

// Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.

// When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

// Your program should work for any number of students. There are 54 students in index.html, but you can test your code by adding the JavaScript file your write to the other lists of students we’ve provided in the student-list-examples folder.

// Include a search component so that a user could search for a particular student or students. See the file example-exceeds.html and lines 16-19 for what the markup for the search component should look like.

// When the "Search" button is clicked, the list of students is filtered to match the search. For example if the name Phillip is typed into the box list all students whose name or email includes Phillip.

// If no matches are found by the search, include a message in the HTML to tell the user there are no matches.