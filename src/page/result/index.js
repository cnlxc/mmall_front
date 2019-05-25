'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var navi_simple = require('../common/navi-simple/index.js');
var header = require('../common/header/index.js');
var nav_side = require('../common/nav-side/index.js');
nav_side.init({name : 'user-center'});
var footer = require('../common/footer/footer.css');

var type = _mm.getUrlParam('type') || 'default';
$('.'+type+'-success').show();