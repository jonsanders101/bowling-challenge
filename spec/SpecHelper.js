function playMany (pinsHit) {
  for (var playIndex = 0; playIndex < pinsHit.length; playIndex++) {
    game.play(pinsHit[playIndex])
  }
}

function test () {
  console.log("It worked")
}
