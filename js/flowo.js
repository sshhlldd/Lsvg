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
            var that = this;
            console.log(this.config.data);
            if (this.config.data.length == 0) {
                var nid = that.getID(4);
                var obj = [{
                    rid: "",
                    id: nid,
                    name: '',
                    type: 'init',
                }];
                this.config.data.push([obj]);
            }
            temp += this.render();
            this.$elem.empty().append(temp);
            this.bindTempClick();
            this.bindCardClick();
            this.setLine();

        },
        render: function() {
            var d = true; //区分子元素不同父元素分节点
            var that = this;
            var temp = '';
            this.config.data.forEach(function(pnode) {
                temp += '<div class="flow-con">';
                pnode.forEach(function(snode) {
                    temp += '<div class="item-type">';
                    snode.forEach(function(item) {
                        temp += that.temp(item)
                    })
                    temp += '</div>'
                })
                temp += '</div>';
            })
            return temp;
        },
        bindTempClick: function() {
            var self = this;
            this.$elem.off('click', '.btn-app');
            this.$elem.on('click', '.btn-app', function() {
                var type = $(this).attr('data-type');
                var id = $(this).attr('data-id');
                self.changeChild(id, type);
                self.renderDom();
            })
        },
        bindCardClick: function() {
            var self = this;
            this.$elem.off('click', '.quick_btn_div');
            this.$elem.off('click', '[data-action=add-flow]');
            this.$elem.off('click', '[data-action=del-flow]');
            this.$elem.off('click', '[data-action=del-all]');
            this.$elem.on('click', '.quick_btn_div', function(event) {
                event.stopPropagation();
                var type = $(this).attr('data-type');
                var id = $(this).attr('data-pid');
                var quick = $(this).closest('.quick_btn_div_contaiter').find('.quick_item').length;
                var s = '<div class="item quick_item"> <div class="flex flex-justify--between"><input type="text" placeholder="按鈕標題" value="" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="" data-pid="' + id + '" data-type="' + type + '" data-action="add-flow" data-index="' + quick + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"> </div>'
                $(this).before(s);

            })
            this.$elem.on('click', '[data-action=add-flow]', function(event) {
                event.stopPropagation();
                if ($(this).attr('data-cid') !== '') return false;
                var pid = $(this).attr('data-pid');
                var pos = $(this).attr('data-index');
                var nid = self.getID(4);
                var obj = {
                    rid: pid,
                    id: nid,
                    name: '',
                    type: 'init',
                };
                self.addChild(obj, pos);
                self.renderDom();
            })
            this.$elem.on('click', '[data-action=del-all]', function(event) {
                    event.stopPropagation();
                    var id = $(this).attr('data-id');
                    self.delChild(id);
                    self.renderDom();


                })
                /*  this.$elem.on('click', '[data-action=del-flow]', function(event) {
                     event.stopPropagation();
                     if ($(this).attr('data-cid') !== '') {
                         var id = $(this).attr('data-pid');
                         self.delChild(id);
                         self.renderDom();
                     }
                     $(this).closest('.quick_item').remove();

                 }) */
        },
        //查找ID对象
        findChild: function(id) {
            var res = { node: [], fi: "", si: "" };
            this.config.data.forEach(function(pnode, fi) {

                pnode.forEach(function(snode, si) {
                    snode.forEach(function(item) {
                        if (item.rid === id) {
                            res.node = snode;
                            res.fi = fi;
                            res.si = si;
                            return;

                        }
                    })

                })

            })
            return res;
        },
        findParent: function(cid) {
            var res = { node: [], fi: "", si: "", ti: "" };
            try { 
                this.config.data.forEach(function(pnode, fi) {
                    pnode.forEach(function(snode, si) {
                        snode.forEach(function(item, ti) {
                            if (item.id === cid) {
                                res.node = item;
                                res.fi = fi;
                                res.si = si;
                                res.ti = ti;
                                throw new Error('ending');
                            }
                        })

                    })

                })
            } catch (e) { 
                if (e.message == "ending") {
                    console.log(res);
                }
            }
            return res;
        },
        //添加对象@arr=config.data,@id要添加children的id,@child要添加的对象
        addChild: function(child, pos) {
            var that = this;
            var flag = false; //判断插入的元素有没有分组
            var item = this.findParent(child.rid);
            //如果下一列没有元素直接插入返回
            if (item.fi === this.config.data.length - 1) {
                var arrobj = [
                    [child]
                ];
                this.config.data.push(arrobj);
                return false;
            }
            //插入的元素本身有分组，在分组中插入
            try { 
                this.config.data.forEach(function(pnode) {

                    pnode.forEach(function(snode) {

                        snode.forEach(function(item) {
                            if (item.rid === child.rid) {
                                snode.splice(pos, 0, child);
                                throw new Error('ending');
                            }
                        })

                    })

                })
            } catch (e) { 
                if (e.message == "ending") {
                    flag = true; //有分组标记变为true
                }
            }
            //如果没有分组需要找到分组的位置
            if (flag === false) {
                var arrobj = [child];
                var pos = 0; //判断分组元素插入的位置
                var insert = false; //判断子元素是否插入。
                try { 
                    this.config.data[item.fi + 1].forEach(function(node, i) {

                        var snode = that.findParent(node[0].rid); //获取分组元素的父元素的位置信息
                        //插入元素的父元素与同列中元素的父元素比对位置，如果插入元素的父元素位置比同级元素的父元素位置小，直接在这个元素前插入
                        //如果当前插入元素的父元素比所有列中的其他元素的si都大，应该直接插入到列的最末尾;
                        if (item.si < snode.si) {
                            pos = i;
                            insert = true;
                            throw new Error('groupending');
                        }
                        //插入元素的父元素和当前元素的父元素是同一个
                        if (item.si == snode.si) {
                            if (item.ti < snode.ti) {
                                pos = i;
                                insert = true;
                                throw new Error('groupending');
                            }
                        }


                    })
                } catch (e) { 
                    if (e.message == "groupending") {
                        this.config.data[item.fi + 1].splice(pos, 0, arrobj);
                    }
                }
                //如果都没有符合的就在这列最后插入
                if (insert == false) {
                    this.config.data[item.fi + 1].push(arrobj);
                }
            }

            console.log(this.config.data);
        },
        //添加对象@arr=config.data,@id要删除children的pid,@pos要删除child数组索引
        delChild: function(id) {
            console.log(id);
            var that = this;
            var item = this.findChild(id);
            if (item.node.length > 0) {
                alert("请先删除子元素");
                return false;
            }
            try { 
                this.config.data.forEach(function(pnode, fi) {

                    pnode.forEach(function(snode, si) {

                        snode.forEach(function(item, ti) {
                            if (item.id === id) {
                                snode.splice(ti, 1);
                                if (snode.length == 0) {
                                    pnode.splice(si, 1);
                                }
                                if (pnode.length == 0) {
                                    that.config.data.splice(fi, 1);
                                }
                                throw new Error('ending');
                            }
                        })

                    })

                })
            } catch (e) {}
        },
        changeChild: function(id, type) {
            try { 
                this.config.data.forEach(function(pnode) {

                    pnode.forEach(function(snode) {

                        snode.forEach(function(item) {
                            if (item.id === id) {
                                item.type = type;
                                throw new Error('ending');
                            }
                        })

                    })

                })
            } catch (e) { }
        },
        setLine: function() {

            var str = '';
            var $flow = this.$elem.find('.flow-con');
            var pointArr = []
            $flow.each(function(fi, fele) {
                var fh = [];
                $(this).find('.flow-item').each(function(ti, tele) {
                    var itemh = $(this).position().top;
                    $(this).find('.quick_item').each(function(li, lele) {
                        var py = itemh + parseInt($(this).position().top) + 36;
                        var cid = $(this).find('.add_material').attr('data-cid');
                        var cy = $('.flow-item[data-id=' + cid + ']').position().top + $('.flow-item[data-id=' + cid + ']').height() / 2;
                        var point = [2, py, 62, cy];
                        fh.push(point);
                    })

                })
                if (fh.length > 0) {
                    pointArr.push(fh);
                }

            })
            if (pointArr.length > 0) {
                var str = '';

                pointArr.forEach(function(ele, i) {
                    var l = 318 + 350 * i;
                    str += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="top:0;left:' + l + 'px">';
                    ele.forEach(function(item, j) {
                        str += '<g>\
                     <circle cx="' + item[0] + '" cy="' + item[1] + '" r="2" fill="#ccc" />\
                     <line x1="' + item[0] + '" y1="' + item[1] + '" x2="' + item[2] + '" y2="' + item[3] + '" style="stroke:#ccc;stroke-width:1" />\
                     <circle cx="' + item[2] + '" cy="' + item[3] + '" r="3" fill="#ccc" />\
                     </g>'
                    })
                    str += '</svg>'
                })
                this.$elem.prepend(str);
            }


        },
        //随机ID
        getID: function(length) {
            return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
        },
        temp: function(node) {

            var s = '';
            var item = this.findChild(node.id);
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
                var str = '<div class="flow-item" style="" data-id="' + node.id + '">\
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
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
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
                if (item.node && item.node.length > 0) {
                    for (var i = 0; i < item.node.length; i++) {
                        str += '<div class="item quick_item"><div class="flex flex-justify--between"><input type="text" placeholder="按鈕標題" value="' + item.node[i].name + '" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="' + item.node[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="add-flow" data-index="' + i + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"> </div>';
                    }
                };
                str += '<div class="item item-nogap quick_btn_div" data-pid="' + node.id + '" data-type="' + node.type + '">\
                    <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span> </button> </div>\
                    </div></div></div></div></div>';
                return str;
            }

            function tempText(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
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
                if (item.node && item.node.length > 0) {
                    for (var i = 0; i < item.node.length; i++) {
                        str += '<div class="item quick_item"><div class="flex flex-justify--between"><input type="text" placeholder="按鈕標題" value="' + item.node[i].name + '" class="inp title"> <button type="button" class="card-btn card-grey add_material" data-cid="' + item.node[i].id + '" data-pid="' + node.id + '" data-type="' + node.type + '" data-action="add-flow" data-index="' + i + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div><input type="hidden" value="" class="reply_material_id" name="reply_material_id"><input type="hidden" value="" class="btn_type" name="btn_type"></div>';
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
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <p class="flow-tit">请點選以下任意素材，開始建立</p>';
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