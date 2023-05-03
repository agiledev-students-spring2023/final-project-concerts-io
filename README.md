# Concerts.io

## Product Vision Statement
- Concerts.io: A web application to provide users with concert information in their area relevant to their music listening habits. 
- Concerts.io intends to streamline the process of finding relveant concerts for music enjoyers to attend based on their listening habits by comparing the artists they listen to to the artists performing in the area

## Team Members
- [Harry Minsky](https://github.com/hminsky2002)
- [Joshua Forlenza](https://github.com/joshforlenza)
- [Mindy Wu](https://github.com/mindyjwu)
- [Lianna Poblete](https://github.com/liannnaa)

## History of the Project
Concerts.io is a website that shows you nearby concerts based on your music taste. This app was developed throughout the semester as a course project. It reached deployment on Digital Ocean May 1st. The web app consists of an express backend server, a react frontend server, and communicates with a mongodb atlas cluster for storing user data. It gathers user listener data through communication with the spotify and last fm apis, and currently sources it's concert reccomendations from the ticketmaster discovery API. 

## Hosting
The current version of concerts.io can be found at [https://seashell-app-spdzk.ondigitalocean.app/](https://seashell-app-spdzk.ondigitalocean.app/) !Note the spotify functionality can only be used by registered users due to development limitations by spotify, so authentication will not be allowed for non-registered users

## Continous Deployment
Continous deployment of the project is sourced through the digital ocean app platform, such that any pushes made to the master branch are then deployed onto the servers. The most up to date code in github is the app that will be served to users.

## Additional Resources
[Concert.io Proposal](https://github.com/agiledev-students-spring-2023/project-proposal-team1234)


# Running App
- run npm install in main directory, back-end, and front-end
- See front-end and back-end md for .env requirements
- run back-end and front-end 


