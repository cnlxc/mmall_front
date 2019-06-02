'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-service.js');
var navi_simple = require('../common/navi-simple/index.js');
var header = require('../common/header/index.js');
var nav_side = require('../common/nav-side/index.js');
//nav_side.init({name : 'user-center'});
var footer = require('../common/footer/footer.css');

var userInfoTemplate = require('./index.string');
var page = {
    init : function(){
        this.load();
    },
    load : function(){
        nav_side.init({name : 'user-center'});
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(userInfoTemplate,res.data);
            $('.panel-body').html(userHtml);
            //$('.loading').hide();
        },
        function(err){
            _mm.errorTips(errMsg);
        }
        );
    },
}

$(function (){
    page.init();
});
