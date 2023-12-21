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

Note that if the program is run locally, multiple windows may cause some issues, specifically with authentication since when one window signs out the auth token will be set to null, but the other windows user located in the model will not be updated, which may cause issues such as not having the permissions to perform writes. This is not an issue for the hosted version, only the localy hosted one since each window uses the same application state. 