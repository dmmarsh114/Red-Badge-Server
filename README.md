# SupreMemes (Server)

This application was created to give users the ability to create custom memes

## Authors
Will Chestnut - wchestnuti27 - view my individual github page at https://github.com/wchestnuti27

Daniel Marsh - dmmarsh114 - https://github.com/dmmarsh114

Nathan Gaffney - NathanGaffney - https://github.com/NathanGaffney

## App Features
* Create memes by using local image files
* Stores memes in a user acct page
* Allows users the ability to edit custom meme comment
* Allows the user to ability to delete the meme on the acct page

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
