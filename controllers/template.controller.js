const db = require('../db')
const TemplateService = require('../services/template.service')
const Template = require("../models/Template");

class TemplateController{
    async createTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id)
        const newTemplate = await TemplateService.createTemplate(template)
        res.json(newTemplate)
    }

    async plotTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id)
        const rsc = await TemplateService.plotTemplate(template)
        res.json(rsc)
    }

    async plotTemplateById(req, res){
        const id = req.params.id
        const rsc = await TemplateService.plotTemplateById(id)
        res.json(rsc)
    }

    async getTemplateByUserId(req, res){
        const id = req.query.id
        const templates = await TemplateService.getTemplateByUserId(id)
        res.json(templates)
    }

    async updateTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id, id} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id, id)
        //template.id = id
        //template.title = title
        const uTemplate = await TemplateService.updateTemplate(template)
        res.json(uTemplate)
    }
}

module.exports = new TemplateController()