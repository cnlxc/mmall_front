'use strict'
//布局
var _css = require('./index.css');
var logo = require('../common/navi-simple/logo.css');
var header = require('../common/header/index.js');
var footer = require('../common/footer/footer.css');
//逻辑代码
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-service');

var data ={
    username : '',
    question : '',
    answer   : '',
    password : '',
    token    : ''
}


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
        this.bindEvent();
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
        $('#submit-stepTwo').click(
            function(){
                _this.submit_stepTwo();
            }
        );
        $('#submit-stepThree').click(
            function(){
                _this.submit_stepThree();
            }
        );
        $('.user-content').keyup(
            function(e){
                //在用户信息处按下回车的话也会提交
                if(e.keyCode === 13){
                    if(!$('.div-username').is(':hidden')){
                        _this.submit_stepOne();
                    }else if(!$('.div-question').is(':hidden')){
                        _this.submit_stepTwo();
                    }else if(!$('.div-answer').is(':hidden')){
                        _this.submit_stepThree();
                    }
                }
            }
        );
    },
    submit_stepOne : function(){
        var username = $.trim($('#username').val());
        if(username){
            data.username = username;  //保存用户名
            formError.hide();
            _user.get_question(username,
                //sucess operation
                function(res){
                    if(res.msg){
                        $('.question').text(res.msg);
                        data.question = res.msg;   
                        $('.div-username').hide().siblings(".div-question").show();
                    }else
                        formError.show('user may not have hint question');
                },
                //fail operation
                function(err){
                    formError.show(err);
                }
            );
            
        }else
            formError.show('用户名不能为空');
    },
    submit_stepTwo : function(){
        var p_answer = $('#answer').val();
        if(p_answer){
            data.answer = p_answer;
            _user.check_anwser({
                username : data.username,
                question : data.question,
                answer   : data.answer
            },
            function(res){
                data.token = res.msg;
                $('.div-question').hide().siblings(".div-answer").show();
                formError.hide();
            },function(err){
                formError.show('问题答案不正确');
            }            
            );
        }else
            formError.show('请输入提示问题答案');
    },
    submit_stepThree : function(){
        var p_password = $.trim($('#password').val() );
        console.log(p_password);
        if(p_password){
            data.password = p_password;
            _user.resetPassword({
                username    : data.username,
                newPassword : data.password,
                forgetToken       : data.token
            },
            function(res){
                //window.location.href = './result.html?type=pass-reset';
            },
            function(err){
                formError.show(err)
            });
        }else
            formError.show('new password can\'t be empty');
    }

}

$(function(){
    page.init();
});