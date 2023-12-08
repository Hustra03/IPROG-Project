# Mid-project review

This section will discuss the project, as of 2023-12-07, which is preserved in the branch "Mid-Project review" to allow continued development during the review process.

[Hosting Link](https://iprog-tw3-53504.web.app/#/ "Yodas Gaming Wiki")

## Short description of your project

The website which is to be developed is to be a gaming wiki, with information about different games, potentially also including screenshots and achievements. To put a unique spin on the concept there will be the option to translate any larger text to match the speaking pattern of the well known Star Wars character Yoda using an API translator (which is a compromise as the translator API has limited access, the original idea being that the description of each game would always be translated). This will put a fun spin on the site making it something unusual/fun which users may wish to share with other video game/Star Wars fans.

## What you have done

Header implemented, with login functionality using google authenticator, along with per-user persistence for certain elements, specifically for 3 aspects, the yodafy value, the current page and the saved pages. Only the current page has any impact on the current implementation, since it allows the user to refresh the page without losing the detailed data.

Searching, both a simple search using only a text query in a dropdown menu but also a more detailed search in on a separate page where additional aspects can be detailed about the query, such as the number of results to return between 5 and 20, how exact and fuzzy the result should be ext. Currently limited to searching for games.

A page showing the results of the search, showing a few details of the game, these can be clicked to go to the page described below

A page which shows additional details about one of the search results at a time, currently only the description + a number of images related to the game, is done using a separate fetch.

A page that will show games that the user has decided to save, currently not fully implemented but can be navigated to and from when a user is signed in.

## What you still plan to do

Implement saved pages, with the user being able to save pages under different categories, either a small set of predefined options or potentially even custom tags.

Potentially allowing searches for other things than games, such as publishers, achievements/dlc/series for a particular game ect.

Implement the yodafy feature for certain text, which will use another API in order to translate the text to the speech pattern of the star wars character yoda

Homepage is not yet implemented, and should show some "standard" view, such as the result from a few pre-selected searches. 

Viewing history, which shows the last 10 or so pages visited on the left hand side of the screen,
which is persisted and can be pressed to easily go back to one of them.

Improve styling for all components, and ensure this is more uniform between components.

## Your project file structure (short description/purpose of each file)

### Presenter

#### index.jsx

This is the bootstrapping file, which creates the app and initiates the connection to the firebase realtime database, creating the model, making it reactive and creating the router.

#### VueRoot.jsx

Is the root file, determines layout of other presenters using flexbox, handles router implementation.

#### headerPresenter.jsx

Handles headerView.jsx, implements login and sign out when the custom event for the login button being pressed is initiated, also handles "static" yodafying which represents all text on the website which does not change depending on the search query. Also handles the basic search custom events.

#### searchPresenter.jsx

Handles searchView.jsx, which is mainly all of the custom events needed to handle all of the different parameters and updating them when needed along with initiating the search itself.

#### searchResultPresenter.jsx

Handles searchResultView, handles both what to show during the promise state and the custom event of the user selecting a game to show in detail.

#### savedPagesPresenter.jsx

Handles savedPagesView, as of right now only returns the view without any condition and handles no custom events.

### Views

#### headerView.jsx

Is the implementation for the header UI, which contains the title which can be pressed to go back to the start screen, a login/signout button which also shows the users profile picture in the top right when logged in, the saved pages button also only appears when the user is logged in. Search dropdown menu accepts a string query for a search, and can initiate a search on that or direct the user to a detailed search screen where additional details can be given. Yodafy button toggles the value of the yodafy model attribute between true/false, which should yodafy any static text on the site.

All buttons are a third party component, https://coreui.io/vue/docs/, along with the dropdown menu, both the dropdown itself and most of its content.

#### pageDetailsView.jsx

Is the implementation for the game details UI, which will contain a lot of information about the selected game and a button at the top left of the screen to go back to the searchResultView.

Implementation for the detailed search UI, uses third party components from https://coreui.io/vue/docs/ to create a form where the user can input values, either string or integers within a range.

#### searchView.jsx

Implementation for the detailed search UI, uses third party components from https://coreui.io/vue/docs/ to create a form where the user can input values, either string or integers within a range.

#### searchResultView.jsx

Implementation for the search result UI, uses callbacks to generate individual divs based on the search parameters from searchView, also uses multiple third party component button from https://coreui.io/vue/docs/.

#### savedPagesView.jsx

Implementation for the saved pages UI, is only a page which lets the user go back to the home page or the search page so far. Uses third party component buttons from https://coreui.io/vue/docs/.

### Model

Some files will not be explained explicitly, if they copied directly from the lab, such as the resolvePromise.js or teacherFetch.js

#### fireBaseModel.js

This file handles all interactions with the firebase database, for both authentication and persistence. Data will only be read or written if the user is signed in, with the user being able to read any data but only write to their own, as a form of per-user persistence.

#### websiteModel.js

This file represents the model itself, with the different variables which are needed by the presenter and views, along with the promises for searching for data. It also holds data about the current user, to allow the headerView to display their current user icon for the logged in google account.

#### websiteSource.js

Handles fetching, removing any unspecified parameters to simplify the query.
