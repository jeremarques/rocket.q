const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId = ''
    let isRoom = true 

    while (isRoom) {
      for(var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }

      const roomExistIds = await db.all(`SELECT id FROM rooms`)  
      isRoom = roomExistIds.some(roomExistId => roomExistId === roomId)
      
      if (!isRoom) {
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${pass}
        )`)
      }
    }


    /* Inserção da sala no Database */


    await db.close()

    res.redirect(`/room/${roomId}`)

    
  },
  async open(req, res) {
    const db = await Database()

    const roomId = req.params.room     
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
    
    res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead})
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}