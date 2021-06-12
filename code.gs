/*
  updateGrab() searches gmail for labels "Grab and Gojek Receipts/Grab" and processes them.
  It extracts the transaction dates, total payment, pick up and destination using regex.
  This code only works for JustGrab rides from 2021 onwards (Grab changed their html template sometime in 2020)
*/
function updateGrab() {
  // get gsheet to append grab expenses to
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_grab = ss.getSheetByName("Grab");

  var label_grab = GmailApp.getUserLabelByName("Grab and Gojek Receipts/Grab");
  
  //retrieve grab emails and extract date, price, pick up and destination addresses
  var threads = label_grab.getThreads();
  for (var i=0; i<threads.length; i++) {
      var messages = threads[i].getMessages();

      for (var j=0;j<messages.length; j++) {
        //retrieve message in plaintext
        var msg = messages[j].getPlainBody();
        
        //get date
        var msg_date = messages[j].getDate();
        
        //get payment
        var rx_payment = /SGD\s*(\d+\.*\d+)/gm;
        var payment = rx_payment.exec(msg);

        //get pick up
        var rx_pickup = /\[image: pick-up]\s*\n*[\u22ee*\n*]*([\w\s,\@\#\-\(\)\&\'/]*)$/gm;
        var pickup = rx_pickup.exec(msg);
        //condition added because main code fails to process tips.
        if (pickup) {
        } else {
          pickup = ["-","-"];
        }

        //get destination
        var rx_dest = /\[image: drop-off]\s*\n*[\u22ee*\n*]*([\w\s,\@\#\-\(\)\&\'/]*)$/gm;
        var destination = rx_dest.exec(msg);

        //append to sheet
        //there may be multiple destinations, so while condition needed 
        var row = [msg_date,payment[1],pickup[1]];
        while (destination) {
          row.push(destination[1]);
          destination = rx_dest.exec(msg);
        }
        sheet_grab.appendRow(row);
      }
      threads[i].removeLabel(label_grab);
      threads[i].addLabel(GmailApp.getUserLabelByName("Grab and Gojek Receipts"));
  }
}
