function onEdit(e) {
    if (e) {
        var ss = e.source.getActiveSheet();
        var r = e.source.getActiveRange();

        // If you want to be specific
        // do not work in first row and only work in the sheet called "Roadmap"
        if (r.getRow() != 1 && ss.getName() == "Roadmap") {

          // E.g. status column is 2nd (B)
          status = ss.getRange(r.getRow(), 1).getValue();

          // Specify the range with which You want to highlight
          var numCols = 9 // update this with how many columns your spreadsheet has
          rowRange = ss.getRange(r.getRow(),1,1,numCols);

          var grey = "#E0E0E0";
          var lightGreen = "#B8E986";
          var darkGreen = "#7ED321";
          var yellow = "#FAF28B";
          var lightRed = "#FFD0D6"

          // This changes font color
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
