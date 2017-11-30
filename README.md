# Taxi Review

This hybrid mobile application is a part of the Hybrid Mobile Development (CS 4404) project that created by Assumption University students.

Link to our [website](https://taxireview-wvn.firebaseapp.com)

# Description
The application that allows users to find and check taxi reviews from other users in realtime

<p align="center">
    <img src="doc/Poster_taxireview_A1.png" height="750px">
</p>

# Features

### Account Registration 
- Login via Google or Facebook

### Find Taxi
- Take a photo or typing in the licence plate number to find the taxi

### Create Review
- Give rating according to categories (e.g. service,politeness or cleanness)
- Comment in text

### View Reviews
- Show taxi details
- Show overall rating and comment from other users in realtime

# Getting Started

### How To Set Up:

Download and install the latest [Node.js](https://nodejs.org/en/). Then, install the Ionic CLI and Cordova:

```bash
$ npm install -g ionic cordova
```

### How To Run With The Ionic CLI:

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

# Architecture
- [Ionic 3](https://ionicframework.com) & [Cordova](https://cordova.apache.org) - The hybrid application framework
- [Firebase](https://firebase.google.com) - Used for authentication, realtime database, cloud storage and hosting

# API
- [OpenALPR](https://github.com/openalpr/openalpr) - Automatic license plate recognition library

# Known Issues And Bugs

# Contributors
- Chatchawan yoojuie
- Vorapat phorncharroenroj

