function blowWind(userid, userName, direction) {
  //if a wind call was made add extra x velocity and show image
  windDirection = direction;
  if (blowingWind) return; //if wind is blowing don't construct more than one..
  const windBlows = document.createElement("div");
  blowingWind = true;
  windBlows.className = "wind";
  if (direction == "left") {
    windBlows.style =
      "transform: scaleX(-1);animation: blowleft 2s ease-in-out;";
    windBlows.innerHTML =
      '<img class="hostimg" src="https://ynassets.younow.com/user/live/' +
      userid +
      "/" +
      userid +
      '.jpg"></img><img class="cloud" src="images/windblowingTOright.png"></img>';
    //document.body.appendChild(windBlows);
  } else if (direction == "right") {
    windBlows.style =
      "transform: scaleX(1);animation: blowright 2s ease-in-out;";
    windBlows.innerHTML =
      '<img class="hostimg" src="https://ynassets.younow.com/user/live/' +
      userid +
      "/" +
      userid +
      '.jpg"></img><img class="cloud" src="images/windblowingTOright.png"></img>';
  }
  document.body.appendChild(windBlows);
  setTimeout(() => {
    blowingWind = false;
    document.body.removeChild(windBlows);
  }, 2000);
}
