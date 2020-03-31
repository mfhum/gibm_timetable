//html elements
const classSelectorTitle = '#classSelect';

//shows the class dropdown and loads the Classes
function jobSelected() {
  const selectedJob = this.value;
  if (selectedJob !== '') {
    $(classSelectorTitle).show();
    $(classSelector).show();
    loadClasses(selectedJob);
  }
}

//shows the timetable and loads the time, also sets Cookie
function classSelected(date) {
  const selectedClass = $('#classSelector option:selected').val();
  if (selectedClass !== '') {
    $(weekSelector).show();
    if (date == undefined) {
      date = moment(date).format('WW-GGGG');
    }
  }
  loadTables(selectedClass, date);
  setCookie('job', $('#jobSelect option:selected').val());
  setCookie('class', selectedClass);
  console.log('job: ', getCookie('job'), ' ', getCookie('class'));
}
