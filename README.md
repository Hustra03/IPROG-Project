# IPROG-Project

This project is for the course DH2642 Interaction Programming and the Dynamic Web, where a website should be created, which incorporates per-user persitence, with a focus on creating good user experience while following the model-view-presenter structure.

People Involved:

Erik Paulinder, Git account: Hustra03 and eripau, Canvas ID: 143241

Eliaz Biderstrand, Git account:EliazBid , Canvas ID: 143208

Viktor Fredlund, Git account: MrBregott, Canvas ID: 143155

William Ma Jönsson, Git account: EroHex, Canvas ID: 143089


# Mid-project review

This section will discuss the project, as of 2023-12-07, which is preserved in the branch "Mid-Project review" to allow continued development during the review process. 

[Hosting Link](https://iprog-tw3-53504.web.app/#/ "Yodas Gaming Wiki")

## Short description of your project

The website which is to be developed is to a gaming wiki, with information about different games, potentially also including screenshots and achivements. To put a unique spin on the concept there will be the option to translate any larger text to match the speaking pattern of the well known Star Wars charachter Yoda using an API translator. This will hopefully make the site memorable and something which users may wish to share with others who are also interested in video games or star wars content. 

## What you have done

- Header implemented, with login functionality using google authenticator, along with per-user persitence for certain elements (currently only for the yodafy value but saved pages and viewing history are also to be stored). 

- Searching, both a simple search using only a text query in a dropdown menu but also a more detailed search in on a seperate page where additional aspects can be detailed about the query, such as the number of results to return between 5 and 20, how exact and fuzzy the result should be ext. Currently limited to searching for games. 

- 

## What you still plan to do

-Implement saved pages, with the user being able to save pages under different categories, either a small set of predefined options or potentially even custom tags. 

-Potentially allowing searches for other thing than games, such as publishers, achivements/dlc/series for a particular game ext. 

- Viewing history, which shows the last 10 or so pages wisited on the left hand side of the screen,
which is persisted and can be pressed to easily go back to one of them. 

## Your project file structure (short description/purpose of each file)

### Presenter 

#### index.jsx

This is the bootstrapping file, which creates the app and initiates the connection to the firebase realtime database, creating the model, making it reactive and creating the router. 

#### VueRoot.jsx

#### headerPresenter.jsx

#### searchPresenter.jsx

-

### Views 

#### headerView.jsx

#### pageDetailsView.jsx

#### searchView.jsx

### Model 