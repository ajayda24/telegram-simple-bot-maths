const express = require('express')
const app = express()

var telegramBot = require('node-telegram-bot-api')

var token = '1681178888:AAHYwYDPkUEVk4qmMGlrnzEasFmLuy3SRxQ'

var opt = { polling: true }

var bot = new telegramBot(token, opt)


var array = [0,0]

bot.on('message', (msg) => {
  var random1 = Math.floor(Math.random() * 20 + 1);
  var random2 = Math.floor(Math.random() * 40 + 1);
  var correctAnswer = random1 + random2;

  const generatMessage = () => {
    var newQuestion = "Question : "+random1 + ' + ' + random2
    newQuestion.toString()
    var optionRandomFor1 = (
      correctAnswer + Math.floor(Math.random() * 3 + 1)
    ).toString()
    var optionRandomFor2 = (
      correctAnswer - Math.floor(Math.random() * 5 + 1)
    ).toString()
    var optionRandomFor3 = (
      correctAnswer + Math.floor(Math.random() * 2 + 1)
    ).toString()

    optionRandomFor4 = correctAnswer.toString()
    array[0] = optionRandomFor4
    array[1] = array[1]+1

    var answerArray = [optionRandomFor1, optionRandomFor2, optionRandomFor3, optionRandomFor4]

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }
    
    var keyboardArray = shuffle(answerArray)
    

    bot.sendMessage(msg.chat.id, newQuestion, {
      reply_markup: {
        keyboard: [keyboardArray],
      },
    })
  }


  if (msg.text == '/start') {
    var reply =
      "Welcome to AJ Daniel's bot \n Click to start questions. \n/startQuestion"
    bot.sendMessage(msg.chat.id, reply)
  } else if (msg.text == '/startQuestion') {
    generatMessage()
  } else if (msg.text != '/start' && msg.text != '/startQuestion') {
    var review = ''
    if (msg.text == array[0]) {
      review = 'Right Answer'
      var score = 'Score = ' + array[1]
      bot.sendMessage(msg.chat.id, score)
      bot.sendMessage(msg.chat.id, review)
      setTimeout(() => {
        generatMessage()
      }, 500);
      
    } else {
      review = 'Wrong Answer'
      var correctValue = array[0]
      var correctAnswer = 'Correct Answer = ' + correctValue
      var score = "Score = "+array[1]
      bot.sendMessage(msg.chat.id, review)
      bot.sendMessage(msg.chat.id, correctAnswer)
      bot.sendMessage(msg.chat.id, score)
      bot.sendMessage(
        msg.chat.id,
        'Click to start questions. \n/startQuestion',
        {
          reply_markup: JSON.stringify({
            hide_keyboard: true,
          }),
        }
      )
      
        
    }
  }
})

let port = process.env.PORT
if (port == null || port == '') {
  port = 3000
}

app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})
