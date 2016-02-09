# repobrowser

Introduction:

This is a simple onepage app to provide repository browser by org name, and allows the user the abilty to view the commits associated with a particular repository of the organization.

Rate limiting is in effect as the API is not using authentication.  Didn't get around to adding authentication to allow for more than 500 requests an hour.  Only doing look ups when user hits the enter key to reduce likelyhood of hitting the limit in an hour.

Framework used:

This application leverages the skeleton of Angualr-seed framework to get up and running quickly.  This application assumes Node.js and node package manager are installed.

Intallation Instructions:

In order to install this application and get it running, following these steps.

1.  Make sure git is installed on your system.

2.  Use git to close the repobrowser repository. replace project name with a dir name of your choice.
    git clone https://github.com/abejarrett/repobrowser.git <projname>

3.  Install Node.js

4.  Install node package manager with "npm install"

5. Install the web server that comes with Angular-seed globally as follows:
    sudo npm install -g http-server

6.  cd to the directory <projname>/app  and run the following:
    npm start

7.  The the webserver will start, and install any packages missing, bower, karma, etc.
    There are more packages than needed in the project as this project is based on the angular-seek skeleton.

8.  Once the server is up on port 8000, the default for this scenario, open a browser with:
    localhost:8000/app/index.html, to see the page render.


Test Instructions: (manual tests to very correct behavior)

1.  Launch the web app using "npm start" from the app root direction (i.e. repobrowser/app)
    Verify:  loading localhost:8000/app/index.html in browser address bar should render the web app displaying page title, Organization name edit field. and and empty row below.
2.  Organization name input field:
    Verify:   type in the name "netflix" into the organization field and hit enter.  Verify that 30 repositories are displayed row by row, with highest fork count on top (this is the ranking).  Next is the repository URL/name hyperllinked, the description, the "commits" link text, and Last Updated: and Created: dates.
    Verify: nothing is displayed until "enter" is pressed.
    Verify: enter "net" and hitting enter retuns a warning display: "No organization exists by the name "net". Try again with another organization name."
    Verify: enter "netfl" and hitting enter returns an empty row as no repos exist for that org name. Also number of repositories will be 0.

3.  Enter "netflix" as organization name and hit enter.  When rows display, select the "commit" link.
    Verify: next to the commit link a "+" glyph is dipslayed.
    Verify: Click the "+" and JSON string will display in a column with commits for the asscoiated repository.
    Verify: the "+" should now be a minus.  Click the "-" and the JSON text panel should be removed from view.
4.  Scroll down the page using the browser vertical scrollbar.
    Verify every row shows commits +

5.  Select any row and click on the repository name.
    Verify a new browser window is opened and the repository is loaded in GitHub.

6.  notice that Next, Prev and Last links are displayed next to the numbmer of repositories found.
    Verify that clicking each of the links respectively redraws the page and removing from view those links which do not apply to the give pagination state.



