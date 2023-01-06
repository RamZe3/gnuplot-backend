const db = require('../db')
const TemplateService = require('../services/template.service')
const Template = require("../models/Template");

class TemplateController{
    async createTemplate(req, res){
        const {title, user_id} = req.body
        const template = new Template(title, user_id)
        const newTemplate = await TemplateService.createTemplate(template)
        res.json(newTemplate)
    }

    async getTemplateByUserId(req, res){
        const id = req.query.id
        const templates = await TemplateService.getTemplateByUserId(id)
        res.json(templates)
    }

    async updateTemplate(req, res){
        const {id ,title} = req.body
        const template = new Template()
        template.id = id
        template.title = title
        const uTemplate = await TemplateService.updateTemplate(template)
        res.json(uTemplate)
    }
}

module.exports = new TemplateController()