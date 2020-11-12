const db = require('../helpers/db')
const tableNAme = 'project'
const tableSchema = 'gohire_androidapp'
db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${tableNAme}' && TABLE_SCHEMA = N'${tableSchema}'`, (_err, result, fields) => {
  console.log(result)
})

module.exports = {
  getAllProjectModul: (searchKey, searchValue, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
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
  parsialUpdateProjectModul: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
          // db.query(`UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (err, result, _fields) => {
          //   if (!err) {
          //     callback(result)
          //   } else {
          //     callback(err)
          //   }
          // })
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  parsialUpdateProjectModul2: (projectId, dataColumn) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
