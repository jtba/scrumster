# Scrumster Project
**_Help your team and yourself by using this daily task tracker_**

Performing daily stand-ups without discussing what was completed the day prior ignore critical information needed to evaluate how you and your team is performing on a daily basis. The Scrumster application complements your daily stand-up by allowing individuals to thoughtfully determine what their tasks are for the day, and easily keep track of tasks missed.  

Features: 

* Helps to improve your ability to estimate time taken on tasks and your ability to accomplish them
* Encourages breaking down user stories into manageable chunks
* Distinguishes between planned tasks vs unplanned, further enabling managers to determine if outward forces are impacting employees
* As a manager, improves your one on one's by giving your employees solid stats on their performance
* As a manager, improves your reporting to upper management by your ability to individually list each employee's accomplishments
* Promotes high performing teams 

![screenshot](https://github.com/jtba/scrumster/blob/master/docs/scrumster_1.png)
![screenshot](https://github.com/jtba/scrumster/blob/master/docs/scrumster_2.png)

## Getting Started

This application is in the very early stages of development. The frontend is currently using AngularJS (1.x) with plans to convert to React.

### Prerequisites

* Webserver
* MongoDB
* NodeJS

### Installing
**Generic:** 
1. Clone the repo into an empty directory
```git
git clone https://github.com/jtba/scrumster.git .
```

**Frontend:**
1. Place the public directory in your web root directory
2. Configure the your application to talk to the API by editing the /public/app/config.js file 
```javascript
app.factory('Config', function() {
  return {
      apiURL : 'http://localhost:9000/api/v1/'
  };
});
```
3. Start your web server

**API:**
1. Ensure MongoDB is running
2. start the service by executing: node node/index.js from the root of the project directory

## Authors

* **Jason Baldwin** - *Initial work* - [JTBA](https://github.com/jtba)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Thanks to all of the third party libraries that have brought this project here so far
