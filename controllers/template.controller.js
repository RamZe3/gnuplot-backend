const db = require('../db')
const TemplateService = require('../services/template.service')
const Template = require("../models/Template");

class TemplateController{
    async createTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data)
        const newTemplate = await TemplateService.createTemplate(template)
        res.json(newTemplate)
    }

    async plotTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data)
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
        console.log(id)
        const templates = await TemplateService.getTemplateByUserId(id)
        res.json(templates)
    }

    async createTemplateByInviteStr(req, res){
        const {invite_str, user_id} = req.query
        //const invite_str = req.query.invite_str
        //const user_id = req.query.user_id
        console.log("createTemplateByInviteStr")
        const templates = await TemplateService.createTemplateByInviteStr(invite_str, user_id)
        res.json(templates)
    }

    async updateTemplate(req, res){
        const {title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data} = req.body
        const template = new Template(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data)
        const uTemplate = await TemplateService.updateTemplate(template)
        res.json(uTemplate)
    }
}

module.exports = new TemplateController()