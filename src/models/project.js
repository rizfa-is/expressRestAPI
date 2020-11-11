const db = require('../helpers/db')

module.exports = {
  getAllProjectModul: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  deleteProjectModul: (projectId, res) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
          db.query(`DELETE FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: `Item project id ${projectId} has been deleted!`
              })
            } else {
              res.status(404).send({
                success: false,
                message: 'Item project failed to delete!'
              })
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
