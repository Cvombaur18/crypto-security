
const bcrypt = require('bcrypt')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const Authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if (Authenticated)
          let userToReturn = { ...users[i]}
          delete userToReturn.passHash
          res.status(200).send(userToReturn)
          
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const { username, firstName, lastName, email, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);

        let newReg = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }

        users.push(newReg)
        res.status(200).send(users)
    }
}