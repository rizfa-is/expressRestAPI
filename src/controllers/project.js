const { } = require('../models/project')

module.exports = {
  getAllProject: (req, res) => {
    db.query('SELECT * FROM project', (err, result, _fields) => {
        if (!err) {
          if (result.length) {
            res.status(200).send({
              success: true,
              message: 'Project List',
              data: result
            })
          } else {
            res.status(404).send({
              success: false,
              message: 'Item project not found!'
            })
          }
        } else {
          res.status(500).send({
            success: false,
            message: 'Internal Server Error!'
          })
        }
    })
}