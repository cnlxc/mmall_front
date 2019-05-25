'use strict';

require('./index.css');
var _mm = require('../../../util/mm.js');
var _user = require('../../../service/user-service.js');
var _cart = require('../../../service/cart-service.js')
var nav={
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登陆点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册事件
        $('.js_logout').click(function(){
            window.location.href = "./register.html";
        });
        //退出点击事件
        $('.js_logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(
            function(res){
                //check成功的处理函数定义，即把用户名字赋予到相应位置
                $('.user.not-login').hide().siblings('.user.login').show()
                    .find('.username').text(res.username);
            },function(errMsg){
                //do nothing
            }
        );
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(
            function(res){
                $('.cart-count').text(res || 0);
            },
            function(errMsg){
                $('.cart-count').text(0);
            });
    }
};

module.exports = nav.init();