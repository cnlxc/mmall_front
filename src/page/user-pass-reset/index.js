'use strict'
//布局
var _css = require('./index.css');
var logo = require('../common/navi-simple/logo.css');
var header = require('../common/header/index.js');
var footer = require('../common/footer/footer.css');
//逻辑代码
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-service');

var formError = {
    show : function(errorMsg){
        console.log(errorMsg);
        $('.error-item').show().find('.err-msg').text(errorMsg);
    },
    hide : function(){
        $('.error-item').hide().find('err-msg').text('');
    }

}

var page = {
    init : function(){
        this.load();
    },
    load : function(){
       $('.div-username').show();
    },
    bindEvent : function(){
        var _this = this;
        $('#submit-stepOne').click(
            function(){
                _this.submit_stepOne();
            }
        );
        $('.user-content').keyup(
            function(e){
                //在用户信息处按下回车的话也会提交
                if(e.keyCode === 13){
                    _this.submit();
                }
            }
        );
    },
    submit_stepOne : function(){
        var username = $.trim($('#username').val);
        if(username){

        }else{
            formError.show('用户名不能为空');
        }
        $('.div-username').show();
    }

}

$(function(){
    page.init();
});