'user strict';

var _mm = require('../util/mm.js');

var _cart = {
    //得到购物车数量
    getCartCount : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
    
}

module.exports = _cart;