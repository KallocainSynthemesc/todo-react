# Todo demo application

## User "login" 
For creating a user no password is required. I neglected security since securing the backend with oauth2 would have implied implementing a authorization server and converting the REST service into a oauth2 Resource Server.
![Alt Text](https://s8.gifyu.com/images/chrome_kMZdNR9SbH.gif)

This action calls the REST service and pushes the User on the Database
![Alt Text](https://i.ibb.co/xC0zPF4/hibernate.png)
![Alt Text](https://i.ibb.co/QdXySVP/intervenant-Hugo.png)

## List Todos
After a user name is entered the user gets delegated to the todo list view. New Todos can be added.
![Alt Text](https://s8.gifyu.com/images/chrome_aQ8zbgThHJ.gif)

Adding a todo again calls the REST service which puts a new entry in the database
![Alt Text](https://i.ibb.co/KFmmQ87/todotable.png)

A todo can be checked as done. This triggers an update on the todo and the list gets resorted.
![Alt Text](https://s8.gifyu.com/images/chrome_NGVYsYHjvG.gif)

## Details view
A user can click on the 'Show Details' button to show a more detailed view of the Todo. There he can change the default description of the Todo
![Alt Text](https://s8.gifyu.com/images/chrome_uLMbrwmRD4.gif)

## Backend mock
To mock the backend I decided to work with localStorage. I first wanted to use Mock Service Worker but ran into an issue with my environment setup.

### Could not proxy request /mockServiceWorker.js from localhost:3000 to http://localhost:8080/

To make Mock Service Worker function properly I would need to remove my proxy entry in the package.json. The problem with that is that I could not forward my requests
to the actual resource server anymore. I would need to choose between the Mock Service Worker or my actual resource server or constantly change the proxy entry. 
I decided that this solution is not as flexible as making my own fetch fallback.
While this causes some errors in the browser console (because a real fetch attempt fails) I don't rely on a mock framework and I don't constantly need to change the package.json if I want to test my backend again.
For pure Front-end development the Mock Service Worker is a great solution to get things started, in my case it was causing unneccessary overhead.
I know that the requirement was to use a mocked backend. I mocked the backend indeed but it is not mocked in a way that many front-end devs would consider extremly professional.
I presonally need to admit that I could not find a better alternative than the one presented in the Fetcher.js file.


