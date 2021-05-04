let drops = [];
const target = document.querySelector(".target");
const wind = document.querySelector(".wind");
let blowingWind = false;
const leaderBoard = document.querySelector(".leader-board");
const goodScore = document.querySelector(".scoreWin");
const userName = "josh";
const currentUsers = [];
let highScores = [];
let targetName = undefined;
let targetCaught = false;

function createDropElement(url, userName) {
  const div = document.createElement("div");
  div.className = "drop";
  div.innerHTML =
    '<h4 class="username">' +
    userName +
    '</h4><img class="chute" src="images/parachute_glide.png"><div class="user-image"><img class="avatar" src="' +
    url +
    '" /> </div>';
  return div;
}

function doDrop(url, userName, data) {
  if (drops.length >= maxPlayers) return;
  currentUsers[userName] = true;
  const element = createDropElement(url, userName);
  const drop = {
    userName,
    element,
    location: {
      x: window.innerWidth * Math.random(),
      y: -100,
    },
    velocity: {
      x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 10,
      y: 2 + Math.random() * 6,
    },
  };
  drops.push(drop);
  document.body.appendChild(element);
  updateDropPos(drop);
}

function updateDropPos(drop) {
  if (drop.landed) return;
  drop.element.style.top = drop.location.y + "px";
  drop.element.style.left =
    drop.location.x - drop.element.clientWidth / 2 + "px";
}

function update() {
  drops.forEach((drop) => {
    const targetHalfWidth = (target.clientWidth - 125) / 2;
    if (drop.landed) return; //if it has landed pop out
    //if wind is blowing change velocity
    if (blowingWind) {
      if (windDirection == "left") {
        const HalfWidth = drop.element.clientWidth / 2;
        if (drop.location.x + HalfWidth >= window.innerWidth) {
          drop.velocity.x = -Math.abs(drop.velocity.x);
        } else if (drop.location.x - HalfWidth < 0) {
          drop.velocity.x = Math.abs(drop.velocity.x);
        } else {
          drop.velocity.x = -Math.abs(drop.velocity.x);
        }
        drop.location.x += drop.velocity.x - 5;
        drop.location.y += drop.velocity.y;
      } else if (windDirection == "right") {
        const HalfWidth = drop.element.clientWidth / 2;
        if (drop.location.x + HalfWidth >= window.innerWidth) {
          drop.velocity.x = -Math.abs(drop.velocity.x);
        } else if (drop.location.x - HalfWidth < 0) {
          drop.velocity.x = Math.abs(drop.velocity.x);
        } else {
          drop.velocity.x = Math.abs(drop.velocity.x);
        }
        drop.location.x += drop.velocity.x + 5;
        drop.location.y += drop.velocity.y;
      }
    } else {
      drop.location.x += drop.velocity.x;
      drop.location.y += drop.velocity.y;
    }


    //border collision
    const HalfWidth = drop.element.clientWidth / 2;
    if (drop.location.x + HalfWidth >= window.innerWidth) {
      drop.velocity.x = -Math.abs(drop.velocity.x);
    } else if (drop.location.x - HalfWidth < 0) {
      drop.velocity.x = Math.abs(drop.velocity.x);
    }

    //When landed
    if (drop.location.y + drop.element.clientHeight >= window.innerHeight) {
      drop.velocity.y = 0;
      drop.velocity.x = 0;
      drop.location.y = window.innerHeight - drop.element.clientHeight;
      drop.landed = true;
      drop.element.classList.add("landed");
      //log the score
      const { x } = drop.location;
      const score = Math.abs(window.innerWidth / 2 - x);
      const finalScore = (1 - score / targetHalfWidth) * 100;
      if (score <= targetHalfWidth) {
        //drops.push(userName) = finalScore.toFixed(0) + ' ' + drop.userName;
        if (finalScore.toFixed(0) >= displayHighScoreValue) {
          renderBigScore(drop.userName, finalScore.toFixed(0));
        }
        leaderBoard.style.display = "block";
        //check if user is on leader board and update their score if it is higher
        for (let i = 0; i < highScores.length; i++) {
          if (highScores[i].userName == drop.userName) {
            console.log("remove user");
            highScores.splice(i, 1);
          }
        }
        //console.log(highScores);
        highScores.push({
          userName: drop.userName,
          score: finalScore.toFixed(0),
        });
      }
      highScores.sort((a, b) => b.score - a.score);
      highScores = highScores.slice(0, 5);
      setTimeout(renderLeaderBoard, 500);
      drops = drops.filter((d) => d != drop);
      setTimeout(() => {
        currentUsers[drop.userName] = false;
        document.body.removeChild(drop.element);
      }, 2000);
    }
  });
}

function renderBigScore(userName, score) {
  //const leader = document.createElement('.scoreWin');
  goodScore.innerHTML =
    '<h4 class="displayHighScore">' + userName + "<br>" + score + "</h4>";
  goodScore.class = "displayHighScore";
  goodScore.update;
  setTimeout(() => {
    goodScore.innerHTML = "<div></div>";
  }, 4000);
}
function renderLeaderBoard() {
  const scores = leaderBoard.querySelector(".scores");
  scores.innerHTML = "";
  scores.innerHTML = highScores.reduce((html, { score, userName }) => {
    return html + "<p>" + score + " - " + userName + "</p>";
  }, "");
}

const userList = [
  "https://ynassets.younow.com/user/live/41701091/41701091.jpg?1617138647404",
  "https://ynassets.younow.com/user/live/2185836/2185836.jpg",
  "https://ynassets.younow.com/user/live/31162113/31162113.jpg",
];

//userList.forEach(doDrop);

function draw() {
  drops.forEach(updateDropPos);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

FetchBroadcastId();

gameLoop();
