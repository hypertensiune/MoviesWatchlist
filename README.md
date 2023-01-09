<h1 align="center">
<sub>
    <img src="img/img2.png" witdh=38 height=38></img>
</sub>
Hyper Movie Watchlist
</h1>

<p align="center">Keep track of your favorite movies in one place</p>

***

## Description

This is a chrome extension that allows you to keep a list of movies you like, want to see and group them by your preferences directly in your browser. 

### Features
 - Add movies and shows to custom lists directly from a google search. 
 - Mark titles as favorites and keep track of movies you've already watched. 
 - Filter the lists that you are viewing.
 - Drag & drop movies from one list to another to copy.
 - Export / import data file and cloud backup ( see Google Drive Integration ).

<div align="center">
    <img src="https://github.com/hypertensiune/Movies-Watchlist/blob/main/gifs/gif1.gif"/ width=300>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://github.com/hypertensiune/Movies-Watchlist/blob/main/gifs/gif2.gif"/ width=125>
    <br>
    <img src="https://github.com/hypertensiune/Movies-Watchlist/blob/main/gifs/img1.png" width=700/>
</div>

## Installation

- Download the release zip file and unpack it
- Go to ```chrome://extensions``` and enable ***Developer mode***
- Press **Load unpacked** and select the extension directory you extracted from the zip archive

## Google Drive integration

By default the application only allows you to download and upload files locally. To enable backing up to the cloud ( Google Drive ) you need to create a new project at [Google Cloud](https://cloud.google.com/).

- Add the following to the **manifest.json**:
```
"key": ""
```
- From ```chrome://extensions``` pack the extension
- Open the **.pem** file, copy the private key and paste it into **"key"** in **manifest.json**.
- Load the extension again in the browser and note the new given id.
- Go to [Google Cloud](https://console.cloud.google.com/), create a new project and enable the **Google Drive API**.
- Setup an **OAuth Consent Screen**. Add your account at **Test users**.
- Under **APIs & Services** create an **OAuth Client ID**. Choose **Application type: Chrome App** and enter the extension's id in **Application ID**.
- Add to **manifest.json**:
```
"oauth2": {
    "client_id": "",
    "scopes":["https://www.googleapis.com/auth/drive.file"]
}
```
- Copy the **OAuth Client ID** and paste it into **"client_id"**.
- Put the ```cloudbackup.js``` file in your extension ```scripts``` folder and add ```<script src="scripts/cloudbackup.js"></script>``` in **movies.html**

## Notes
- The extension is using the new Manifest V3.
- Developed and tested with Google Chrome. Should work with other Chromium based browsers.
