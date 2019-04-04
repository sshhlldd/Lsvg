var Material = {
    index: 0,
    current: 0,
    type: 'text',
    dataInfo: {},
    init: function(data) {
        /**/
        if (data) {
            this.type = data.type;
            this.dataInfo = data.info
        }
        //添加按钮内容
        $(document).on('click', '.add-btn', function() {
            var data_index = $(this).attr('data-index');
            var linum = $('#contaiter_' + data_index).find('.btnli').length;
            var btn_html = Material.getBtnConHtml(data_index, linum, null);
            $(this).before(btn_html);
            //console.log(linum);
            if (linum >= 2) {
                $(this).hide();
            }
            if ($('#myForm .quick_btn_div_contaiter').is(":visible")) {
                $('.or').hide();
                $('#myForm .quick_btn_div_contaiter').hide();
            }
        });
        //添加快速按钮内容
        $(document).on('click', '.add_quick_btn', function() {
            var data_index = 0;
            var linum = $('#quick_contaiter_' + data_index).find('.quick_item').length;
            var quick_btn_html = Material.getQuickConHmtl(linum, null);
            //$(this).parents().find('.quick_btn_div').before(quick_btn_html);
            $('#quick_contaiter_' + data_index + ' .quick_btn_div').before(quick_btn_html);
            if (linum >= 10) {
                $(this).parents().find('.quick_btn_div').hide();
            }
            //删除所有的普通添加按钮
            $('#myForm .btn_div_contaiter,#myForm .or').hide();
        });
        //刪除 普通按钮
        $(document).on('click', '.del_btn_con', function() {
            var ulid_str = $(this).parent().parent().attr('id');
            $(this).parent().remove();
            var uldi_arr = ulid_str.split('_');
            var index = uldi_arr[uldi_arr.length - 1];
            var btn_num = $('#contaiter_' + index).find('.btnli').length;
            if (btn_num < 3) {
                $('#card-' + index + ' .add-btn').show();
            }
            if (Material.type == 'news') {
                var all_btn_num = $('#myForm .btnli').length;
                //console.log('all:'+all_btn_num);
                if (all_btn_num == 0) {
                    if ($('#quick_div .quick_btn_div_contaiter').length > 0) {
                        $('#quick_div .or').show();
                        $('#quick_div .quick_btn_div_contaiter').show();
                    }
                }
            } else {
                if (btn_num == 0) {
                    $('#quick_div .or').show();
                    $('#quick_div .quick_btn_div_contaiter').show();
                }
            }
            if (btn_num > 0) {
                Material.initOrderBtn(index);
            }

        });
        //刪除 快速按钮
        $(document).on('click', '.del_quick_btn_con', function() {
            $(this).parent().parent().remove();
            var quick_btn_num = $('#myForm').find('.quick_item').length;
            if (quick_btn_num < 11) {
                $('#quick_div .quick_btn_div').show();
            }
            if (quick_btn_num == 0) {
                //给每个card添加上普通添加按钮
                $('#myForm .card-element').each(function(i, e) {

                    $(this).find('.btn_div_contaiter').show();
                });
                $('#quick_div .or').show();
            } else {
                Material.initOrderQuickBtn();
            }
        });
        //添加链接
        $(document).on('click', '.add_url', function() {
            //當前控件id
            var liid = $(this).parent().attr('id');
            var cur_input_val = $(this).next().val();
            var url_input_html = '<input type="text" class="btn_url" name="btn_url" value="' + cur_input_val + '" onblur="Material.hideWrap(this,\'' + liid + '\')" placeholder="請輸入網址">';
            $('.card-postback').html(url_input_html);
            $('.card-postback-wrapper').show();
            $('.card-postback').offset({
                top: $(this).offset().top + 30,
                left: $(this).offset().left - 200
            });
            $('.btn_url').focus();
        });
        //添加電話
        $(document).on('click', '.add_phone', function() {
            //當前控件id
            var liid = $(this).parent().attr('id');
            var cur_input_val = $(this).next().val();
            var url_input_html = '<input type="text" class="btn_phone" name="btn_phone" value="' + cur_input_val + '" onblur="Material.hideWrapToPhone(this,\'' + liid + '\')" placeholder="請輸入電話號碼"><br/><span style="display: inline-block;color: red;">&nbsp;&nbsp;&nbsp;&nbsp;範例：+886287737511</span>';
            $('.card-postback').html(url_input_html);
            $('.card-postback-wrapper').show();
            $('.card-postback').offset({
                top: $(this).offset().top + 30,
                left: $(this).offset().left - 200
            });
            $('.btn_phone').focus();
        });
        //添加電話
        $(document).on('click', '.add_forward', function() {
            //當前控件id
            var liid = $(this).parent().attr('id');
            Material.hideWrapToForward(this, liid);
            /*var cur_input_val = $(this).next().val();
             var url_input_html = '<input type="text" class="btn_phone" name="btn_phone" value="'+cur_input_val+'" onblur="Material.hideWrapToPhone(this,\''+liid+'\')" placeholder="請輸入電話號碼">';
             $('.card-postback').html(url_input_html);
             $('.card-postback-wrapper').show();
             $('.card-postback').offset({top:$(this).offset().top+30,left:$(this).offset().left-200});
             $('.btn_phone').focus();*/
        });
        //选择素材
        $(document).on('click', '.add_material', function() {
            var add_type = $(this).attr('data-index');
            if (add_type == 'quick') {
                var liid = $(this).parent().parent().attr('id');
            } else {
                var liid = $(this).parent().attr('id');
            }
            //$(this).removeVal(liid);
            var curMaterial_id = $('#' + liid).find('.reply_material_id').val();
            var config = {
                url: 'https://ec2.full2house.com/Ent/index.php?a=Plugin&m=materialFrame', //这个参数默认是正式服务器
                title: '',
                fn_ok: function(data) {
                    //console.log(data);
                    if (data.material_id != undefined) {
                        //记录按钮类型
                        $('#' + liid + ' .btn_type').val('2');
                        $('#' + liid).find('input[name="reply_material_id"]').val(data.material_id);
                        $('#' + liid).find('.add_material i').addClass('green');

                        $('#' + liid + ' .add_url i').removeClass('green');
                        $('#' + liid + ' .add_phone i').removeClass('green');
                        $('#' + liid + ' .add_forward i').removeClass('green');
                    }
                }
            };
            if (curMaterial_id != '') {
                config.url += '&material_id=' + curMaterial_id;
            }
            var obj = new EC2_MaterialBox(config);
            obj.show();
            /*var liid = $(this).parent().attr('id');
             //当前选中的
             var cur_input_val = $(this).parent().find('.reply_material_id').val();
             var material_html = '';
             $('.card-postback').html(url_input_html);
             $('.card-postback-wrapper').show();
             $('.card-postback').offset({top:$(this).offset().top+30,left:$(this).offset().left-200});
             $('.btn_url').focus();*/
        });
        //添加卡片
        $(document).on('click', '.card_plus', function() {
            //var cardNum = $('#myForm .card-div').length;
            //获取最后一个card的id
            var lastNum = 0;
            if ($('.form-actions').prev().length > 0) {
                var cardLength = $('.card-element').length - 1;
                var lastId = $('.card-div').eq(cardLength).attr('data-index');
                //console.log('lastid:'+lastId)
                lastNum = parseInt(lastId) + 1;
            }
            //console.log(lastNum);
            //initCard(lastNum);
            Material.index = lastNum;
            var cardNum = $('#content-all .card-div').length;
            if (Material.type == 'list') {
                if (cardNum >= 4) {
                    return false;
                } else {
                    Material.addCard();
                }
            }
            if (Material.type == 'news') {
                if (cardNum >= 10) {
                    return false;
                } else {
                    Material.addCard();
                }
            }

        });
        //删除卡片
        $(document).on('click', '.card_del', function() {
            if ($('#myForm .card-div').length > 1) {
                $(this).parent().parent().parent().remove();
                //获取第一个card id
                var cardId = $('#content-all .card-div').eq(0).attr('data-index');
                //判断第一个是否有快速按钮
                var quickNum = $('#quick_div .quick_btn_div_contaiter').length;
                //整体有几个按钮内容
                var btnNums = $('#myForm .btnli').length;
                if (quickNum == 0 && btnNums == 0) {
                    //给第一个增加快速按钮
                    /*var orHtml = getOrHtml();
                     var quickBtnHtml = getQuickBtnHtml(cardId);
                     $('.form-group').next().find('.no-padding').append(orHtml+quickBtnHtml);*/
                    //console.log('aaaa');
                    $('#quick_div .or').show();
                    $('#quick_div .quick_btn_div_contaiter').show();
                }
            }
        });
        if (Material.type == 'news' || Material.type == 'list') {
            $(window).load(function() {
                $("#content-all").mCustomScrollbar({
                    axis: "x",
                    advanced: {
                        autoExpandHorizontalScroll: true
                    }
                });
                var e1 = document.getElementById('mCSB_1_container');
                var sortable = new Sortable(e1, {
                    handle: ".move"
                });
                Material.initData();
            });
        } else {
            Material.initData();
        }

    },
    initData: function() {
        if (this.dataInfo) {
            //console.log(this.dataInfo);
            if (this.type == 'news' || this.type == 'list') {
                for (var i = 0; i < this.dataInfo.conInfo.length; i++) {
                    //if(i==0) {
                    Material.addCard(this.dataInfo.conInfo[i], this.dataInfo.quickBtn);
                    /*}else{
                     Material.addCard(this.dataInfo.conInfo[i], null);
                     }*/
                }
            } else {
                Material.addCard(this.dataInfo.conInfo[0], this.dataInfo.quickBtn);
            }

        } else {
            Material.addCard();
        }
    },
    getBtnHtml: function(btnInfo, btnhide) {
        //var num = i!=''?i:this.index;
        //console.log(btnInfo);
        var num = this.index;
        var btnCon = '';
        var btnhide = btnhide || false;
        var btnStyle = '';
        var addBtnStyle = '';
        if (btnInfo != null) {
            if (isArray(btnInfo)) {
                for (var j = 0; j < btnInfo.length; j++) {
                    btnCon += Material.getBtnConHtml(num, j, btnInfo[j]);
                }
                if (btnInfo.length > 2) {
                    addBtnStyle = ' style=" display:none;"';
                }
            }
            //console.log(btnCon);
        }
        if (btnhide) {
            btnStyle = ' style=" display:none;"';
        }
        var btnHtml = '<ul class="text-card-button btn_div_contaiter"' + btnStyle + ' id="contaiter_' + num + '"> ' +
            btnCon +
            '<li class="item item-nogap flex flex-justify--between add-btn"' + addBtnStyle + ' data-index="' + num + '"> ' +
            '<button type="button" class="card-btn card-grey add bigger-125"> ' +
            '<i class="fa fa-plus-circle"></i> <span>按鈕</span> ' +
            '</button> </li> </ul>';
        return btnHtml;
    },
    getBtnConHtml: function(dataindex, linum, con) {
        var btnCon = con || {
            'url': '',
            'phone': '',
            'reply_material_id': '',
            'btn_type': '',
            'title': ''
        };
        var urlGreen = '';
        var phoneGreen = '';
        var replyGreen = '';
        var forwardGreen = '';
        if (btnCon.url != '') {
            urlGreen = ' green';
        }
        if (btnCon.phone != '') {
            phoneGreen = ' green';
        }
        if (btnCon.reply_material_id != '' && btnCon.reply_material_id != 0) {
            replyGreen = ' green';
        }
        if (btnCon.btn_type == '5') {
            forwardGreen = ' green';
        }
        var html = '<li class="item flex flex-justify--between btnli" id="btnli_' + dataindex + '_' + linum + '">' +
            '<button type="button" class="card-btn card-grey del_btn_con"><i class="fa fa-trash-o bigger-120"></i></button> ' +
            '<input type="text" placeholder="按鈕標題" class="inp title" value="' + btnCon.title + '"> ' +
            '<button type="button" class="card-btn card-grey add_material" data-index="button"><i class="fa fa-plus-square-o bigger-120' + replyGreen + '"></i></button> ' +
            '<button type="button" class="card-btn card-grey add_forward"><i class="fa fa-share bigger-120 ' + forwardGreen + '"></i></button> ' +
            '<button type="button" class="card-btn card-grey add_phone"><i class="fa fa-phone bigger-120' + phoneGreen + '"></i></button> ' +
            '<input type="hidden" value="' + btnCon.phone + '" class="phone" name="phone">' +
            '<button type="button" class="card-btn card-grey add_url"><i class="fa fa-link bigger-120' + urlGreen + '"></i></button> ' +
            '<input type="hidden" value="' + btnCon.url + '" class="url" name="url">' +
            '<input type="hidden" value="' + btnCon.url + '" class="phone" name="phone">' +
            '<input type="hidden" value="' + btnCon.reply_material_id + '" class="reply_material_id" name="reply_material_id">' +
            '<input type="hidden" value="' + btnCon.btn_type + '" class="btn_type" name="btn_type">' +
            '</li>';
        return html;
    },
    getOrHtml: function(hideor) {
        var hideor = hideor || false;
        var hideStyle = '';
        if (hideor) {
            hideStyle = ' style="display:none;"';
        }
        return '<div class="or"' + hideStyle + '>或</div>';
    },
    getQuickBtnHtml: function(hidequick, con) {
        var hideQuick = hidequick || false;
        var quicCon = con || null;
        //console.log(quicCon);
        var hideStyle = '';
        var hideBtnStyle = '';
        if (hideQuick) {
            hideStyle = ' style="display:none;"';
        }
        var conHtml = '';
        if (quicCon) {
            for (var i = 0; i < quicCon.length; i++) {
                conHtml += Material.getQuickConHmtl(i, quicCon[i]);
            }
            if (quicCon.length > 10) {
                hideBtnStyle = ' style="display:none;"';
            }
        }
        var quickBtnHtml = '<div class="card-quick-replies quick_btn_div_contaiter"' + hideStyle + ' id="quick_contaiter_' + this.index + '"> ' +
            conHtml +
            '<div class="item item-nogap quick_btn_div"' + hideBtnStyle + '> ' +
            '<div class="flex flex-justify--between"> ' +
            '<button type="button" class="card-btn card-grey add bigger-125 add_quick_btn" data-index="' + this.index + '"> ' +
            '<i class="fa fa-plus-circle"></i> <span>快速回覆</span> ' +
            '</button> ' +
            '</div> </div> </div>';
        return quickBtnHtml;
    },
    getQuickConHmtl: function(linum, quickInfo) {
        var btnCon = quickInfo || {
            'reply_material_id': '',
            'btn_type': '',
            'title': ''
        };
        var replyGreen = '';
        if (btnCon.reply_material_id != '' && btnCon.reply_material_id != 0) {
            replyGreen = ' green';
        }
        var html = '<div class="item quick_item" id="quick_btn_div_' + linum + '"> ' +
            '<div class="flex flex-justify--between"> ' +
            '<button type="button" class="card-btn card-grey delete del_quick_btn_con"> ' +
            '<i class="fa fa-trash-o bigger-120"></i> ' +
            '</button> ' +
            '<input type="text" placeholder="按鈕標題" value="' + btnCon.title + '" class="inp title"> ' +
            '<button type="button" class="card-btn card-grey add_material" data-index="quick"> ' +
            '<i class="fa fa-plus-square-o bigger-120' + replyGreen + '"></i> ' +
            '</button> ' +
            '</div>' +
            '<input type="hidden" value="' + btnCon.reply_material_id + '" class="reply_material_id" name="reply_material_id">' +
            '<input type="hidden" value="' + btnCon.btn_type + '" class="btn_type" name="btn_type">' +
            ' </div>';
        return html;
    },
    getActionHtml: function() {
        var actionHtml = '<div class="action-buttons"> ' +
            '<button type="button" title="新增" class="card-btn card-grey move"><i class="fa fa-arrows-h bigger-120"></i></button> ' +
            '<button type="button" title="新增" class="card-btn card-grey card_plus"><i class="fa fa-plus bigger-120"></i></button> ' +
            '<button type="button" title="刪除" class="card-btn card-grey card_del"><i class="fa fa-trash-o bigger-120"></i></button> ' +
            '</div>';
        return actionHtml;
    },
    getTitleHtml: function(value) {
        value = value.replace(/@&/g, '\n');
        var titleHtml = '<div class="text-card-title"><textarea rows="3" placeholder="標題" id="title_' + this.index + '">' + value + '</textarea> </div>';
        return titleHtml;
    },
    getImageHtml: function(value) {
        if (value != '') {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage" style="display: none;"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> ' +
                '<img src="' + value + '" style="width:100%;height:100%" />' +
                '</div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="' + value + '" class="inp"> ' +
                '</label>';
        } else {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> </div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="" class="inp"> ' +
                '</label>';
        }
        return imageHtml;
    },
    getAudioHtml: function(value) {
        if (value != '') {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage" style="display: none;"> <i class="fa fa-volume-up" style="position: absolute; z-index: 1; color: #acacac; display: block; font-size: 50px; width: 50px; height: 50px; top: 40%; left: 50%; transform: translate(-50%, -50%);"></i> <span class="text">點此上傳<br>音訊大小為 25MB 以内</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> ' +
                //'<img src="'+value+'" style="width:100%;height:100%" />'+
                '<audio src="' + value + '" style="width:100%;height:100%" controls autoplay></audio>' + //
                '</div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="' + value + '" class="inp"> ' +
                '</label>';
        } else {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage"> <i class="fa fa-volume-up" style="position: absolute; z-index: 1; color: #acacac; display: block; font-size: 50px; width: 50px; height: 50px; top: 40%; left: 50%; transform: translate(-50%, -50%);"></i> <span class="text">點此上傳<br>音訊大小為 25MB  以內</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> </div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="" class="inp"> ' +
                '</label>';
        }
        return imageHtml;
    },
    getArchiveHtml: function(value) {
        if (value != '') {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage" style="display: none;"> <i class="fa fa-file" style="position: absolute; z-index: 1; color: #acacac; display: block; font-size: 50px; width: 50px; height: 50px; top: 40%; left: 50%; transform: translate(-50%, -50%);"></i> <span class="text">pdf、zip、doc、xls、ppt<br>檔案大小為 25MB  以內</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> ' +
                //'<img src="'+value+'" style="width:100%;height:100%" />'+
                '<i class="fa fa-files-o" style="position: absolute; z-index: 1; color: #acacac; display: block; font-size: 80px; width: 80px; height: 80px; top: 75%; left: 50%; transform: translate(-50%, -50%);"></i>' +
                '</div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="' + value + '" class="inp"> ' +
                '</label>';
        } else {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage"> <i class="fa fa-file" style="position: absolute; z-index: 1; color: #acacac; display: block; font-size: 50px; width: 50px; height: 50px; top: 40%; left: 50%; transform: translate(-50%, -50%);"></i> <span class="text">pdf、zip、doc、xls、ppt<br>檔案大小為 25MB  以內</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> </div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="" class="inp"> ' +
                '</label>';
        }
        return imageHtml;
    },
    getFilmHtml: function(value) {
        if (value != '') {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage" style="display: none;"> <i class="fa fa-camera fa-youtube-play" style="font-size: 60px;width:60px;height:60px;top:45%;"></i> <span class="text">點此上傳<br>影片大小為 25MB 以內</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> ' +
                //'<video src="'+value+'" style="width:100%;height:100%" />'+
                //'<video  controls="controls" src="https://www.ttww.cc/Upload/Form/Files/201811/201811030821171927.mp4" style="width:100%;height:100%" /></video>'+
                '<video  controls="controls" src="' + value + '" style="width:100%;height:100%" /></video>' +
                '</div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="' + value + '" class="inp"> ' +
                '</label>';
        } else {
            var imageHtml = '<label class="card-element_image"> ' +
                '<div class="noimage"> <i class="fa fa-camera fa-youtube-play" style="font-size: 60px;width:60px;height:60px;top:45%;"></i> <span class="text">點此上傳<br>影片大小為 25MB 以內</span> </div> ' +
                '<div class="image-uploader js-root-dropzone image" id="image-upload-' + this.index + '"> </div> ' +
                '<input  type="hidden"  name="image_url" id="image_url_' + this.index + '" value="" class="inp"> ' +
                '</label>';
        }
        return imageHtml;
    },
    getNewsHtml: function(news) {
        if (news.description != '') {
            news.description = news.description.replace(/@&/g, '\n');
        }
        var newsHtml = '<div class="card-element_text"><input type="text" value="' + news.title + '" id="title_' + this.index + '" placeholder="標題  建議80個字符以內" class="inp"></div> ' +
            '<div class="card-element_text"><textarea placeholder="描述  建議80個字符以內" class="area" id="desc_' + this.index + '">' + news.description + '</textarea></div> ' +
            '<div class="card-element_text"><input type="url" value="' + news.web_url + '" placeholder="網址" class="inp" id="web_url_' + this.index + '"></div>';
        return newsHtml;
    },
    getListHtml: function(listInfo) {
        var listHtml = '<div class="card-element_text"><input type="text" value="' + listInfo.title + '" id="title_' + this.index + '" placeholder="標題 建議80個字符以內" class="inp"></div> ' +
            '<div class="card-element_text"><textarea placeholder="副標題  建議80個字符以內" class="area" id="desc_' + this.index + '">' + listInfo.description + '</textarea></div> ' +
            '<div class="card-element_text"><input type="url" value="' + listInfo.web_url + '" placeholder="按鈕URL" class="inp" id="web_url_' + this.index + '"></div>';
        return listHtml;
    },
    getCardContent: function(conInfo, btnhide) {
        var html = '';
        switch (this.type) {
            case 'text':
                html = this.getTitleHtml(conInfo.title) + this.getBtnHtml(conInfo.btnInfo, btnhide);
                break;
            case 'image':
                html = this.getImageHtml(conInfo.image_url);
                break;
            case 'news':
                html = this.getImageHtml(conInfo.image_url) + this.getNewsHtml(conInfo);
                if ($('#myForm .quick_item').length > 0) {
                    btnhide = true;
                }
                html += this.getBtnHtml(conInfo.btnInfo, btnhide);
                break;
            case 'list':
                html = this.getImageHtml(conInfo.image_url) + this.getListHtml(conInfo);
                break;
            case 'film':
                html = this.getFilmHtml(conInfo.image_url) //+this.getBtnHtml(conInfo.btnInfo,btnhide);
                break;
            case 'audio':
                html = this.getAudioHtml(conInfo.image_url);
                break;
            case 'archive':
                html = this.getArchiveHtml(conInfo.image_url);
                break;
            default:
                break;
        }
        return html;
    },
    addCard: function(conInfo, quickBtn) {
        //console.log(conInfo);
        conInfo = conInfo || {
            'title': '',
            'image_url': '',
            'description': '',
            'web_url': '',
            'btnInfo': null
        };
        var quickBtn = quickBtn || null;
        var hideBtn = false;
        var hideQuick = false;
        var hideOr = false;
        if (quickBtn != null && isArray(quickBtn)) {
            if (quickBtn.length > 0) {
                hideBtn = true;
                hideOr = true;
            }
        }
        //console.log(conInfo.btnInfo);
        if (conInfo.btnInfo != null && isArray(conInfo.btnInfo)) {
            if (conInfo.btnInfo.length > 0) {
                hideQuick = true;
                hideOr = true;
            }
        }
        var html = '<div style="width: 360px; float: left; margin-left: 10px;"><div class="card-div" id="card-' + this.index + '" data-index="' + this.index + '">';
        if (this.type == 'news' || this.type == 'list') {
            html += this.getActionHtml();
        }
        html += '<div class="card-element">';
        var cardContent = this.getCardContent(conInfo, hideBtn);
        html += cardContent + '</div></div></div>';
        //console.log(html);
        if (type == 'news' || type == 'list') {
            $('#mCSB_1_container').append(html);
        } else {
            $('#content-all').append(html);
        }
        //處理快速回覆按鈕
        if (this.index == 0) {
            if (this.type == 'text' || this.type == 'news' /*|| this.type == 'film'*/ ) {
                $('#quick_div').append(this.getOrHtml(hideOr) + this.getQuickBtnHtml(hideQuick, quickBtn));
            }
            if (this.type == 'image' || this.type == 'audio' || this.type == 'archive' || this.type == 'film') {
                $('#quick_div').append(this.getQuickBtnHtml(hideQuick, quickBtn));
            }
        }
        this.index++;
        this.current = this.index;
    },
    initOrderBtn: function(j) {
        $('#card-' + j + ' .btn_div_contaiter .btnli').each(function(i, e) {
            $(this).attr('id', 'btnli_' + j + '_' + i);
        });
    },
    initOrderQuickBtn: function() {
        $('#content-all .quick_btn_div_contaiter .quick_item').each(function(i, e) {
            $(this).attr('id', 'quick_btn_div_' + i);
        });
    },
    //点击白色弹层 事件
    hideWrap: function(e, liid) {
        this.removeVal(liid);
        $('.card-postback-wrapper').hide();
        var con = $(e).val();
        $('#' + liid + ' .url').val(con);
        if (con != '') {
            //记录普通按钮 类型 btn_type
            $('#' + liid + ' .btn_type').val('1');
            $('#' + liid + ' .add_url i').addClass('green');
        } else {
            $('#' + liid + ' .add_url i').removeClass('green');
        }
    },
    hideWrapToPhone: function(e, liid) { //手机号
        this.removeVal(liid);
        $('.card-postback-wrapper').hide();
        var con = $(e).val();
        $('#' + liid + ' .phone').val(con);
        if (con != '') {
            //记录普通按钮 类型 btn_type
            $('#' + liid + ' .btn_type').val('4');
            $('#' + liid + ' .add_phone i').addClass('green');
        } else {
            $('#' + liid + ' .add_phone i').removeClass('green');
        }
    },
    hideWrapToForward: function(e, liid) { //转发
        this.removeVal(liid);
        $('.card-postback-wrapper').hide();
        //记录普通按钮 类型 btn_type
        $('#' + liid + ' .btn_type').val('5');
        $('#' + liid + ' .add_forward i').addClass('green');
    },
    removeVal: function(liid) { //将数据初始化 - wudean
        $('#' + liid + ' .reply_material_id').val('');
        $('#' + liid + ' .url').val('');
        $('#' + liid + ' .phone').val('');

        $('#' + liid + ' .add_url i').removeClass('green');
        $('#' + liid + ' .add_material i').removeClass('green');
        $('#' + liid + ' .add_phone i').removeClass('green');
        $('#' + liid + ' .add_forward i').removeClass('green');

        $('#' + liid + ' .add_url i').removeClass('error');
        $('#' + liid + ' .add_material i').removeClass('error');
        $('#' + liid + ' .add_phone i').removeClass('error');
        $('#' + liid + ' .add_forward i').removeClass('error');
    }
}