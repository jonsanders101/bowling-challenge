describe("Game", function () {

  beforeEach(function () {
    game = new Game()
  })

  it("stores current frame being played", function () {
    expect(game.currentFrame).toEqual(1)
  })

  it("stores current roll being played", function () {
    expect(game.currentRoll).toEqual(1)
  })

  describe("randomBowl", function () {
    it("returns a random bowl that does not exceed remaining pins", function () {
      spyOn(Math, 'random').and.returnValue(0.99)
      game.play(9)
      expect(game.randomBowl()).toEqual(1)
    })

  })

  describe("play", function () {

    it("updates current score when an argument for number of hit pins is given", function () {
      game.play(3)
      expect(game.currentScore).toEqual(3)
    })

    it("throws error when number of pins selected exceeds reminaining pins", function () {
      game.play(7)
      expect(function () { game.play(4) }).toThrow('Number exceeds reminaing pins')
    })

    it("bowls a random number when no argument is passed", function () {
      spyOn(game, 'randomBowl')
      game.play()
      expect(game.randomBowl).toHaveBeenCalled()
    })

    it("updates scorecard with number of pins hit", function () {
      game.play(4)
      expect(game.scorecard[1][1]['hitPins']).toEqual(4)
    })

    it("updates scorecard with number of remaining pins in current frame", function () {
      game.play(2)
      expect(game.scorecard[1]['remainingPins']).toEqual(8)
    })

    it("updates scorecard with score for the current frame", function () {
      playManyDifferent([3, 6])
      expect(game.scorecard[1]['frameScore']).toEqual(9)
    })

    it("adds bonus points to the frame where a strike was bowled", function () {
      playManyDifferent([10, 3, 4])
      expect(game.scorecard[1]['frameScore']).toEqual(17)
    })

    it("adds bonus points to the frame where a spare was bowled", function () {
      playManyDifferent([2, 8, 6, 3])
      expect(game.scorecard[1]['frameScore']).toEqual(16)
    })

    it("adds bonus points to previous two frames with two consecutive strikes", function () {
      playManyDifferent([10, 10, 4, 5])
      expect(game.scorecard[1]['frameScore']).toEqual(24)
      expect(game.scorecard[2]['frameScore']).toEqual(19)
    })

    describe("given that it is the last frame", function () {

      beforeEach(function () {
        playManySame(1, 18)
      })

      it("adds points to scorecard if player strikes on first roll", function () {
        game.play(10)
        expect(game.scorecard[10]['frameScore']).toEqual(10)
      })
      it("if player rolls a strike, the pins are reset for the next roll", function () {
        game.play(10)
        expect(game.scorecard[10]['remainingPins']).toEqual(10)
      })
      it("if player rolls a spare, the pins are reset for the next roll", function () {
        playManyDifferent([2, 8])
        expect(game.scorecard[10]['remainingPins']).toEqual(10)
      })
      it("if player rolls a strike on the first roll but not on the second, player can roll the bonus", function () {
        playManyDifferent([10, 8, 1])
        expect(game.scorecard[10][3]['hitPins']).toEqual(1)
      })
      it("if player rolls a strike on the first and second rolls, player can roll the bonus", function () {
        playManyDifferent([10, 10, 3])
        expect(game.scorecard[10][3]['hitPins']).toEqual(3)
      })
      it("calculates final score when game is over with no third roll", function () {
        playManySame(1, 2)
        expect(game.finalScore).toEqual(20)
      })
      it("calculates final score when game is over with a third roll", function () {
        playManyDifferent([10, 2, 3])
        expect(game.finalScore).toEqual(33)
      })
      it("prevents play when game is over", function () {
        playManySame(1, 2)
        expect(function () { game.play(0) }).toThrow("This game has ended")
      })

    })


  })

})
