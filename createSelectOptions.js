function createYearInSelect() {
  let select = document.querySelector('[name="year-of-study"]');
  const startYear = 2000;
  const nowYear = new Date().getFullYear();

  const rangeYears = nowYear - startYear;
  let string = '';
  for (let i = 0; i <= rangeYears; i++) {
    string += `<option value="${startYear + i}">${startYear + i}</option>`
  }

  select.innerHTML += string;
}
