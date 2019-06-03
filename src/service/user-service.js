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
    //用户注册
    register : function(registerInfo,resolve,reject){
        _mm.request({
            data    : registerInfo,
            url     : _mm.getServerUrl('/user/register.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        }

        );

    },
    //拿到提示问题
    get_question : function(username,resolve,reject){
        _mm.request({
            data    : {username : username},
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });

    },
    check_anwser : function(checkedInfo,resolve,reject){
        _mm.request({
            data    : checkedInfo,
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });

    },
    resetPassword : function(newPassword,resolve,reject){
        _mm.request({
            data    : newPassword,
            url     : _mm.getServerUrl('/user/forget_password_reset.do'),
            method  : 'POST',
            success : resolve,
            error   : reject 
            }
        );
    },
    getUserInfo : function(resolve,reject){
        _mm.request({

            url   : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },
    updateUserInfo : function(updateUserInfo,resolve,reject){
        _mm.request({
            data   : updateUserInfo,
            url   : _mm.getServerUrl('/user/update_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },
    updatePassword : function(formData,resolve,reject){//看API
        _mm.request({
            data   : formData,
            url   : _mm.getServerUrl('/user/**.do'),
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    }

}

module.exports = _user;