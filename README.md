# YN-OBS-Chute-Drop
Description: An OBS overlay drop game that works with YouNow chat

# Download
Download a zip of the project from this repository using the green 'Code' Button abover

# Setup
1. Create an OBS Browser source in any scene
2. Clear any CSS formating
3. Check the 'Local file' box
4. Browse for the index.html file in the extracted project folder
5. Set the Width to 1920 and the Height to 1080
6. Check the option to 'Shutdown source when not visible
7. Check the option 'Refresh browser when scene becomes active'
8. Click 'OK' to save the Browser source to the scene
8. Edit the functions.js file with a text editor, and change the "streamerName" to your YouNow user name

# Extras
* In the functions.js file you may change the following
    * maxPlayers - This will limit the maximum players allowed in the air. This will help to maintain performance.
    * allowGameReset - This will allow mods/refs, Subs, and streamer to reset the game
    * allowWind - will allow mods/refs, Subs, and streamer to call wind to the game with windl (left) or windr (right)
    * displayHighScoreValue - set the score that will display the flashing banner at the top center (e.g. 95)

