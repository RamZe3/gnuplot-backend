const Router = require('express')
const router = new Router()
const templateController = require('../controllers/template.controller')

router.post('/templates', templateController.createTemplate)
router.post('/templates/plot', templateController.plotTemplate)
router.get('/templates/plot/:id', templateController.plotTemplateById)

router.get('/templates/save/', templateController.createTemplateByInviteStr)

router.get('/templates/', templateController.getTemplateByUserId)
router.put('/templates', templateController.updateTemplate)

module.exports = router