// Define the array of students
const students = document.querySelectorAll('.student-item'),

// Define the page element. We'll need to append the pagination element to it
page = document.querySelector('.page'),

// Defining the structure of the pagnation elements
pageinationDiv = document.createElement('div'),
pageinationList = document.createElement('ul'),


// Split the array of students into groups of ten
grouper = (array) => {
    let groups = [],
    group = [];
    // We want to push 10 students into the group array
    for (let i = 0; i < array.length; i++) {
        group.push(students[i])
        // When the group array length is equal to ten, we want to push it to the groups array and start over
        if(group.length === 10) {
            groups.push(group);
            group = [];
        }
    }
    // Whatever remains in the group array shall get pushed into the groups array and return the array
    groups.push(group);
    return groups;
};
// We're calling the grouper function to generate the arrays and store them within the studentGroups variable
let studentGroups = grouper(students);

// Intially, we want to hide all but the first ten students.
// However, if the list of students is less than 10, we still need them displayed

if(students.length > 10) {
    for(i = 1; i < studentGroups.length; i++) {
        studentGroups[i].forEach(student => {
            student.style.display = "none";
        });
    }
}

// We're about to append the pagination element to the DOM, before this add the class name
pageinationDiv.className = 'pagination';
page.appendChild(pageinationDiv);

// Append the unordered list to the DOM as well

pageinationDiv.appendChild(pageinationList);

// When the page loads, your program should hide all but the first 10 students in the list.

// Look at the HTML in the example-meets.html on lines 119-137 -- this is an example of the markup you'll need to add dynamically to the index.html page to create pagination links.

// Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.

// When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

// Your program should work for any number of students. There are 54 students in index.html, but you can test your code by adding the JavaScript file your write to the other lists of students we’ve provided in the student-list-examples folder.

// Include a search component so that a user could search for a particular student or students. See the file example-exceeds.html and lines 16-19 for what the markup for the search component should look like.

// When the "Search" button is clicked, the list of students is filtered to match the search. For example if the name Phillip is typed into the box list all students whose name or email includes Phillip.

// If no matches are found by the search, include a message in the HTML to tell the user there are no matches.