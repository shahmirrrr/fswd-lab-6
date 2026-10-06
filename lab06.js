/* =====================================================
   LAB 06
   Full Stack Web Development - CS-301L

   TASK 1 - Course Planner
   TASK 2 - Live Student ID Card
   TASK 3 - Registration Validation
   TASK 4 - Student Dashboard
===================================================== */


/* =====================================================
   HELPER FUNCTION

   Instead of using alert(), this function creates
   Bootstrap messages inside the webpage.
===================================================== */

function showMessage(id, type, message) {

  // Find the HTML element where message should appear
  const box = document.getElementById(id);

  // Clear previous message
  box.textContent = "";

  // Create a new div dynamically
  const alert = document.createElement("div");

  // Bootstrap alert classes
  alert.className =
    `alert alert-${type} py-2`;

  // textContent is used because it is safe
  // for displaying text.
  alert.textContent = message;

  // Put message inside the page
  box.appendChild(alert);
}



/* =====================================================
   TASK 1
   INTERACTIVE COURSE PLANNER

   Main concepts:
   - DOM selection
   - createElement()
   - appendChild()
   - addEventListener()
   - Event delegation
   - classList.toggle()
   - querySelectorAll()
===================================================== */


/* ---------- SELECT ELEMENTS ---------- */

// Select the course input
const courseInput =
  document.getElementById("courseInput");

// Select the UL where courses will appear
const courseList =
  document.getElementById("courseList");



/* ---------- UPDATE COUNTERS ---------- */

function updateCourseCounters() {

  // Find ALL li elements inside courseList
  const allCourses =
    courseList.querySelectorAll("li");

  // Find only li elements that have
  // the class "completed"
  const completedCourses =
    courseList.querySelectorAll(
      "li.completed"
    );

  // Total = total li elements
  document.getElementById(
    "totalCourses"
  ).textContent =
    allCourses.length;


  // Completed = li.completed elements
  document.getElementById(
    "completedCourses"
  ).textContent =
    completedCourses.length;


  // Remaining =
  // total - completed
  document.getElementById(
    "remainingCourses"
  ).textContent =
    allCourses.length -
    completedCourses.length;
}



/* ---------- ADD COURSE ---------- */

function addCourse() {

  // .value gets text from input
  // .trim() removes spaces before/after text
  const courseName =
    courseInput.value.trim();


  /* Check empty input */

  if (courseName === "") {

    showMessage(
      "courseMessage",
      "danger",
      "Course name cannot be empty."
    );

    courseInput.focus();

    return;
  }


  /* Check duplicate course

     querySelectorAll() gets every course-name.

     [...] converts NodeList into an array.

     some() checks whether AT LEAST ONE course
     has the same name.

     toLowerCase() makes comparison
     case-insensitive.

     Example:

     Web Development
     web development

     will be treated as the same course.
  */

  const duplicate =
    [
      ...courseList.querySelectorAll(
        ".course-name"
      )
    ].some((course) =>

      course.textContent
        .trim()
        .toLowerCase()

      ===

      courseName.toLowerCase()

    );


  if (duplicate) {

    showMessage(
      "courseMessage",
      "danger",
      "Course already exists."
    );

    courseInput.focus();

    return;
  }



  /* CREATE NEW LI */

  const li =
    document.createElement("li");


  li.className =
    "list-group-item d-flex justify-content-between align-items-center";



  /* Create course name span */

  const nameSpan =
    document.createElement("span");

  nameSpan.className =
    "course-name";

  // User text is inserted safely
  nameSpan.textContent =
    courseName;



  /* Create delete button */

  const deleteButton =
    document.createElement("button");

  deleteButton.type =
    "button";

  deleteButton.className =
    "btn btn-sm btn-outline-danger delete-course";

  deleteButton.textContent =
    "Delete";



  /* Put span and button inside li */

  li.appendChild(nameSpan);

  li.appendChild(deleteButton);



  /* Put li inside UL */

  courseList.appendChild(li);



  /* Clear input */

  courseInput.value = "";


  /* Return cursor to input */

  courseInput.focus();


  showMessage(
    "courseMessage",
    "success",
    "Course added successfully."
  );


  updateCourseCounters();
}



/* ---------- ADD BUTTON CLICK ---------- */

document
  .getElementById("addCourseBtn")
  .addEventListener(
    "click",
    addCourse
  );



/* =====================================================
   EVENT DELEGATION

   Instead of adding a click listener to every new
   delete button, we put ONE listener on the UL.

   Click events from children bubble to the UL.

   event.target tells us what was actually clicked.
===================================================== */

courseList.addEventListener(
  "click",
  (event) => {


    /* DELETE BUTTON */

    if (
      event.target.classList.contains(
        "delete-course"
      )
    ) {

      // closest("li") finds the parent course
      const course =
        event.target.closest("li");

      // remove() deletes it from DOM
      course.remove();

      updateCourseCounters();

      return;
    }



    /* COURSE NAME CLICK */

    if (
      event.target.classList.contains(
        "course-name"
      )
    ) {

      const course =
        event.target.closest("li");


      // toggle adds the class if missing,
      // removes it if already there.
      course.classList.toggle(
        "completed"
      );


      updateCourseCounters();
    }

  }
);



/* ---------- CLEAR ALL ---------- */

document
  .getElementById("clearCoursesBtn")
  .addEventListener(
    "click",
    () => {

      // Removes all children from UL
      courseList.textContent = "";

      updateCourseCounters();

    }
  );



/* ---------- HIGHLIGHT LONGEST ---------- */

document
  .getElementById("highlightLongestBtn")
  .addEventListener(
    "click",
    () => {


      // Get all course li elements
      const courses =
        [
          ...courseList.querySelectorAll(
            "li"
          )
        ];


      if (courses.length === 0) {

        showMessage(
          "courseMessage",
          "danger",
          "No courses available."
        );

        return;
      }


      /* Remove previous highlight */

      courses.forEach(
        (course) =>
          course.classList.remove(
            "longest-course"
          )
      );


      /* Initially assume first course
         is longest.
      */

      let longest =
        courses[0];


      courses.forEach(
        (course) => {

          const currentName =
            course.querySelector(
              ".course-name"
            ).textContent;


          const longestName =
            longest.querySelector(
              ".course-name"
            ).textContent;


          if (
            currentName.length >
            longestName.length
          ) {

            longest = course;

          }

        }
      );


      /* Highlight longest course */

      longest.classList.add(
        "longest-course"
      );

    }
  );



/* =====================================================
   TASK 2
   LIVE STUDENT ID CARD

   Main concepts:
   - input event
   - change event
   - element.style
   - checked property
   - classList
   - template literal
===================================================== */


/* Select form fields */

const studentName =
  document.getElementById("studentName");

const studentRoll =
  document.getElementById("studentRoll");

const studentDepartment =
  document.getElementById(
    "studentDepartment"
  );

const studentSemester =
  document.getElementById(
    "studentSemester"
  );

const cardColor =
  document.getElementById("cardColor");

const showCgpa =
  document.getElementById("showCgpa");

const studentCgpa =
  document.getElementById("studentCgpa");



/* =====================================================
   FUNCTION: updateIdCard()

   Whenever user types or changes a field,
   we call this function again.
===================================================== */

function updateIdCard() {

  /* If field is empty, use placeholder text */

  const name =
    studentName.value.trim()
    || "Your Name";

  const roll =
    studentRoll.value.trim()
    || "Your Roll Number";

  const department =
    studentDepartment.value
    || "Your Department";

  const semester =
    studentSemester.value
    || "Your Semester";


  /* Update card text */

  document.getElementById(
    "cardName"
  ).textContent =
    name;

  document.getElementById(
    "cardRoll"
  ).textContent =
    roll;

  document.getElementById(
    "cardDepartment"
  ).textContent =
    department;

  document.getElementById(
    "cardSemester"
  ).textContent =
    semester;



  /* ---------- CHARACTER COUNTER ---------- */

  const remaining =
    30 -
    studentName.value.length;


  document.getElementById(
    "nameCounter"
  ).textContent =
    `Characters left: ${remaining}`;



  /* ---------- CHANGE CARD COLOR ---------- */

  document.getElementById(
    "liveIdCard"
  ).style.backgroundColor =
    cardColor.value;



  /* ---------- CGPA CHECKBOX ---------- */

  const cgpaBox =
    document.getElementById(
      "cgpaBox"
    );

  const cardCgpa =
    document.getElementById(
      "cardCgpa"
    );


  if (showCgpa.checked) {

    // Show input field
    cgpaBox.classList.remove(
      "d-none"
    );

    // Show badge
    cardCgpa.classList.remove(
      "d-none"
    );


    const cgpa =
      studentCgpa.value === ""
      ? "0.00"
      : Number(
          studentCgpa.value
        ).toFixed(2);


    cardCgpa.textContent =
      `CGPA: ${cgpa}`;

  }

  else {

    cgpaBox.classList.add(
      "d-none"
    );

    cardCgpa.classList.add(
      "d-none"
    );

  }



  /* ---------- TEXT SUMMARY ---------- */

  const cgpaText =
    showCgpa.checked
    ? `\nCGPA: ${studentCgpa.value || "0.00"}`
    : "";


  document.getElementById(
    "cardSummary"
  ).value =
`Student ID Card
Name: ${name}
Roll No: ${roll}
Department: ${department}
Semester: ${semester}${cgpaText}`;

}



/* =====================================================
   INPUT EVENTS

   input fires whenever user types.
===================================================== */

studentName.addEventListener(
  "input",
  updateIdCard
);

studentRoll.addEventListener(
  "input",
  updateIdCard
);

studentSemester.addEventListener(
  "input",
  updateIdCard
);

studentCgpa.addEventListener(
  "input",
  updateIdCard
);



/* =====================================================
   CHANGE EVENTS

   change is useful for dropdowns and checkboxes.
===================================================== */

studentDepartment.addEventListener(
  "change",
  updateIdCard
);

cardColor.addEventListener(
  "change",
  updateIdCard
);

showCgpa.addEventListener(
  "change",
  updateIdCard
);



/* ---------- RESET ---------- */

document
  .getElementById("idCardForm")
  .addEventListener(
    "reset",
    () => {

      /* reset happens before browser finishes
         restoring values.

         setTimeout waits until reset completes.
      */

      setTimeout(
        updateIdCard,
        0
      );

    }
  );


/* Initial card */

updateIdCard();



/* =====================================================
   TASK 3
   COURSE REGISTRATION FORM

   Main concepts:
   - HTML5 validation
   - validity object
   - setCustomValidity()
   - preventDefault()
   - FormData
===================================================== */

const registrationForm =
  document.getElementById(
    "registrationForm"
  );

const regPhone =
  document.getElementById(
    "regPhone"
  );

const regDob =
  document.getElementById(
    "regDob"
  );

const regPassword =
  document.getElementById(
    "regPassword"
  );

const regConfirmPassword =
  document.getElementById(
    "regConfirmPassword"
  );



/* =====================================================
   LIVE PHONE VALIDATION
===================================================== */

regPhone.addEventListener(
  "input",
  () => {

    const state =
      regPhone.validity;

    const message =
      document.getElementById(
        "phoneMessage"
      );


    if (state.valueMissing) {

      message.textContent =
        "Phone is required.";

      message.className =
        "form-text text-danger";

    }

    else if (
      state.patternMismatch
    ) {

      message.textContent =
        "Phone must look like 03001234567.";

      message.className =
        "form-text text-danger";

    }

    else if (state.valid) {

      message.textContent =
        "Phone number is valid.";

      message.className =
        "form-text text-success";

    }

  }
);



/* =====================================================
   AGE VALIDATION

   This rule cannot easily be done using only
   required/min/max, so we use JavaScript.

   Student must be at least 16.
===================================================== */

function validateAge() {

  // Clear old custom error first
  regDob.setCustomValidity("");


  if (regDob.value === "") {

    return;

  }


  const dob =
    new Date(regDob.value);

  const today =
    new Date();


  let age =
    today.getFullYear() -
    dob.getFullYear();


  const monthDifference =
    today.getMonth() -
    dob.getMonth();


  if (
    monthDifference < 0 ||

    (
      monthDifference === 0 &&
      today.getDate() <
      dob.getDate()
    )
  ) {

    age--;

  }


  if (age < 16) {

    regDob.setCustomValidity(
      "Student must be at least 16 years old."
    );

  }

}



regDob.addEventListener(
  "change",
  validateAge
);



/* =====================================================
   PASSWORD DIGIT VALIDATION
===================================================== */

function validatePassword() {

  // \d means any digit 0-9
  const containsDigit =
    /\d/.test(
      regPassword.value
    );


  if (
    regPassword.value !== "" &&
    !containsDigit
  ) {

    regPassword.setCustomValidity(
      "Password must contain a digit."
    );

  }

  else {

    // Empty string means no custom error
    regPassword.setCustomValidity("");

  }

}



/* =====================================================
   CONFIRM PASSWORD VALIDATION
===================================================== */

function validatePasswordMatch() {

  if (
    regConfirmPassword.value !==
    regPassword.value
  ) {

    regConfirmPassword
      .setCustomValidity(
        "Passwords do not match."
      );

  }

  else {

    regConfirmPassword
      .setCustomValidity("");

  }

}



regPassword.addEventListener(
  "input",
  () => {

    validatePassword();

    validatePasswordMatch();

  }
);


regConfirmPassword.addEventListener(
  "input",
  validatePasswordMatch
);



/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

document
  .getElementById("showPassword")
  .addEventListener(
    "change",
    function () {

      const type =
        this.checked
        ? "text"
        : "password";


      regPassword.type =
        type;

      regConfirmPassword.type =
        type;

    }
  );



/* =====================================================
   FORM SUBMISSION
===================================================== */

registrationForm.addEventListener(
  "submit",
  (event) => {

    /* Stop browser reload */

    event.preventDefault();


    /* Run custom validation */

    validateAge();

    validatePassword();

    validatePasswordMatch();


    /* Bootstrap validation styles */

    registrationForm.classList.add(
      "was-validated"
    );


    /* checkValidity checks all HTML5
       and custom validation rules.
    */

    if (
      !registrationForm.checkValidity()
    ) {

      return;

    }


    /* =================================================
       FormData reads form values using name=""
    ================================================= */

    const data =
      new FormData(
        registrationForm
      );


    const result =
      document.getElementById(
        "registrationResult"
      );


    result.textContent = "";


    /* Create success card */

    const card =
      document.createElement("div");

    card.className =
      "alert alert-success";


    const title =
      document.createElement("h5");

    title.textContent =
      "Registration Successful";


    card.appendChild(title);



    /* Never display password */

    const summary = [

      [
        "Name",
        data.get("fullName")
      ],

      [
        "Email",
        data.get("email")
      ],

      [
        "Phone",
        data.get("phone")
      ],

      [
        "Course",
        data.get("course")
      ]

    ];



    summary.forEach(
      ([label, value]) => {

        const p =
          document.createElement("p");

        p.className =
          "mb-1";

        p.textContent =
          `${label}: ${value}`;

        card.appendChild(p);

      }
    );


    result.appendChild(card);


    /* Reset form */

    registrationForm.reset();

    registrationForm.classList.remove(
      "was-validated"
    );


    regPassword.setCustomValidity("");

    regConfirmPassword
      .setCustomValidity("");

    regDob.setCustomValidity("");


    document.getElementById(
      "phoneMessage"
    ).textContent = "";

  }
);



/* =====================================================
   TASK 4
   STUDENT MANAGEMENT DASHBOARD

   Main concepts:
   - Array of objects
   - filter()
   - reduce()
   - sort()
   - findIndex()
   - splice()
   - destructuring
   - ternary operator
   - createElement()
   - event delegation
===================================================== */


/* =====================================================
   INITIAL STUDENT DATA

   Requirement says minimum 6 students.
===================================================== */

const students = [

  {
    name: "Ali Khan",
    rollNumber: "BSCS-001",
    department: "Computer Science",
    semester: 5,
    cgpa: 3.45,
    email: "ali@example.com"
  },

  {
    name: "Sara Ahmed",
    rollNumber: "BSCS-023",
    department: "Software Engineering",
    semester: 5,
    cgpa: 3.80,
    email: "sara@example.com"
  },

  {
    name: "Ayesha Noor",
    rollNumber: "BSCS-014",
    department: "Data Science",
    semester: 4,
    cgpa: 1.90,
    email: "ayesha@example.com"
  },

  {
    name: "Hamza Malik",
    rollNumber: "BSCS-031",
    department: "Computer Science",
    semester: 6,
    cgpa: 2.70,
    email: "hamza@example.com"
  },

  {
    name: "Zainab Ali",
    rollNumber: "BSCS-044",
    department: "Data Science",
    semester: 3,
    cgpa: 2.35,
    email: "zainab@example.com"
  },

  {
    name: "Usman Shah",
    rollNumber: "BSCS-052",
    department: "Software Engineering",
    semester: 7,
    cgpa: 3.20,
    email: "usman@example.com"
  }

];



/* =====================================================
   DASHBOARD STATE

   These variables remember current search,
   filter and sorting options.
===================================================== */

let currentSearch = "";

let currentDepartment =
  "all";

let highestFirst =
  true;

let studentBeingEdited =
  -1;



/* =====================================================
   CGPA STATUS FUNCTION

   Uses the ternary operator.
===================================================== */

function getStatus(cgpa) {

  return cgpa >= 3

    ? "Excellent"

    : cgpa >= 2.5

      ? "Good"

      : cgpa >= 2

        ? "Satisfactory"

        : "Academic Warning";

}



/* =====================================================
   STATISTICS

   reduce() is used to calculate total CGPA.
===================================================== */

function updateStatistics() {

  const total =
    students.length;


  /* SUM ALL CGPAS */

  const cgpaTotal =
    students.reduce(

      (sum, student) =>
        sum + student.cgpa,

      0

    );


  const average =
    total === 0
      ? 0
      : cgpaTotal / total;



  /* Find highest CGPA student */

  const highest =
    students.reduce(

      (best, student) =>

        best === null ||
        student.cgpa > best.cgpa

          ? student

          : best,

      null

    );



  /* Count Academic Warning students */

  const warnings =
    students.filter(

      (student) =>
        student.cgpa < 2

    ).length;



  /* Display statistics */

  document.getElementById(
    "totalStudents"
  ).textContent =
    total;


  document.getElementById(
    "averageCgpa"
  ).textContent =
    average.toFixed(2);


  document.getElementById(
    "highestCgpa"
  ).textContent =
    highest

      ? `${highest.cgpa.toFixed(2)}
         (${highest.name})`

      : "-";


  document.getElementById(
    "warningStudents"
  ).textContent =
    warnings;

}



/* =====================================================
   FILTER + SEARCH + SORT TOGETHER
===================================================== */

function getVisibleStudents() {

  /* filter() returns a NEW array containing
     students that satisfy our conditions.
  */

  const filtered =
    students.filter(
      (student) => {


        const matchesSearch =

          student.name
            .toLowerCase()
            .includes(
              currentSearch
            )

          ||

          student.rollNumber
            .toLowerCase()
            .includes(
              currentSearch
            );



        const matchesDepartment =

          currentDepartment ===
          "all"

          ||

          student.department ===
          currentDepartment;



        return (
          matchesSearch &&
          matchesDepartment
        );

      }
    );



  /* sort() normally modifies an array.

     [...filtered] creates a copy first.
  */

  return [...filtered].sort(
    (a, b) =>

      highestFirst

        ? b.cgpa - a.cgpa

        : a.cgpa - b.cgpa
  );

}



/* =====================================================
   CREATE STUDENT CARDS
===================================================== */

function renderStudents() {

  const container =
    document.querySelector(
      "#studentCards"
    );


  /* Clear old cards */

  container.textContent = "";


  const visibleStudents =
    getVisibleStudents();



  if (
    visibleStudents.length === 0
  ) {

    const message =
      document.createElement("p");

    message.textContent =
      "No students found.";

    container.appendChild(message);

    return;
  }



  visibleStudents.forEach(
    (student) => {


      /* Object destructuring */

      const {

        name,
        rollNumber,
        department,
        semester,
        cgpa,
        email

      } = student;



      const status =
        getStatus(cgpa);



      /* Bootstrap column */

      const column =
        document.createElement(
          "div"
        );

      column.className =
        "col-md-6";



      /* Student card */

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "student-card";



      /* Student name */

      const heading =
        document.createElement(
          "h4"
        );

      heading.textContent =
        name;



      card.appendChild(
        heading
      );



      /* Student details */

      const details = [

        `Roll No: ${rollNumber}`,

        `Department: ${department}`,

        `Semester: ${semester}`,

        `CGPA: ${cgpa.toFixed(2)}`,

        `Email: ${email}`,

        `Status: ${status}`

      ];



      details.forEach(
        (detail) => {

          const p =
            document.createElement(
              "p"
            );

          p.textContent =
            detail;

          card.appendChild(p);

        }
      );



      /* EDIT BUTTON */

      const editButton =
        document.createElement(
          "button"
        );

      editButton.className =
        "btn btn-sm btn-outline-primary me-2 edit-student";

      editButton.textContent =
        "Edit CGPA";

      editButton.dataset.roll =
        rollNumber;



      /* DELETE BUTTON */

      const deleteButton =
        document.createElement(
          "button"
        );

      deleteButton.className =
        "btn btn-sm btn-outline-danger delete-student";

      deleteButton.textContent =
        "Delete";

      deleteButton.dataset.roll =
        rollNumber;



      card.appendChild(
        editButton
      );

      card.appendChild(
        deleteButton
      );


      column.appendChild(
        card
      );


      container.appendChild(
        column
      );

    }
  );

}



/* =====================================================
   REFRESH DASHBOARD

   Whenever data changes we call both:
   - renderStudents()
   - updateStatistics()
===================================================== */

function refreshDashboard() {

  renderStudents();

  updateStatistics();

}



/* =====================================================
   ADD STUDENT FORM
===================================================== */

const studentForm =
  document.getElementById(
    "studentForm"
  );


studentForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    /* Select inputs */

    const name =
      document.getElementById(
        "dashName"
      );

    const roll =
      document.getElementById(
        "dashRoll"
      );

    const department =
      document.getElementById(
        "dashDepartment"
      );

    const semester =
      document.getElementById(
        "dashSemester"
      );

    const cgpa =
      document.getElementById(
        "dashCgpa"
      );

    const email =
      document.getElementById(
        "dashEmail"
      );



    /* Remove old custom validity */

    roll.setCustomValidity("");



    /* UNIQUE ROLL NUMBER

       some() returns true if one existing
       student already has this roll number.
    */

    const rollExists =
      students.some(
        (student) =>

          student.rollNumber
            .toLowerCase()

          ===

          roll.value
            .trim()
            .toLowerCase()
      );



    if (rollExists) {

      roll.setCustomValidity(
        "Roll number already exists."
      );

    }



    /* Validate all HTML5 rules */

    if (
      !studentForm.checkValidity()
    ) {

      studentForm.classList.add(
        "was-validated"
      );

      return;
    }



    /* Create new student object */

    const newStudent = {

      name:
        name.value.trim(),

      rollNumber:
        roll.value
          .trim()
          .toUpperCase(),

      department:
        department.value,

      semester:
        Number(
          semester.value
        ),

      cgpa:
        Number(
          cgpa.value
        ),

      email:
        email.value.trim()

    };



    /* push() adds object to array */

    students.push(
      newStudent
    );



    showMessage(
      "dashboardMessage",
      "success",
      `${newStudent.name} added successfully.`
    );



    studentForm.reset();

    studentForm.classList.remove(
      "was-validated"
    );


    roll.setCustomValidity("");


    refreshDashboard();

  }
);



/* =====================================================
   SEARCH EVENT

   input fires while typing.
===================================================== */

document
  .getElementById(
    "studentSearch"
  )
  .addEventListener(
    "input",
    function () {

      currentSearch =
        this.value
          .trim()
          .toLowerCase();

      renderStudents();

    }
  );



/* =====================================================
   DEPARTMENT FILTER
===================================================== */

document
  .getElementById(
    "departmentFilter"
  )
  .addEventListener(
    "change",
    function () {

      currentDepartment =
        this.value;

      renderStudents();

    }
  );



/* =====================================================
   SORT BUTTON
===================================================== */

document
  .getElementById(
    "sortCgpaBtn"
  )
  .addEventListener(
    "click",
    function () {

      /* Flip true ↔ false */

      highestFirst =
        !highestFirst;


      this.textContent =
        highestFirst

          ? "Sort by CGPA ↓"

          : "Sort by CGPA ↑";


      renderStudents();

    }
  );



/* =====================================================
   EVENT DELEGATION

   One listener controls ALL dynamically created
   Edit and Delete buttons.
===================================================== */

document
  .getElementById(
    "studentCards"
  )
  .addEventListener(
    "click",
    (event) => {


      /* ---------- DELETE ---------- */

      if (
        event.target.classList.contains(
          "delete-student"
        )
      ) {

        const roll =
          event.target.dataset.roll;


        /* findIndex returns location
           of matching student.
        */

        const index =
          students.findIndex(
            (student) =>
              student.rollNumber ===
              roll
          );


        if (index !== -1) {

          /* splice(index, 1)
             removes one item.
          */

          students.splice(
            index,
            1
          );


          refreshDashboard();

        }

      }



      /* ---------- EDIT CGPA ---------- */

      if (
        event.target.classList.contains(
          "edit-student"
        )
      ) {

        const roll =
          event.target.dataset.roll;


        studentBeingEdited =
          students.findIndex(
            (student) =>
              student.rollNumber ===
              roll
          );


        if (
          studentBeingEdited !== -1
        ) {

          const student =
            students[
              studentBeingEdited
            ];


          document.getElementById(
            "editStudentName"
          ).textContent =
            `${student.name}
             (${student.rollNumber})`;


          document.getElementById(
            "editCgpaInput"
          ).value =
            student.cgpa;


          document.getElementById(
            "editCgpaPanel"
          ).classList.remove(
            "d-none"
          );

        }

      }

    }
  );



/* =====================================================
   SAVE EDITED CGPA
===================================================== */

document
  .getElementById(
    "editCgpaForm"
  )
  .addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const input =
        document.getElementById(
          "editCgpaInput"
        );


      const error =
        document.getElementById(
          "editCgpaError"
        );


      const newCgpa =
        Number(
          input.value
        );



      /* Validate CGPA */

      if (
        input.value === "" ||
        newCgpa < 0 ||
        newCgpa > 4
      ) {

        error.textContent =
          "CGPA must be between 0 and 4.";

        return;
      }



      error.textContent = "";


      /* Update object's CGPA */

      students[
        studentBeingEdited
      ].cgpa =
        newCgpa;



      /* Hide edit panel */

      document.getElementById(
        "editCgpaPanel"
      ).classList.add(
        "d-none"
      );


      studentBeingEdited =
        -1;


      refreshDashboard();

    }
  );



/* =====================================================
   CANCEL CGPA EDIT
===================================================== */

document
  .getElementById(
    "cancelEdit"
  )
  .addEventListener(
    "click",
    () => {

      document.getElementById(
        "editCgpaPanel"
      ).classList.add(
        "d-none"
      );


      studentBeingEdited =
        -1;

    }
  );



/* =====================================================
   INITIAL PAGE LOAD

   Display the six students immediately.
===================================================== */

refreshDashboard();