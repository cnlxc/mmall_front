'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var header = require('../common/header/index.js');
var nav_side = require('../common/nav-side/index.js');
nav_side.init({name : 'user-center'});
var footer = require('../common/footer/footer.css');
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
            password : $.trim($('#password').val()),
            email    : $.trim($('#email').val()),
            phone    : $.trim($('#phone').val()),
            question : $.trim($('#question').val()),
            answer   : $.trim($('#key').val()),
        };

        var validateResult = this.formValidate(formData);
        //验证通过进行登陆
        if(validateResult.status){
            _user.login(
                formData,//登陆数据
                function(res){//成功操作
                    //window.location.href = _mm.getUrlParam('redirect') || './index.html';
                    console.log('success but not affect');
                    window.location.href = _mm.getFrontUrl('index.html');
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
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式错误';
            return result;
        }
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号不正确';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '问题答案不能为空';
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