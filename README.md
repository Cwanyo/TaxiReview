# Taxi Review

This hybrid mobile application is a part of the Hybrid Mobile Development (CS 4404) project that created by Assumption University student.

# How to run this project

### How to set up:

Download and install the latest [Node.js](https://nodejs.org/en/). Then, install the Ionic CLI and Cordova:

```bash
$ npm install -g ionic cordova
```

### How to run with the Ionic CLI:

First, clone this repository and install all the required dependencies:

```bash
$ git clone https://github.com/Cwanyo/TaxiReview
$ cd TaxiReview
$ npm install
```

After all the dependencies are installed, run the following command to launch the app in the browser:

```bash
$ ionic serve
```

To run it on ios:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

or on android:
```bash
$ ionic cordova platform add android
$ ionic cordova run android
```

# Description
The application that allows users to search and check taxi reviews from other users by entering the licence number. Also, users can comment or give rating on that particular taxi.

# Features

### Account Registration 
- Login with Google or Facebook

### Find that Taxi
- Find taxi by typing in the licence plate number
- Take taxi photo and licence plate (collected for research purpose)
- Use [OpenALPR](https://github.com/openalpr/openalpr) library  for license plate recognition

### Create taxi review
- Give rating according to categories (e.g. service,politeness or cleanness)
- Comment in text

### View reviews from other users
- Show taxi details
- Overall rating and comment

# Prototype
![Prototype Taxi Review](doc/prototype.png)
Link to our [prototype](https://creator.ionic.io/share/dd7f0f339376)

# Known issues and bugs

# Contributors
- Chatchawan yoojuie
- Vorapat phorncharroenroj
