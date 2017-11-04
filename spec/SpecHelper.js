function playManyDifferent (pinsHit) {
  for (var playIndex = 0; playIndex < pinsHit.length; playIndex++) {
    game.play(pinsHit[playIndex])
  }
}

function playManySame (pinsHit, times) {
  for (var playIndex = 0; playIndex < times; playIndex++) {
    game.play(pinsHit)
  }
}
