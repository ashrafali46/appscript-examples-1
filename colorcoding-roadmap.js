// if you set this trigger to fire on edit, it will:
// 1. Listen for updates in your spreadsheet.
// 2. If any of those updates take place on a certain sheet...
// 3. ...and in a specific column of that sheet...
// 4. ...it will color the entire row based on the input of that cell's string value.
// Make sure to update everything marked with a TODO below 

function onEdit(e) {
    if (e) {
        var ss = e.source.getActiveSheet();
        var r = e.source.getActiveRange();

        // If you want to be specific
        // do not work in first row and only work in the sheet called "Roadmap"
        if (r.getRow() != 1 && ss.getName() == "Roadmap") {

          var updateCol = 1 // TODO: update this to whatever column you are basing the color of the row from.
          status = ss.getRange(r.getRow(), updateCol).getValue();

          // Specify the range with which You want to highlight
          var numCols = 9 // TODO: update this with how many columns your spreadsheet has
          rowRange = ss.getRange(r.getRow(),1,1,numCols);

          // TODO: update the colors you'd like to use in your sheet. Use hex.
          var grey = "#E0E0E0";
          var lightGreen = "#B8E986";
          var darkGreen = "#7ED321";
          var yellow = "#FAF28B";
          var lightRed = "#FFD0D6"

          // This changes font color
          // TODO: update each status == "something" check below to match whatever strings you expect in the column you are watching. 
          if (status == 'Testing') {
            rowRange.setBackground(grey);

          } else if (status == 'In Progress') {
            rowRange.setBackground(lightGreen);

          } else if (status == 'Scoping') {
            rowRange.setBackground(yellow);

          } else if (status == 'Released') {
            rowRange.setBackground(darkGreen);

          } else if (status == 'On Hold') {
            rowRange.setBackground(lightRed);

          // DEFAULT
          } else {
            rowRange.setBackground('white');
          }

        }
    }
}
