# appscript-grabExpenses
Scans gmail for grab receipts and extracts details of transactions into gsheet. Current version only works with JustGrab receipts in 2021 (Grab updated their HTML template sometime in 2020).

Will be adding codes for Gojek and GrabFood next.

# Setting Up
The code retrieves mails via labels, so make sure your justgrab receipts are probably labeled (by creating a filter).
The label I used in my code is "Grab and Gojek Receipts/Grab", so make sure you replace that with your own labels.

# How to use
This is a sheet bound appscript. To use:
1. Create a Google sheet.
2. Name your sheet (the tab at the bottom) as "Grab".
3. Tools > Script Editor
4. Add my code to Code.gs. Change the label string accordingly.
5. Save and run. If this is your first time executing script, Google will prompt for authorisation. Authorise accordingly and you'll be good to go.
6. Once authorised, run again.
7. (Optional) Set time-based trigger. (Mine is weekly)
8. Return to sheet and format as you wish. 

# Things to note
1. Max Runtime
Google has a maximum run time of 6mins. If you have a lot of receipts in your mailbox, this code will terminate after runtime is up. When you see the error prompt in your execution log, restart the debugging and run again. I wouldn't bother with receipts that are older than Aug 2020.

2. Changing Labels
My code changes the label of the email AFTER processing it. This is a reflection of how I categorise my mails. Edit the code to suit your own organisation methods.
