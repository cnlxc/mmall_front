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
        this.bindEvent();
    },
    load : function(){
        nav_side.init({name : 'user-center'});
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var updateUserInfo ={
                username : $.trim($('#username').val()),
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            };
            var checkResult = _this.checkUserInfo(updateUserInfo);
            if(!checkResult.status){
                _mm.errorTips(checkResult.msg +updateUserInfo.phone);
            }else{
                console.log('zheli');
                _user.updateUserInfo(updateUserInfo,
                    function(res){
                        
                        window.location.href = './user-center.html';
                    },
                    function(err){
                        _mm.errorTips(err);
                    });
            }
        })
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(userInfoTemplate,res.data);
            $('.panel-body').html(userHtml);
            
        },
        function(err){
            _mm.errorTips(errMsg);
        }
        );
    },
    checkUserInfo : function(updateUserInfo){
        var result = {
            status : true,
            msg    : ''
        }
        //验证手机
        if(!_mm.validate(updateUserInfo.phone,'phone')){
            result.status = false;
            result.msg = '手机号码格式不正确';
            return result;
        }
        //验证邮箱
        if(!_mm.validate(updateUserInfo.email,'email')){
            result.status = false;
            result.msg = '邮箱格式不正确';
            return result;
        }
        //问题不能为空
        if(!_mm.validate(updateUserInfo.question,'require')){
            result.status = false;
            result.msg = '问题不能为空';
            return result;
        }
        //问题答案不能为空
        if(!_mm.validate(updateUserInfo.answer,'require')){
            result.status = false;
            result.msg = '问题答案不能为空';
            return result;
        }
        return result;
    }
}

$(function (){
    page.init();
});
