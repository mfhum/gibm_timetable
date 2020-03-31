let date = moment();

// function to create or change a Cookie
function setCookie(cName, cValue) {
  document.cookie = cName + '=' + cValue + ';';
}

// function to get the Value of the cookie
function getCookie(cName) {
  var name = cName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  // write Cookies into the Array ca
  var ca = decodedCookie.split(';');
  // for loop to go through every object in the Array ca
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// function to check if there are cookies
function checkCookie(cName) {
  var cookieResponse = getCookie(cName);
  if (cookieResponse != '') {
    return true;
  } else {
    return false;
  }
}

// function to setup site if there are cookies
function cookieSetup() {
  console.log('job: ', getCookie('job'), ' class: ', getCookie('class'));
  loadJobs();
  $(classSelectorTitle).show();
  $(classSelector).show();
  loadClasses(getCookie('job'));
  $(weekSelector).show();
  if (date == undefined) {
    date = moment(date).format('WW-GGGG');
  }
  loadTables(getCookie('class'), moment(date).format('WW-GGGG'));
}
