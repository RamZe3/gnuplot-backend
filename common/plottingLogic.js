var fs = require('fs')
var gnuplot = require('gnuplot');
const moment = require('moment');
const path = require('path')

async function gnuplotting(template){
    //TODO add scripts
    let now = moment().format('hh_mm_ss');
    (template.title !== null) ? gnuplot().set('title "$1"', [template.title]) : "";
    (template.x_range_l !== null && template.x_range_r !== null) ? gnuplot().set('xrange [$1:$2]', [template.x_range_l, template.x_range_r]) : console.log("ASF");
    (template.y_range_l !== null && template.y_range_r !== null) ? gnuplot().set('yrange [$1:$2]', [template.x_range_l, template.x_range_r]) : "";
    (template.x_tics !== null) ? gnuplot().set('xtics $1', [template.x_tics]) : "";
    (template.y_tics !== null) ? gnuplot().set('ytics $1', [template.y_tics]) : "";


    let func = ''
    template.func.forEach(e => func += e + ', ' )
    func = func.slice(0, -2)

    await gnuplot()
        .set('term png')
        //.set('zeroaxis')
        //.plot(func, {end: true})
        //.set("xtics 1")
        //.set("ytics 1")
        .set("zeroaxis")
        .set((template.grid === true) ? "grid" : "")
        //.set('label 3 center')
        .plot(func, {end: true})
        .pipe(fs.createWriteStream( './plot/' + now + '.png'));

    return path.resolve('./plot/' + now + '.png')
}

module.exports = gnuplotting