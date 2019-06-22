'use strict'

var _css = require('./index.css');
var _mm = require('../../util/mm.js');
var navi_simple = require('../common/navi-simple/index.js');
var header = require('../common/header/index.js');
var slider = require('../../util/slider/index.js')
var footer = require('../common/footer/footer.css');

var bannerTemplate = require('./banner.string');

$(function() {
    var htmlBannerTemplate = _mm.renderHtml(bannerTemplate);
    $('.banner-con').html(htmlBannerTemplate);
    var $unslider = $('.banner').unslider({dots:true});
    $('.banner-con .banner-arrow').click(
        function(){
            var forward = $(this).hasClass('prev')?'prev':'next';
            $unslider.data('unslider')[forward]();
        }
    );
});