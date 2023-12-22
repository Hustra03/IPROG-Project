# IPROG-Project

This project is for the course DH2642 Interaction Programming and the Dynamic Web, where a website should be created, which incorporates per-user persitence, with a focus on creating good user experience while following the model-view-presenter structure.

People Involved:

Erik Paulinder, Git account: Hustra03 and eripau, Canvas ID: 143241

Eliaz Biderstrand, Git account:EliazBid , Canvas ID: 143208

Viktor Fredlund, Git account: MrBregott, Canvas ID: 143155

William Ma Jönsson, Git account: EroHex, Canvas ID: 143089

[Hosting Link](https://iprog-tw3-53504.web.app/#/ "Yodas Gaming Wiki")


Icon link:
https://www.shareicon.net/yoda-user-71338 

APIs used: 

Game Information : https://api.rawg.io/docs/ 
Yoda Translation : https://funtranslations.com/api/yoda

Third party components:

CoreUI, Various Components: https://coreui.io/vue/docs/getting-started/introduction.html

Setup:

1. Copy the code contained in the git repository, this can be done in multiple ways explained and these are explained on github.com
2. Navigate to the Yoda Gaming folder, since this is where the actual application is located, and the application files are stored. The steps 2.X are to be done in this folder.
2.1. There are a few files which are needed for the program to function. 
2.1.1 Firstly create a file vite.config.js in the Yoda Gaming folder, which will define the vite project and its structure is the same as defined in the project setup.
2.1.2 Secondly create a file apiConfig.js in the src folder, which will define the api links and keys, you must also generate keys for the APIs, links found above.
2.1.3 Thirdly create a file firebaseConfig.js, this information can be found on the project details for the firebase project, and the project must have the following rules to match the strucutre expected of the program. 

    "ProjectGroup56": {
      "upvotes":
      {
        //Allows anyone to read upvotes, but only users to update it
        ".read": true,
        ".write": "auth.uid !== null"
      },
      "$uid": {
        //Allows anyone to read any data, but only users change their own data
        ".read": true,
        // or ".read": "auth.uid !== null" for only authenticated users (?)
        ".write": "auth.uid === $uid"
      }
    },

2.1.4 You must now install npm to the project, along with coreUI since that is the source for the third party components used in many views. 

Other comments:

Note that if the program is run locally, multiple windows may cause some issues, specifically with authentication since when one window signs out the auth token will be set to null, but the other windows user located in the model will not be updated, which may cause issues such as not having the permissions to perform writes. This is not an issue for the hosted version, only the localy hosted one since each window uses the same application state. 

