const { getAllProjectModul, getProjectByIdModul, createProjectModul, deleteProjectModul, updateProjectModul, parsialUpdateProjectModul } = require('../models/project')

module.exports = {
  getAllProject: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'projectName'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 50
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAllProjectModul(searchKey, searchValue, limit, offset, result => {
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
    })
  },
  getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params

      const result = await getProjectByIdModul(projectId)
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
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  createProject: async (req, res) => {
    try {
      const { projectName, projectDesc, projectType } = req.body

      const result = await createProjectModul(projectName, projectDesc, projectType)
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
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params

      const result = await deleteProjectModul(projectId, result => {
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

      if (result.length) {
        // passed
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to delete!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data project not found'
      })
    }
  },
  updateProject: async (req, res) => {
    try {
      const { projectId } = req.params
      const { projectName, projectDesc, projectType } = req.body

      if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
        const result = await updateProjectModul(projectId, projectName, projectDesc, projectType, result => {
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

        if (result.length) {
          // passed
        } else {
          res.status(404).send({
            success: false,
            message: `Project with id ${projectId} not found`
          })
        }
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },
  parsialUpdateProject: async (req, res) => {
    try {
      const { projectId } = req.params
      const {
        projectName = '',
        projectDesc = '',
        projectType = ''
      } = req.body

      if (projectName.trim() || projectDesc.trim() || projectType.trim()) {
        const dataColumn = Object.entries(req.body).map(item => {
          const queryDynamic = parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]} = '${item[1]}'`
          return queryDynamic
        })

        const result = await parsialUpdateProjectModul(projectId, projectName, projectDesc, projectType, dataColumn, result => {
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

        if (result.length) {
          // passed
        } else {
          res.status(404).send({
            success: false,
            message: `Project with id ${projectId} not found`
          })
        }
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Some field must be filled!'
      })
    }
  }
}
