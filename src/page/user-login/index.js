'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var navi_simple = require('../common/navi-simple/index.js');
var header = require('../common/header/index.js');
var nav_side = require('../common/nav-side/index.js');
nav_side.init({name : 'user-center'});
var footer = require('../common/footer/footer.css');
var _user = require('../../service/user-service');

var formError = {
    show : function(errorMsg){
        $('.error-item').show().find('.error-msg').text(errorMsg);
    },
    hide : function(){
        $('.error-item').hide().find('error-msg').text('');
    }

}

var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#submit').click(
            function(){
                _this.submmit();
            }
        );
        $('.user-content').keyup(
            function(e){
                //在用户信息处按下回车的话也会提交
                if(e.keyCode === 13){
                    _this.submmit();
                }
            }
        );
    },
    submmit : function(){
        
        var formData = {
            
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        console.log(formData.username + formData.password);
        var validateResult = this.formValidate(formData);
        //验证通过进行登陆
        if(validateResult.status){
            _user.login(
                formData,//登陆数据
                function(res){//成功操作
                    window.location.href = _mm.getUrlParam('redirect') || './index.html';
                },
                function(errMsg){//失败操作
                 formError.show(errMsg);
                });
        }else{
            formError.show(validateResult.msg);
        }

    },
    formValidate : function(formData){
        var result ={
            status : false,
            msg : ''
        };
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function(){
    page.init();
});