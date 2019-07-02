'user strict';

var _mm = require('../util/mm.js');

var _product = {
    getProductList : function(listParam,resolve,reject){
        //var urlBase = '/product/list.do?keyword=' + ;
        //listParam.keyWord categoryId   listParam.orderBy
        
        _mm.request({
            url : _mm.getServerUrl('/product/list.do'),
            success : resolve,
            error : reject,
            data : listParam,
        
        });
        
    },


}


/*keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize*/
module.exports = _product;