let table = document.querySelector('.list');
let input = document.querySelector('.input');
let date = document.querySelector('.choise-date');
let orderBy = document.querySelectorAll('.orderBy');
let filterInput = document.querySelectorAll('.filter');
date.max = new Date().toISOString().split("T")[0];

function filterStudents(needle) {
  let object = students;

  needle.forEach(element => {
    object = object.filter(function(e) {
      if (String(e[element.name]).includes(element.value)) return e;
    })
  });

  render('birthDay', students, object);
}

function getYearsStudy(studyStart) {
  const studyEnd = Number(studyStart) + 4;
  const month = new Date().getMonth();
  const graduated = 'закончил';
  let cours = null;

  if (studyEnd > new Date().getFullYear()) {
    cours = month < 9 ? new Date().getFullYear() - studyStart : (new Date().getFullYear() - studyStart) + 1;
  } else if (studyEnd === new Date().getFullYear()) {
    cours = month < 9 ? new Date().getFullYear() - studyStart : graduated;
  } else {
    cours = graduated;
  }

  if (typeof(cours) === 'number') {
    cours += ' курс';
  }

  return studyStart + '-' + studyEnd + '(' + cours + ')';
}

function customSort(data, typeSort) {

  if (typeSort == 'faculty' || typeSort == 'fio') {
    return data.sort(function (a, b) {
      return ('' + a[typeSort]).localeCompare(b[typeSort]);
      })
  };

  return data.sort((a, b) => a[typeSort] - b[typeSort]);
}

function addProperties(object) {
  let newObject = [];
  Object.assign(newObject, object);

  newObject.map(value => {
    value.fio = value.surname + ' ' + value.name + ' ' + value.middleName;
    value.studyEnd = Number(value.yearOfStudy) + 4;
  })

  return newObject;
}

function render(order, students, filterStudents = null) {
  let i = 1;

  let object = addProperties(students)

  if (filterStudents !== null) {
    object = filterStudents
  }

  object = customSort(object, order);

  let str = object.reduce(function (string,item) {

    const age = Math.floor((new Date().getTime() - item.birthDay.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
    const birthday = item.birthDay.getDate() + '.' + (item.birthDay.getMonth() + 1) + '.' + item.birthDay.getFullYear() + ' (' + age + ')';

    return string += `<tr>
      <th scope="row">${i++}</th>
      <td>${item.fio}</td>
      <td>${birthday}</td>
      <td>${getYearsStudy(item.yearOfStudy)}</td>
      <td>${item.faculty}</td>
    </tr>`
  }, '');

  table.innerHTML = str;
}

function addstudent(data) {

  students.push({
    surname : data.surname,
    name : data.name,
    middleName : data.middlename,
    birthDay : new Date(data.birthday),
    yearOfStudy : data['year-of-study'],
    faculty : data.faculty,
  })

  render('birthDay', students);
}

filterForm.onsubmit = async (event) => {
  event.preventDefault();

  let forms = new FormData(filterForm);
  let data = [];

  for (let [name, value] of forms) {
    if (value !== "") {
      data.push({name, value});
    }
  }

  filterStudents(data);
}

orderBy.forEach(element => {
  element.addEventListener('click', function() {
    render(element.dataset.order, students);
  })
})

form.onsubmit = async (event) => {
  event.preventDefault();

  let forms = document.getElementById('form');
  let data = new Object;
  forms = new FormData(forms);

  for (let [name, value] of forms) {
    value = value.trim();
    if (validateInputs(name, value) == false) {
      return;
    }
    data[name] = value;
  }

  addstudent(data)
  form.reset();
};

render('birthDay', students);
createYearInSelect();
