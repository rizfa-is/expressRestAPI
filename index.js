const express = require('express')
const db = require('./src/helpers/db')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.send('Backend Android2!')
})

app.get('/project', (_req, res) => {
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
})

app.post('/project', (req, res) => {
  const { projectName, projectDesc, projectType } = req.body

  db.query(`INSERT INTO project (projectName, projectDesc, projectType) 
  VALUES ('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, _fields) => {
    if (!err) {
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Success add project!'
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
})

app.delete('/project/:projectId', (req, res) => {
  const { projectId } = req.params

  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
    if (result.length) {
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
      res.status(404).send({
        success: false,
        message: 'Data project not found'
      })
    }
  })
})

app.put('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  const { projectName, projectDesc, projectType } = req.body

  if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
      if (result.length) {
        db.query(`UPDATE project SET projectName = '${projectName}', projectDesc = '${projectDesc}', projectType = '${projectType}' WHERE project_id = ${projectId} `, (_err, result, _fields) => {
          console.log('Notice : ' + result.affectedRows)
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Project with id ${projectId} has been update`
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Failed to update data!'
            })
          }
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Project with id ${projectId} not found`
        })
      }
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'All field must be filled!'
    })
  }
})

app.patch('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  const {
    projectName = '',
    projectDesc = '',
    projectType = ''
  } = req.body

  if (projectName.trim() || projectDesc.trim() || projectType.trim()) {
    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
      if (result.length) {
        const dataColumn = Object.entries(req.body).map(item => {
          const queryDynamic = parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]} = '${item[1]}'`
          return queryDynamic
        })
        console.log(dataColumn)
        db.query(`UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (_err, result, _fields) => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Project with id ${projectId} has been updated`
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Failed to update data project'
            })
          }
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Project with id ${projectId} not found`
        })
      }
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'Some field must be filled!'
    })
  }
})

app.get('/project/:projectId', (req, res) => {
  const { projectId } = req.params

  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
    if (!err) {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${projectId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data project with id ' + projectId + ' not found'
        })
      }
    } else {
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Listen app backend on port ${port}`)
})
