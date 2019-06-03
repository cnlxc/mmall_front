'use strict';
var _css = require('../nav-side/index.css');
var _mm     = require('../../../util/mm.js');
var _templeateHtml = require('./index.string');
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc:'个人中心',href : '/user-center.html'},
            {name : 'order-list',  desc:'我的订单',href : '/order-list.html'},
            {name : 'user-pass-update', desc:'修改密码',href : '/user-pass-update.html'},
            {name : 'about',       desc:'关于我们',href : '/about.html'}
        ]
    },
    init : function(option){
        //extend方法 第二个参数会覆盖到到第一个对象的对应参数上
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav : function(){
        //计算active数据
        for(var i=0,count = this.option.navList.length; i<count; i++){

            if(this.option.name === this.option.navList[i].name){
 
                this.option.navList[i].isActive= true;
            }
        };
        //渲染list数据
        var navHtml = _mm.renderHtml(_templeateHtml,{
            navList : this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
}

module.exports = navSide;