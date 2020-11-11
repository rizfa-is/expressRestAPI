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
  getProjectByIdModul: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createProjectModul: (projectName, projectDesc, projectType) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO project (projectName, projectDesc, projectType)
        VALUES ('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
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
  },
  updateProjectModul: (projectId, projectName, projectDesc, projectType, callback) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
          db.query(`UPDATE project SET projectName = '${projectName}', projectDesc = '${projectDesc}', projectType = '${projectType}' WHERE project_id = ${projectId} `, (err, result, _fields) => {
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
  },
  parsialUpdateProjectModul: (projectId, projectName, projectDesc, projectType, dataColumn, callback) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
          db.query(`UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (err, result, _fields) => {
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
