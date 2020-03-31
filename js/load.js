//html elements
const jobSelector = '#jobSelect';
const timeTabled = '#timeTable';
const ndTimeTable = '#noDataTimeTable';

// loads all jobs for the Dropdown
function loadJobs() {
  $.getJSON('https://sandbox.gibm.ch/berufe.php')
    .done(function(data) {
      $(jobSelector)
        .empty()
        .append('<option value="">Wählen Sie Ihren Job</option>');
      // loop over JSON Array to fill divs
      $.each(data, function(i, jobSelect) {
        if (jobSelect.beruf_name != 1) {
          if (getCookie('job') && jobSelect.beruf_id == getCookie('job')) {
            $(
              '<option selected value="' +
                jobSelect.beruf_id +
                '">' +
                jobSelect.beruf_name +
                '</option>'
            ).appendTo($(jobSelector));
          } else {
            $(
              '<option value="' +
                jobSelect.beruf_id +
                '">' +
                jobSelect.beruf_name +
                '</option>'
            ).appendTo($(jobSelector));
          }
        }
      });
      console.log('loadjobs: done');
    })
    // if there is no connection to the server
    .fail(function() {
      $(alert).show();
      $(alert).html('Keine Verbindung zum Server');
    });
}

// loads all classes for the Dropdown
function loadClasses(jobValue) {
  $.getJSON('http://sandbox.gibm.ch/klassen.php?beruf_id=' + jobValue)
    .done(function(data) {
      $(classSelector)
        .empty()
        .append('<option value="">Choose your Class</option>');
      // loop over JSON Array to fill dropwdown
      $.each(data, function(i, classSelect) {
        if (getCookie('class') && classSelect.klasse_id == getCookie('class')) {
          $(
            '<option selected value="' +
              classSelect.klasse_id +
              '">' +
              classSelect.klasse_name +
              '</option>'
          ).appendTo($(classSelector));
        } else {
          $(
            '<option value="' +
              classSelect.klasse_id +
              '">' +
              classSelect.klasse_name +
              '</option>'
          ).appendTo($(classSelector));
        }
      });
    })
    // if there is no connection to the server
    .fail(function() {
      $('#message').html('Keine Verbindung zum Server');
    });
}

//loads the timetable into the html
function loadTables(classValue, weekAndYear) {
  console.log(classValue, ' ', weekAndYear);
  $.getJSON(
    'http://sandbox.gibm.ch/tafel.php?klasse_id=' +
      classValue +
      '&woche=' +
      weekAndYear
  )
    .done(function(data) {
      $(timeTabled).empty();
      if (data.length == 0) {
        $(ndTimeTable).show();
      } else {
        $(ndTimeTable).hide();
        $(timeTabled).append(
          '<thead><tr><th scope="col">Datum</th><th scope="col">Tag</th><th scope="col">Von</th><th scope="col">Bis</th><th scope="col">Lehrer</th><th scope="col">Fach</th><th scope="col">Raum</th></tr></thead>'
        );
        // loop over JSON Array to fill divs
        $.each(data, function(i, timeTable) {
          $(timeTabled).append(
            '<tr>' +
              '<th scope="row">' +
              moment(timeTable.tafel_datum).format('DD.MM.YYYY') +
              '</th>' +
              '<td>' +
              moment(timeTable.tafel_datum)
                .day(timeTable.tafel_wochentag)
                .format('dddd') +
              '</td>' +
              '<td>' +
              moment(timeTable.tafel_von, 'HH:mm:ss').format('HH:mm') +
              '</td>' +
              '<td>' +
              moment(timeTable.tafel_bis, 'HH:mm:ss').format('HH:mm') +
              '</td>' +
              '<td>' +
              timeTable.tafel_lehrer +
              '</td>' +
              '<td>' +
              timeTable.tafel_longfach +
              '</td>' +
              '<td>' +
              timeTable.tafel_raum +
              '</td>' +
              '</tr>'
          );
        });
      }
    })
    // if there is no connection to the server
    .fail(function() {
      $('#message').html('Keine Verbindung zum Server');
    });
}
