$(function() {
  // moment object
  let date = moment();
  // html elements
  const weekSet = '#weekShown';
  const weekSetPrevious = '#weekSetterPrev';
  const weekSetNext = '#weekSetterNext';
  const alert = '#alert';
  const weekSelector = '#weekSelector';
  const classSelectorTitle = '#classSelect';
  const classSelector = '#classSelector';
  const jobSelector = '#jobSelect';
  const timeTable = '#timeTable';
  const ndTimeTable = '#noDataTimeTable';

  // hides all elements that are irrelevant at the init
  function hideElementsForInit() {
    $(alert).hide();
    $(weekSelector).hide();
    $(classSelectorTitle).hide();
    $(classSelector).hide();
    $(ndTimeTable).hide();
  }

  function initListeners() {
    // onclick: sets selected week to previous one
    $(weekSetPrevious).on('click', function() {
      date = moment(date).subtract(1, 'w');
      // set Date in WW-GGGG format
      $(weekSet).text(moment(date).format('WW-GGGG'));
      classSelected(moment(date).format('WW-GGGG'));
    });

    // onclick: sets selected week to following one
    $(weekSetNext).on('click', function() {
      // go to following week
      date = moment(date).add(1, 'w');
      // set Date in WW-GGGG format
      $(weekSet).text(moment(date).format('WW-GGGG'));
      classSelected(moment(date).format('WW-GGGG'));
    });

    // onchange: shows class selection and saves the selected job
    $(jobSelector).on('change', function() {
      jobSelected.call(this);
    });

    // onchange: shows week selection and saves the selected class, also shows timetable of the current week
    $(classSelector).on('change', function() {
      $(timeTable).show();
      classSelected.call(moment(date).format('WW-GGGG'));
    });
  }

  function initElements() {
    // set actual Date in WW-GGGG format
    $(weekSet).text(moment(date).format('WW-GGGG'));

    // hides all things that are unnecessary
    hideElementsForInit();
  }

  //init of all Elements and Listeners
  function init() {
    initElements();
    initListeners();

    // checks if there are cookies
    if (checkCookie('job')) {
      console.log('cookie setup');
      // if yes: load Table
      cookieSetup();
    } else {
      console.log('first timer');
      // if no: load Jobs
      loadJobs();
    }

    // set Date in WW-GGGG format
    $(weekSet).text(moment(date).format('WW-GGGG'));
  }

  init();
});
