'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-service.js');
var navi_simple = require('../common/navi-simple/index.js');
var header = require('../common/header/index.js');
var nav_side = require('../common/nav-side/index.js');
//nav_side.init({name : 'user-center'});
var footer = require('../common/footer/footer.css');
var page_data = {

    oldpassword        : null,
    newPassword     : null,
    confirmPassword : null
}
var page = {
    init : function(){
        this.load();
        this.bindEvent();
    },
    load : function(){
        nav_side.init({name : 'user-pass-update'});
    },
    bindEvent : function(){
        console.log("koko ni iru");
       
        $('.btn-submit').click(function(){
            page.submit();
        });
        $('.user-info').keyup(function(e){
            if(e.keyCode == 13)
             page.submit();
        });
        

    },
    submit : function(){

        page_data.oldpassword     = $.trim($('#old-password').val());
        page_data.newPassword     = $.trim($('#new-password').val());
        page_data.confirmPassword = $.trim($('#confirm-password').val());
        var validateResult =  page.validateParameter();
        if(validateResult.status){
            _user.updatePassword({
                oldPassword : page_data.oldpassword,
                newPassword : page_data.newPassword
            },function(msg){
                _mm.successTips(msg);
            },function(err){
                _mm.errorTips(err);
            });

        }else{
            _mm.errorTips(validateResult.msg);
        }

    },
    validateParameter : function(){
        var result = {
            status : false,
            msg    : ''
        }
        console.log("old pas "+page_data.oldpassword);
        if(!_mm.validate(page_data.oldpassword,'require')){
            result.msg = "旧密码不能为空";
            return result;
        }
        if(!page_data.newPassword || page_data.newPassword.length <5){
            result.msg = "密码长度不得小于6位";
            return result;
        }
        if(page_data.newPassword !== page_data.confirmPassword){
            result.msg = "两次输入的密码不一致";
            return result;
        }
        result.status = true;
        result.msg    = "验证参数成功";
        return result;
    }

}

$(function (){
    page.init();
});
