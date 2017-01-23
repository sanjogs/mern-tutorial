'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugTrackerSchema = new Schema({
    id:Number,
    priority:String,
    status:String,
    owner:String,
    title:String
})


module.exports = mongoose.model('Bug', BugTrackerSchema);