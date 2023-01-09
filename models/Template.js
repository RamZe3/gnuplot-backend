class Template{
    constructor(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id, id) {
        this.id = id
        this.title = title
        this.x_range_l = x_range_l
        this.x_range_r = x_range_r
        this.y_range_l = y_range_l
        this.y_range_r = y_range_r
        this.x_tics = x_tics
        this.y_tics = y_tics
        this.func = func
        this.grid = grid
        this.p_script = p_script
        this.user_id = user_id
    }
}

module.exports = Template