//Features Customizable Set
//Basics Settings
let streamerName = "IcyDaNerd";
let maxPlayers = 10;
let allowGameReset = true;
let allowWind = true;
let displayHighScoreValue = 95;
let windDirection = "right";


let broadcastId;
let userId;
let error = false;
//let publicStreamerId = '7081785';
let lastMessage = "";

//------------------------------------- BASICS -----------------------------------//
async function RunCode() {
  startEventListeners();
}

async function Retry() {
  console.log("Retrying in 5 seconds");
  await sleep(5000);
  error = false;
  FetchBroadcastId();
}

async function FetchBroadcastId() {
  console.log("Fetching Broadcast....");
  var proxyUrl = "https://younow-cors-header.herokuapp.com/?q=",
    targetUrl =
      "https://api.younow.com/php/api/broadcast/info/curId=0/user=" +
      streamerName;
  var json = fetch(proxyUrl + targetUrl)
    .then((blob) => blob.json())
    .then((data) => {
      json = JSON.stringify(data, null, 2);
      var done = JSON.parse(json);
      //console.log("date on connect : " + done);
      if (json.length < 1) {
        console.log("No Data Found");
        error = true;
      } else if (done.errorCode != 0) {
        console.log("User not online or not found");
        error = true;
      }
      if (error) {
        console.log("Error Found Retrying");
        Retry();
        return;
      } else {
        userId = done.userId;
        broadcastId = done.broadcastId;
        console.log("Data Found");
        //console.log(done);
        FetchEvent();
        return;
      }
    })
    .catch((e) => {});
}

function FetchEvent() {
  //First Startup Connection:
  console.log("Succesfully Connected to WebSocket");
  let pusher = new Pusher("d5b7447226fc2cd78dbb", {
    cluster: "younow",
  });

  let channel = pusher.subscribe("public-channel_" + userId);


  channel.bind("onChat", function (data) {
    if (data.message !== "undefined") {
      for (let i = 0; i < data.message.comments.length; i++) {
        //console.log(data);
        lastMessage = data.message.comments[i].comment;
        let isSub = data.message.comments[i].subscriptionType;
        let isMod = data.message.comments[i].broadcasterMod;
        let nickName = data.message.comments[i].name;
        let input = data.message.comments[i].comment;
        let id = data.message.comments[i].userId;
        let crownsAmount = data.message.comments[i].globalSpenderRank;
        let streamerId = data.message.comments[i].broadcasterId;
        publicStreamerId = streamerId;
        
        if (currentUsers[nickName]) return; //this will return out if user is still dropping
        let shouldDrop = true;
        // blowWind(id, nickName, windDirection);
        if (isMod || isSub || nickName == streamerName) {
          //gives mods the ability to reset the game with chat command ResetGame
          input = input.toUpperCase();
          if (input.includes("WINDL") && allowWind == true) {
            shouldDrop = false;
            windDirection = "left";
            blowWind(id, nickName, windDirection);
          } else if (input.includes("WINDR") && allowWind == true) {
            shouldDrop = false;
            windDirection = "right";
            blowWind(id, nickName, windDirection);
          }
        }
        //allows subs and mods to add wind to the board
        if (isMod || isSub || nickName == streamerName) {
          if (input.includes("RESETGAME") || input.includes("GAMERESET")) {
            if ((allowGameReset)) {
              window.location.reload();
              shouldDrop = false;
              return false;              
            }
          }
        }
        
        //if all clear to drop a new player shouldDrop = true
        if (shouldDrop) {
          doDrop("https://younow-cors-header.herokuapp.com/?q=" +
            "https://ynassets.younow.com/user/live/" + id + "/" + id + ".jpg",
            nickName,
            data
          );
        }
      }
    }
  });
}

async function FetchChatterId() {
  console.log("Fetching Broadcast....");
  var proxyUrl = "https://younow-cors-header.herokuapp.com/?q=",
    targetUrl =
      "https://api.younow.com/php/api/broadcast/info/curId=0/user=" +
      streamerName;
  var json = fetch(proxyUrl + targetUrl)
    .then((blob) => blob.json())
    .then((data) => {
      json = JSON.stringify(data, null, 2);
      var done = JSON.parse(json);
      //console.log("date on connect : " + done);
      if (json.length < 1) {
        console.log("No Data Found");
        error = true;
      } else if (done.errorCode != 0) {
        console.log("User not online or not found");
        error = true;
      }
      if (error) {
        console.log("Error Found Retrying");
        Retry();
        return;
      } else {
        userId = done.userId;
        broadcastId = done.broadcastId;
        console.log("Data Found");
        console.log(done);
        FetchEvent();
        return;
      }
    })
    .catch((e) => {});
}
//----------------------------- Additional Functions -----------------------------------------//

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
