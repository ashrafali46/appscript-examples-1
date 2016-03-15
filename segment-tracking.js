function segmentTracking() {
  var ss = SpreadsheetApp.getActive();

  // get student-specific feedback
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("student_info")); // change "student_info" to the name of the sheet you are reading.

  var sheet = SpreadsheetApp.getActiveSheet()
  var startRow = 2; // ignore header, TODO get rid of magic #s?
  var startCol = 1;
  var numRows = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  var dataRange = sheet.getRange(startRow, startCol, numRows - 1, numCols);
  var data = dataRange.getValues();

  var updateMe = [];
  for (i in data) {
    var row = data[i];

    // based on your spreadsheet setup and tracking needs, you'll want to include different columns from your data.
    var accountId = row[3]; // column 4
    var date = row[4];
    var startDate = date.toISOString();
    var segmentSet = row[13];
    var guru = row[9]
    var careerReason = row[6]

    if (segmentSet != "YES") { // this checks if the student has been tracked in segment before. In line 61, I set the value of a column in each row to "YES" once the tracking event is fired.
      if (accountId == "") { // if I haven't manually set the account ID yet, I don't want to send a tracking event.
        continue
      }

      var segment_data = {
        "writeKey": "ENTER_WRITE_KEY_HERE", // production write key from Segment
        "userId": accountId,
        "event": "Student Added", // rename this to reflect the event you're tracking.
        "timestamp": startDate,
        "properties": {
          "guru": guru,
          "career_reason": careerReason
          // more can be added if there is more contextual data you'd like to track.
        }
      };

      var payload = JSON.stringify(segment_data);

      // do not change headers or options below.
      var headers = {
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":"Basic _authcode_"
      };

      var options = {
        "method":"POST",
        "contentType" : "application/json",
        "headers": headers,
        "payload" : payload
      };

      var url = "https://api.segment.io/v1/track";
      var response = UrlFetchApp.fetch(url, options);
      Logger.log("Sent Segment tracking event for " + accountId);

      // write YES in that
      sheet.getRange((Number(i)+2), 14).setValue("YES"); // this will be updated based on where in your spreadsheet you track that a segment event is recorded.
    }
  }
}
