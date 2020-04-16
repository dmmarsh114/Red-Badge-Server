# SupreMemes (Server)

This application was created to give users the ability to create custom memes

<br/>

## Authors
Will Chestnut - wchestnuti27 - view my individual github page at https://github.com/wchestnuti27

Daniel Marsh - dmmarsh114 - view my individual github page at https://github.com/dmmarsh114

Nathan Gaffney - NathanGaffney - view my individual github page at https://github.com/NathanGaffney

<br/>

## App Features
* Create memes by using local image files
* Stores memes in an user acct page
* Gives a user the ability to vote on each meme
* Allows users the ability to edit custom meme comments
* Allows the user the ability to delete the meme on the acct page

<br/>

## Endpoints: 

#### User:
* /user/signup - create an account
* /user/login - login to an existing account
* /user/users - returns all users, along with their posts and their comments

#### Feed endpoints:
* /feed/all - returns all memes
* /feed/:username - returns all memes posted by specified user

#### Voting:
* /vote/:postId - updates the vote count

#### Memes: 
* /mymemes/new - upload a meme
* /mymemes/ - returns all memes posted by the logged in user
* /mymemes/delete/:postId - deletes the specified meme
