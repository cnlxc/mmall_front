'user strict';

var _mm = require('../util/mm.js');

var _user = {
    login : function(userinfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            method : 'POST',
            success : resolve,
            error : reject,
            data : userinfo,
        
        });
        console.log('s');
    },
    //注销用户信息
    logout : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //调用后端接口
    checkLogin : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

}

module.exports = _user;