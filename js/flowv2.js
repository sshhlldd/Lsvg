;
(function($) {
    var myflow = function(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
    };
    myflow.prototype = {
        defaults: {
            data: [],
            findItem: {},
            onEdit: function() {},
            onFlow: function() {},
            onAct: function() {},
            onDel: function() {}
        },
        init: function() {
            this.config = $.extend({}, this.defaults, this.options);
            this.renderDom();
            return this;
        },
        renderDom: function() {
            var temp = '';
            if (this.config.data.length > 0) {
                temp += this.render();
            } else {
                temp += '<div class="flow-con">'
                temp += this.temp('init');
                temp += '</div>'
            }
            this.$elem.empty().append(temp);
            this.setpos();
            this.bindTempClick();
            this.bindCardClick();

        },
        render: function() {
            var idx = 0; //层级
            var arr = [];
            var that = this;
            var temp = '<div class="flow-con">';
            traverseTree(this.config.data[0]);

            function traverseTree(node) {
                if (!node) {
                    return;
                }
                traverseNode(node)
                if (node.children && node.children.length > 0) {
                    idx += 1;
                    temp += '<div class="flow-children">';
                    for (var i = 0; i < node.children.length; i++) {
                        console.log(node.children[i].id);
                        console.log(idx);
                        console.log(node.children.length);
                        arr.push(node.children.length);
                        temp += '<div class="flow-con" style="left:340px;top:' + i * 370 + 'px">';
                        traverseTree(node.children[i]);
                        temp += '</div>';

                        if (i == node.children.length - 1) {

                            idx -= 1;
                        }
                    }
                    temp += '</div>';

                }


            }
            console.log(arr);

            function traverseNode(node) {
                temp += that.temp(node);
            }
            temp += '</div>';
            return temp;
        },
        bindTempClick: function() {
            var self = this;
            this.$elem.off('click', '.btn-app');
            this.$elem.on('click', '.btn-app', function() {
                var type = $(this).attr('data-type');
                var id = $(this).attr('data-id');
                console.log(type);
                console.log(id);
                self.changeChild(self.config.data, id, type);
                self.renderDom();
            })
        },
        bindCardClick: function() {
            var self = this;
            this.$elem.off('click', '.quick_btn_div');
            this.$elem.off('click', '[data-action=add-flow]');
            this.$elem.off('click', '[data-action=del-flow]');
            this.$elem.on('click', '.quick_btn_div', function(event) {
                event.stopPropagation();
                var type = $(this).attr('data-type');
                var id = $(this).attr('data-pid');
                var quick = $(this).closest('.quick_btn_div_contaiter').find('.quick_item').length;
                var s = '<div class="item quick_item"> <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey delete del_quick_btn_con" data-cid="" data-pid="' + id + '" data-type="' + type + '" data-action="del-flow" data-index="' + quick + '"> <i class="fa fa-trash-o bigger-120"></i> </button> <input type="text" placeholder="按鈕標題" value="" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="" data-pid="' + id + '" data-type="' + type + '" data-action="add-flow" data-index="' + quick + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"> </div>'
                $(this).before(s);

            })
            this.$elem.on('click', '[data-action=add-flow]', function(event) {
                event.stopPropagation();
                if ($(this).attr('data-cid') !== '') return false;
                var id = $(this).attr('data-pid');
                var pos = $(this).attr('data-index');
                var nid = self.getID(4);
                var obj = {
                    id: nid,
                    name: '',
                    type: 'init',
                };
                self.addChild(self.config.data, id, obj, pos);
                self.renderDom();
            })
            this.$elem.on('click', '[data-action=del-flow]', function(event) {
                event.stopPropagation();
                if ($(this).attr('data-cid') !== '') {
                    var id = $(this).attr('data-pid');
                    var pos = $(this).attr('data-index');
                    self.delChild(self.config.data, id, pos);
                    self.renderDom();
                }
                $(this).closest('.quick_item').remove();

            })
            this.$elem.on('click', 'a[data-action=act]', function(event) {
                event.stopPropagation();
                if ($(this).hasClass('disabled')) return false;
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type');
                if (typeof(self.config.onAct) === 'function') {
                    self.config.onAct(id, type);
                }
            })
            this.$elem.on('click', 'a[data-action=del]', function(event) {
                event.stopPropagation();
                if ($(this).hasClass('disabled')) return false;
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type');
                if (typeof(self.config.onDel) === 'function') {
                    self.config.onDel(id, type);
                }
            })
        },
        //查找ID对象
        findObj: function(arr, id) {
            var that = this;
            arr.forEach(function(item) {
                if (item.id == id) {
                    that.findItem = item;
                    return item;
                } else if (item.children.length > 0) {
                    that.findObj(item.children, id);
                }
            })
        },
        //添加对象@arr=config.data,@id要添加children的id,@child要添加的对象
        addChild: function(arr, id, child, pos) {
            var that = this;
            arr.forEach(function(item) {
                if (item.id == id) {
                    console.log(item);
                    if (item.children && item.children.length > 0) {
                        item.children.splice(pos, 0, child);
                    } else {
                        item["children"] = new Array()
                        item.children.push(child);

                    }
                    return;
                } else if (item.children && item.children.length > 0) {
                    that.addChild(item.children, id, child, pos);
                }
            })
        },
        //添加对象@arr=config.data,@id要删除children的pid,@pos要删除child数组索引
        delChild: function(arr, id, pos) {
            var that = this;
            arr.forEach(function(item) {
                if (item.id == id) {
                    console.log(item)
                    if (item.children && item.children.length === 1) {
                        delete item["children"];
                    }
                    if (item.children && item.children.length > 1) {
                        item.children.splice(pos, 1);
                    }
                    return;
                } else if (item.children && item.children.length > 0) {
                    that.delChild(item.children, id, pos);
                }
            })
        },
        changeChild: function(arr, id, type) {
            var that = this;
            arr.forEach(function(item) {
                if (item.id == id) {
                    console.log(item)
                    item.type = type
                    return;
                } else if (item.children && item.children.length > 0) {
                    that.changeChild(item.children, id, type);
                }
            })
        },
        setpos: function() {
            var that = this;
            this.config.data.forEach(function(item) {
                if (item.children && item.children.length > 0) {

                }
            })
        },
        //随机ID
        getID: function(length) {
            return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
        },
        temp: function(node) {
            var s = '';
            switch (node.type) {
                case 'text':
                    s += tempText(node);
                    break;
                case 'img':
                    s += tempImg(node);
                    break;
                case 'img-text':
                    s += tempImgText(node);
                    break;
                case 'catalog':
                    s += tempText(node);
                    break;
                case 'video':
                    s += tempText(node);
                    break;
                case 'audio':
                    s += tempText(node);
                    break;
                case 'file':
                    s += tempText(node);
                    break;
                default:
                    s += tempInit(node);

            }
            return s;

            function tempImgText(node) {
                var str = '<div class="flow-item" style="">\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" class="form-control" name=""></div>\
                </div>\
                <div class="card clearfix">\
                    <div class="col-xs-12 col-sm-4 no-padding mCustomScrollbar _mCS_1 mCS_no_scrollbar" id="">\
                        <div id="" class="mCustomScrollBox mCS-light mCSB_horizontal mCSB_inside" style="max-height: none;" tabindex="0">\
                            <div id="" class="mCSB_container mCS_x_hidden mCS_no_scrollbar_x" style="" dir="ltr">\<div>\
                                    <div class="card-div">\
                                        <div class="card-element"><label class="card-element_image"> <div class="noimage"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div> <input type="hidden" name="image_url" id="image_url_0" value="" class="inp"> </label>\
                                            <div class="card-element_text"><input type="text" value="" id="title_0" placeholder="標題  建議80個字符以內" class="inp"></div>\
                                            <div class="card-element_text"><textarea placeholder="描述  建議80個字符以內" class="area" id="desc_0"></textarea></div>\
                                            <div class="card-element_text"><input type="url" value="" placeholder="網址" class="inp" id="web_url_0"></div>\
                                            <ul class="text-card-button btn_div_contaiter" id="contaiter_0">\
                                                <li class="item item-nogap flex flex-justify--between add-btn"> <button type="button" class="card-btn card-grey add bigger-125"> <i class="fa fa-plus-circle"></i> <span>按鈕</span> </button> </li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div>\
                    <div class="or">或</div>\
                        <div class="card-quick-replies quick_btn_div_contaiter">\
                            <div class="item item-nogap quick_btn_div" data-pid="' + node.id + '" data-type="' + node.type + '">\
                                <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span> </button> </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
                return str;
            }

            function tempImg(node) {
                var str = '<div class="flow-item">\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" class="form-control" name=""></div>\
                </div>\
                <div class="card clearfix">\
                    <div class="col-xs-12 col-sm-4 no-padding" id="">\
                        <div>\
                            <div class="card-div">\
                            <div class="card-element"><label class="card-element_image"> <div class="noimage"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div> <input type="hidden" name="image_url" id="image_url_0" value="" class="inp"> </label></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div>\
                    <div class="card-quick-replies quick_btn_div_contaiter" id="">';
                if (node.children && node.children.length > 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        str += '<div class="item quick_item"><div class="flex flex-justify--between"><button type="button" class="card-btn card-grey delete del_quick_btn_con" data-cid="' + node.children[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="del-flow" data-index="' + i + '"> <i class="fa fa-trash-o bigger-120"></i> </button> <input type="text" placeholder="按鈕標題" value="' + node.children[i].name + '" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="' + node.children[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="add-flow" data-index="' + i + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"> </div>';
                    }
                };
                str += '<div class="item item-nogap quick_btn_div" data-pid="' + node.id + '" data-type="' + node.type + '">\
                    <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span> </button> </div>\
                    </div></div></div></div></div>';
                return str;
            }

            function tempText(node) {
                var str = '<div class="flow-item">\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" class="form-control" name=""></div>\
                </div>\
                <div class="card clearfix">\
                    <div>\
                        <div class="card-div" id="" data-index="">\
                            <div class="card-element">\
                                <div class="text-card-title"><textarea rows="3" placeholder="標題" id="title_0"></textarea></div>\
                                <ul class="text-card-button btn_div_contaiter" id="">\
                                    <li class="item item-nogap flex flex-justify--between add-btn">\
                                        <button type="button" class="card-btn card-grey add bigger-125"><i class="fa fa-plus-circle"></i><span>按鈕</span></button>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\<div>\
                    <div class="or">或</div>\
                        <div class="card-quick-replies quick_btn_div_contaiter" id="">';
                if (node.children && node.children.length > 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        str += '<div class="item quick_item"><div class="flex flex-justify--between"><button type="button" class="card-btn card-grey delete del_quick_btn_con" data-cid="' + node.children[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="del-flow" data-index="' + i + '"> <i class="fa fa-trash-o bigger-120"></i> </button> <input type="text" placeholder="按鈕標題" value="' + node.children[i].name + '" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="' + node.children[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="add-flow" data-index="' + i + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"> </div>';
                    }
                };
                str += '<div class="item item-nogap quick_btn_div" data-pid="' + node.id + '" data-type="' + node.type + '">\
                                <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span></button></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
                return str;
            }

            function tempInit(node) {
                var tempArr = [{
                        icon: 'fa-font',
                        type: 'text',
                        text: '文字'
                    },
                    {
                        icon: 'fa-image',
                        type: 'img',
                        text: '圖片'
                    },
                    {
                        icon: 'fa-newspaper-o',
                        type: 'img-text',
                        text: '圖文'
                    },
                    {
                        icon: 'fa-list',
                        type: 'catalog',
                        text: '型錄'
                    },
                    {
                        icon: 'fa-volume-up',
                        type: 'audio',
                        text: '音訊'
                    },
                    {
                        icon: 'fa-film',
                        type: 'video',
                        text: '影音'
                    },
                    {
                        icon: 'fa-folder-o',
                        type: 'file',
                        text: '檔案'
                    }
                ];
                var str = '<div class="flow-item"><p class="flow-tit">请點選以下任意素材，開始建立</p>';
                for (var i = 0; i < tempArr.length; i++) {
                    str += '<button data-id="' + node.id + '" data-type="' + tempArr[i].type + '" class="btn btn-app"><i class="ace-icon fa size-18 ' + tempArr[i].icon + '"></i>' + tempArr[i].text + '</button>';
                };
                str += '</div>';
                return str
            }

        },

    }
    $.fn.myflow = function(options) {
        return this.each(function() {
            new myflow(this, options).init();
        });
    };

})(jQuery);