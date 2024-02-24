var fs = require('fs')
var gnuplot = require('gnuplot');
const moment = require('moment');
const path = require('path')
const {set} = require("express/lib/application");

async function gnuplotting(template){

    if(template.p_script !== ''){
        console.log(template.p_script + " script")
        let now = moment().format('YYYY_MM_DD_hh_mm_ss');
        await gnuplot()
            //.set('terminal png size ' + template.width + ',' + template.height + ' font \"arial,12.0\"',)
            .set('terminal png size 600,480 font \"arial,12.0\"')
            .set("style data histograms\n" + template.p_script)
            .pipe(fs.createWriteStream( './plot/' + now + '.png'));
        let path1 = path.resolve('./plot/' + now + '.png')

        return "http://localhost:8080/plot/" + now + '.png'
    }

    let now = moment().format('YYYY_MM_DD_hh_mm_ss');
    //(template.x_range_l !== null && template.x_range_r !== null) ? gnuplot().set('xrange [$1:$2]', [template.x_range_l, template.x_range_r]) : console.log("ASF");
    //(template.y_range_l !== null && template.y_range_r !== null) ? gnuplot().set('yrange [$1:$2]', [template.x_range_l, template.x_range_r]) : "";
    (template.x_tics !== null) ? gnuplot().set('xtics $1', [template.x_tics]) : "";
    (template.y_tics !== null) ? gnuplot().set('ytics $1', [template.y_tics]) : "";
    //(template.x_label !== null) ? gnuplot().set('xlabel  \'$1\'', [template.x_label]) : "";
    //(template.y_label !== null) ? gnuplot().set('ylabel \'$1\'', [template.y_label]) : "";

    console.log(template.func)
    let func = template.func
    //let func = ''
    //template.func.forEach(e => func += e + ', ' )
    //func = func.slice(0, -2)

    console.log(template.width + " " + template.height + "mesto")

    await gnuplot()
        .set('terminal png size ' + template.width + ',' + template.height + ' font \"arial,12.0\"',)
        .set("style data histograms")
        .set("title \'" + template.title + "\'")
        .set('xlabel  \'' + template.x_label + '\'')
        .set('ylabel  \'' + template.y_label + '\'')
        .set('xrange [' + template.x_range_l +':' + template.x_range_r + ']')
        .set('yrange [' + template.y_range_l +':' + template.y_range_r + ']')
        //.set(template.grid ? "grid" : "asd")
        .set('xtics  \'' + template.x_tics + '\'')
        .set('ytics  \'' + template.y_tics + '\'')
        //.set("title \"TEST\"")
        //.set('zeroaxis')
        //.plot(func, {end: true})
        //.set("xtics 1")
        //.set("ytics 1")
        .set("zeroaxis")
        .set((template.grid === true) ? "grid" : "")
        //.set('label 3 center')
        .plot(func, {end: true})
        .pipe(fs.createWriteStream( './plot/' + now + '.png'));

    let path1 = path.resolve('./plot/' + now + '.png')

    //return path1.replaceAll('\\', "/")
    //TODO
    return "http://localhost:8080/plot/" + now + '.png'
}

module.exports = gnuplotting