const db = require('../helpers/db')

module.exports = {
  getAllProjectModul: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  deleteProjectModul: (projectId, callback) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
          db.query(`DELETE FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
            if (!err) {
              callback(result)
            } else {
              callback(err)
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
