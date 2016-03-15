// this function can be set on a timer that runs 1x a week (or however often you'd like).
function sendWeeklyCheckIn() {

  // get student-specific feedback
  var ss = SpreadsheetApp.getActive();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("student_info")); // change "student_info" to the name of the sheet you are reading.

  var sheet = SpreadsheetApp.getActiveSheet()
  var startRow = 2; // ignore header
  var startCol = 1;
  var numRows = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  var dataRange = sheet.getRange(startRow, startCol, numRows - 1, numCols);
  var data = dataRange.getValues();

  for (i in data) {
    var row = data[i];

    // you can get any piece of information by indexing into the row. I got name, email and Guru as those are strings I use in the email body itself.
    var name = row[0] // returns the first column, student's name
    var email = row[2] // returns the third column, student's email
    var guru = row[9] // returns Guru's name
    var checkInURL = "https://udacityguru.typeform.com/to/ejs5Fa";
    var alias = GmailApp.getAliases()[0] // I don't want to send from @knowlabs.com, this will get the first alias of the logged in account.

    if (guru == "") {
      continue // don't send an email to a student who doesn't have a guru assigned
    }

    var body = "Hi " + name + ", \n\nI just wanted to let you know that your weekly check-in is now available. Learn anything interesting this week? Let me know! Once you complete the check-in, I'll follow up with feedback on your progress and help you set some goals for the next week. As an FYI, this check-in closes at 1PM on Monday.\n\n" + checkInURL "\n\nAnd remember, you can email me anytime for help, feedback or just to chat about your Nanodegree and career aspiration.\n\nHappy Learning!\n"+ guru;
    GmailApp.sendEmail(email, "[Udacity Guru] Complete Your Weekly Check-in!", body, {
        from: alias
    });
    Logger.log("Sent weekly check-in email to: " + email);
  }
}
