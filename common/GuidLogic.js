var CryptoJS = require('crypto-js')
const { uuid } = require('uuidv4');
//console.log(uuid());
//import CryptoJS from "crypto-js";

function newGuid() {
    //console.log(uuid());
    return uuid()
}
function shortNewGuid() {
    let str = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
    return str.split('-')[0]
}

function getHash(password) {
    return CryptoJS.MD5(password).toString()
}

//export {newGuid, shortNewGuid, getHash}

module.exports = newGuid