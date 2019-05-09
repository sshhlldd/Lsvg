<!-- Load Facebook SDK for JavaScript -->
<
div id = "fb-root" > < /div> <
script >
    window.fbAsyncInit = function() {
        FB.init({
            xfbml: true,
            version: 'v3.2'
        });
    };

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/zh_TW/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk')); < /script>

<
!--Your customer chat code -->
    <
    div class = "fb-customerchat"
attribution = "setup_tool"
page_id = "653360691525977"
theme_color = "#67b868"
logged_in_greeting = "您好，請問需要協助嗎？"
logged_out_greeting = "您好，請問需要協助嗎？" >
    <
    /div>


<
!--Google Tag Manager(noscript) -- >
    <
    noscript > < iframe src = "https://www.googletagmanager.com/ns.html?id=GTM-W6RS2T4"
height = "0"
width = "0"
style = "display:none;visibility:hidden" > < /iframe></noscript >
    <
    !--End Google Tag Manager(noscript) -- >

    <
    script >
    var fht = 1;
var fhtimer = setInterval(function() {
    $('#ff_1551699176').hide();
    fht++;
}, 1000);

if (fht == 20) {
    clearInterval(fhtimer);
}
$(function() {
    myPartner();

    function myPartner() {
        $("#partnercon").empty();
        var liWidth = '';
        $(window).resize(function() {
            if ($(window).width() < 600) {
                liWidth = "50%"
            } else {
                liWidth = "20%"
            }
        });
        if ($(window).width() < 600) {
            liWidth = "50%"
        } else {
            liWidth = "20%"
        }
        var partnerData = {
            "電商": [{
                src: "https://www.facebook.com/setddg/",
                imgsrc: "../../static/website/185/185662/files/partner/setddg.png",
                name: "電電購"
            }, {
                src: "https://www.facebook.com/BigtreeDeco/",
                imgsrc: "../../static/website/185/185662/files/partner/bigtreedeco.png",
                name: "大樹小屋-生活家飾居家雜貨"
            }, {
                src: "https://www.facebook.com/hobuy.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/hobuy.png",
                name: "Hobuy"
            }, {
                src: "https://www.facebook.com/imoonstar/",
                imgsrc: "../../static/website/185/185662/files/partner/imoonstar.png",
                name: "MoonStar 就是愛買鞋"
            }, {
                src: "https://www.facebook.com/Momoshowtime/",
                imgsrc: "../../static/website/185/185662/files/partner/momoshowtime.png",
                name: "MoMo Time - 藝想事界 -"
            }, {
                src: "https://www.facebook.com/icelebrate.co/",
                imgsrc: "../../static/website/185/185662/files/partner/icelebrate.png",
                name: "256 SHOP I Celebrate"
            }, {
                src: "https://www.facebook.com/JOLLYBUYTW/",
                imgsrc: "../../static/website/185/185662/files/partner/JOLLYBUYTW.png",
                name: "有閑JollyBuy"
            }, {
                src: "https://www.facebook.com/missfox1209/",
                imgsrc: "../../static/website/185/185662/files/partner/missfox1209.png",
                name: "耀盛科技資訊股份有限公司（激安多國連線）"
            }],
            "母嬰、婦幼": [{
                src: "https://www.facebook.com/bobocan8/",
                imgsrc: "../../static/website/185/185662/files/partner/BoBoCan.png",
                name: "BoBoCan寶貝幫"
            }, {
                src: "https://www.facebook.com/mamibuy/",
                imgsrc: "../../static/website/185/185662/files/partner/mamibuy.png",
                name: "媽咪拜-新手爸媽勸敗團"
            }, {
                src: "https://www.facebook.com/MamiBuyInfo/",
                imgsrc: "../../static/website/185/185662/files/partner/mamibuyinfo.png",
                name: "媽咪拜-懷孕媽咪知識團"
            }, {
                src: "https://www.facebook.com/utmommybaby/",
                imgsrc: "../../static/website/185/185662/files/partner/utmommybaby.png",
                name: "UTmall親子商城-媽媽寶寶質感好物"
            }, {
                src: "https://www.facebook.com/BaldCypress/",
                imgsrc: "../../static/website/185/185662/files/partner/BaldCypress.png",
                name: "小壞蛋玩具農場"
            }],
            "電子書、出版、教育、文創": [{
                src: "https://www.facebook.com/readingtimes.fans/ ",
                imgsrc: "../../static/website/185/185662/files/partner/readingtimes.png",
                name: "時報出版"
            }, {
                src: "https://www.facebook.com/hyread.ebook/",
                imgsrc: "../../static/website/185/185662/files/partner/hyread-ebook.png",
                name: "HyRead ebook 電子書"
            }, {
                src: "https://www.facebook.com/BODYFANS/",
                imgsrc: "../../static/website/185/185662/files/partner/bodyfans.png",
                name: "Body體面雜誌"
            }, {
                src: "https://www.facebook.com/ShareCourse/",
                imgsrc: "../../static/website/185/185662/files/partner/sharecourse.png",
                name: "ShareCourse 學聯網"
            }, {
                src: "https://www.facebook.com/ExLearnTW/",
                imgsrc: "../../static/website/185/185662/files/partner/ExLearnTW.png",
                name: "ExLearn課外"
            }, {
                src: "https://www.facebook.com/professionalnursingsupport/",
                imgsrc: "../../static/website/185/185662/files/partner/professionalnursing.png",
                name: "ChocoChoco敲敲兒"
            }, {
                src: "https://www.facebook.com/GoGoCourseTW/",
                imgsrc: "../../static/website/185/185662/files/partner/gogocourse.png",
                name: "GOGOCourse 購購課"
            }, {
                src: "https://www.facebook.com/YDToy/",
                imgsrc: "../../static/website/185/185662/files/partner/ydtoy.png",
                name: "研達Toyfriend"
            }],
            "金融、證券、保險": [{
                src: "https://www.facebook.com/firsthaka/",
                imgsrc: "../../static/website/185/185662/files/partner/firsthaka.png",
                name: "第一銀行 第e好康 FirstBank"
            }, {
                src: "https://www.facebook.com/entrustdream/",
                imgsrc: "../../static/website/185/185662/files/partner/entrustdream.png",
                name: "華南永昌證券/華南期貨 - 賽博格"
            }, {
                src: "https://www.facebook.com/CTBCSEC/",
                imgsrc: "../../static/website/185/185662/files/partner/CTBCSEC.png",
                name: "中國信託股市情報讚"
            }, {
                src: "https://www.facebook.com/fubonlife/",
                imgsrc: "../../static/website/185/185662/files/partner/fubonlife.png",
                name: "富邦人壽是怎young"
            }],
            "旅遊": [{
                src: "https://www.facebook.com/i.set.tour/",
                imgsrc: "../../static/website/185/185662/files/partner/i-set-tour.png",
                name: "東南旅遊"
            }, {
                src: "https://www.facebook.com/giantelephanttravel/",
                imgsrc: "../../static/website/185/185662/files/partner/giantelephanttravel.png",
                name: "巨象旅遊"
            }, {
                src: "https://www.facebook.com/oceanfamilygruop/",
                imgsrc: "../../static/website/185/185662/files/partner/oceanfamilygroup.png",
                name: "品全國際旅行社 品晴國際整合行銷"
            }],
            "科技": [{
                src: "https://www.facebook.com/syntrend/",
                imgsrc: "../../static/website/185/185662/files/partner/syntrend.png",
                name: "SYNTREND 三創生活園區"
            }, {
                src: "https://www.facebook.com/SocialWifiTaiwan/",
                imgsrc: "../../static/website/185/185662/files/partner/socialwifi.png",
                name: "Social Wifi 社群無限科技有限公司"
            }, {
                src: "https://www.facebook.com/CarShop.com.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/carshop.png",
                name: "響尾蛇行車記錄器"
            }, {
                src: "https://www.facebook.com/flashfire.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/flashfire.png",
                name: "FlashFire富雷迅"
            }, {
                src: "https://www.facebook.com/royalplaystore/",
                imgsrc: "../../static/website/185/185662/files/partner/royalplaystore.png",
                name: "御玩家電玩休閒館"
            }],
            "醫美、健康": [{
                src: "https://www.facebook.com/uhcshop/",
                imgsrc: "../../static/website/185/185662/files/partner/uhcshop.png",
                name: "友信康 U H C"
            }, {
                src: "https://www.facebook.com/skin.missness/",
                imgsrc: "../../static/website/185/185662/files/partner/skin-missness.png",
                name: "佐登妮絲專研保養品"
            }, {
                src: "https://www.facebook.com/cxbeauty/",
                imgsrc: "../../static/website/185/185662/files/partner/cxbeauty.png",
                name: "采欣醫美"
            }, {
                src: "https://www.facebook.com/TheYoungTalk/",
                imgsrc: "../../static/website/185/185662/files/partner/theyoungtalk.png",
                name: "Young Talk"
            }, {
                src: "https://www.facebook.com/contourplus/",
                imgsrc: "../../static/website/185/185662/files/partner/contourplus.png",
                name: "拜安進 健康管理血糖的好幫手"
            }, {
                src: "https://www.facebook.com/BULKHOMME.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/BULKHOMME.png",
                name: "本客 BULK HOMME Taiwan"
            }, {
                src: "https://www.facebook.com/TST1223/",
                imgsrc: "../../static/website/185/185662/files/partner/TST1223.png",
                name: "TST 樂活人生"
            }, {
                src: "https://www.facebook.com/febico.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/febico.png",
                name: "遠東生技-您健康的守護者"
            }, {
                src: "https://www.facebook.com/BEAUTYCOUNTRY/",
                imgsrc: "../../static/website/185/185662/files/partner/beautycountry.png",
                name: "窈窕美人國"
            }, {
                src: "https://www.facebook.com/taiwanjeunesse/",
                imgsrc: "../../static/website/185/185662/files/partner/taiwanjeunesse.png",
                name: "美商婕斯環球 - 台灣"
            }],
            "實體商店": [{
                src: "https://www.facebook.com/oklaocoffee/",
                imgsrc: "../../static/website/185/185662/files/partner/oklaocoffee.png",
                name: "歐客佬精品咖啡 正式臉書專頁"
            }, {
                src: "https://www.facebook.com/Mazendo.tw/",
                imgsrc: "../../static/website/185/185662/files/partner/mazendo.png",
                name: "麻膳堂 MAZENDO"
            }, {
                src: "https://www.facebook.com/royalelastics.fans/",
                imgsrc: "../../static/website/185/185662/files/partner/royalelastics.png",
                name: "Royal Elastics Taiwan 台灣官方粉絲團"
            }, {
                src: "https://www.facebook.com/140B1/",
                imgsrc: "../../static/website/185/185662/files/partner/140B1.png",
                name: "丼賞和食 焼き物vs刺身丼 丼專門店"
            }, {
                src: "https://www.facebook.com/17spicyhotpot/",
                imgsrc: "../../static/website/185/185662/files/partner/17spicyhotpot.png",
                name: "鼎太極麻辣鍋"
            }],
            "直播": [{
                src: "https://www.facebook.com/CAMPPLUS168/",
                imgsrc: "../../static/website/185/185662/files/partner/campplus.png",
                name: "台中悠遊戶外 CAMP PLUS"
            }, {
                src: "https://www.facebook.com/campplusforyou/",
                imgsrc: "../../static/website/185/185662/files/partner/campplus.png",
                name: "悠遊戶外 Camp Plus 天幕露營精品台灣總代理"
            }, {
                src: "https://www.facebook.com/For-girls-shop-女孩們-新館-1841785222749423/",
                imgsrc: "../../static/website/185/185662/files/partner/for-girls-shop.png",
                name: "For girl‘s shop 女孩們 - 新館"
            }, {
                src: "https://www.facebook.com/ROAHsSHOPs/",
                imgsrc: "../../static/website/185/185662/files/partner/roahsshops.png",
                name: "ROAH's SHOP#"
            }, {
                src: "https://www.facebook.com/Lovelily.yoyo/",
                imgsrc: "../../static/website/185/185662/files/partner/lovelily-yoyo.png",
                name: "Love Lily 鄭由由"
            }],
            "其他": [{
                src: "https://www.facebook.com/Kugifoods/",
                imgsrc: "../../static/website/185/185662/files/partner/kugifoods.png",
                name: "廣吉食品 台灣穀物專家"
            }, {
                src: "https://www.facebook.com/Yuansfamily/",
                imgsrc: "../../static/website/185/185662/files/partner/yuansfamily.png",
                name: "源之家手作芒果乾"
            }, {
                src: "https://www.facebook.com/OH.PAPA.K/",
                imgsrc: "../../static/website/185/185662/files/partner/oh-papa-k.png",
                name: "PAPA K. 國際物流運輸 International Delivery"
            }, {
                src: "https://www.facebook.com/Hyopsung/",
                imgsrc: "../../static/website/185/185662/files/partner/hyopsung.png",
                name: "協成五金號-汽機車工具"
            }, {
                src: "https://www.facebook.com/taeheew/",
                imgsrc: "../../static/website/185/185662/files/partner/taeheew.png",
                name: "TAEHEE W 韓國婚紗攝影"
            }]
        };
        var s = '';
        for (k in partnerData) {
            console.log(partnerData[k].length);
            s += '<li style="width: 100%; height: 80px;"><h5 style="display: inline-block; border-bottom: 2px solid #fff; padding:20px 0 10px 0; color: #fff; font-size: 20px; min-width: 200px;">' +
                k + '</h5></li>';

            for (var i = 0; i < partnerData[k].length; i++) {
                s += '<li style="width: ' + liWidth + '">' +
                    '<div>' +
                    '<a style="cursor: pointer;" href="' + partnerData[k][i].src +
                    '" target="_blank" rel="noopener"><img src="' + partnerData[k][i].imgsrc +
                    '" alt="" width="70%"</a>' + '</div>' +
                    '<div style="padding-bottom: 20px; text-align: center;"><a style="font-size: 14px; color: #fff;" href="' +
                    partnerData[k][i].src + '" target="_blank" rel="noopener">' + partnerData[k][i]
                    .name + '</a></div>' +
                    '</li>';
            }
        }
        $("#partnercon").append(s);
    }
    if ($(window).width() < 600) {
        $(".ec_tubiao").css({
            "width": "86%",
            "left": "7%"
        });
    }
    $(".ec_tubiao_btn").click(function() {
        $(".ec_tubiao").hide();
        $(this).parent().next('.ec_tubiao').show();
    })
    $(".ec_muti_btn").click(function() {
        var tbidx = $(this).index();
        $(".ec_tubiao").hide();
        $(this).parent().next(".tubiaoji").find(".ec_muti").eq(tbidx).show();
    })

    $(".ec_close").click(function() {
        $(this).closest(".ec_tubiao").hide();
    })
})
window.fbAsyncInit = function() {

    FB.init({

        appId: '110834862883734',

        autoLogAppEvents: true,

        xfbml: true,

        version: 'v2.11'

    });

};

(function(d, s, id) {

    var js, fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
        return;
    }

    js = d.createElement(s);
    js.id = id;

    js.src = "https://connect.facebook.net/zh_TW/sdk.js";

    fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));


function gtag_report_conversion(url) {
    var callback = function() {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'NTD',
        'event_callback': callback
    });
    return false;
}

<
/script>