# Red-Badge-Server

## Endpoints: 

#### User:
* /user/signup => create an account
* /user/login => login to an existing account
* /user/users => returns all users, along with their posts and their comments

#### Feed endpoints:
* /feed/all => returns all memes
* /feed/:username => returns all memes posted by specified user

#### Voting:
* /vote/:postId => updates the vote count

#### Memes: 
* /mymemes/new => upload a meme
* /mymemes/ => returns all memes posted by the logged in user
* /mymemes/delete/:postId => deletes the specified meme
