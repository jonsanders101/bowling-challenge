describe("Scorecard", function () {
  beforeEach(function () {
    scorecard = new Scorecard()
  })

  describe("_updateScorecard", function () {
    scorecard.updateScorecard(4, 6, 2)
    expect(scorecard.frames[6].frame[2]['hitPins'])
  })
})
