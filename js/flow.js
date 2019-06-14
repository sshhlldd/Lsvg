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
            onLoaded: function() {}
        },
        init: function() {
            this.config = $.extend({}, this.defaults, this.options);
            this.renderDom();
            return this;
        },
        renderDom: function() {
            var temp = '';
            var that = this;
            if (this.config.data.length == 0) {
                var nid = that.getID(4);
                var obj = [{
                    rid: "",
                    id: nid,
                    name: '',
                    type: 'init',
                    content: { //头部内容例如文字，图片，链接等信息
                        text: "我知道我知道", //头部文字描述
                        imgsrc: "" //头部img
                    },
                    btnInfo: {
                        type: null,
                        value: []
                    }
                }];
                this.config.data.push([obj]);
            }
            temp += this.render();
            this.$elem.css('width', 350 * that.config.data.length);
            if (typeof(that.config.onLoaded) === 'function') {
                that.config.onLoaded();
            }

            this.$elem.empty().append(temp);
            this.bindTempClick();
            this.bindCardClick();
            this.setLine();

        },
        render: function() {
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
            this.$elem.off('click', '.add-btn');
            this.$elem.off('click', '[data-action=add-flow]');
            this.$elem.off('click', '[data-action=del-all]');
            this.$elem.off('click', '[data-action=add-phone]');
            this.$elem.off('click', '[data-action=add-url]');
            this.$elem.off('blur', '[data-action=edit-name]');
            this.$elem.off('blur', '[data-action=edit-text-content]');
            this.$elem.off('blur', '[data-action=edit-btnName]');
            function isFlow(id) {
                var item = this.findSelf(id);
                return item.node.btnInfo.value.btnVal.name === 'flow' ? true : false;
               
            }
            this.$elem.on('click', '.quick_btn_div', function(event) {
                event.stopPropagation();
                var id = $(this).attr('data-id');
                var obj = {                   
                    btnName: "", //按钮名称
                    btnVal:{
                        name:"",  //flow share phone url 四个按钮名称
                        value:""//如果是flow value值为子流程id
                    }               
                }
                var item = self.findSelf(id);
                item.node.btnInfo.value.push(obj);
                item.node.btnInfo.type='quick';
                self.renderDom();

            })
            this.$elem.on('click', '.add-btn', function(event) {
                event.stopPropagation();
                var id = $(this).attr('data-id');
                var obj = {                   
                    btnName: "", //按钮名称
                    btnVal:{
                        name:"",  //flow share phone url 四个按钮名称
                        value:""//如果是flow value值为子流程id
                    }               
                }
                var item = self.findSelf(id);
                item.node.btnInfo.value.push(obj);
                item.node.btnInfo.type='default';
                self.renderDom();           
            })
            this.$elem.on('click', '[data-action=add-flow]', function(event) {
                event.stopPropagation();
                if ($(this).attr('data-cid') !== '') return false;
                var pid = $(this).attr('data-id');
                var pos = $(this).attr('data-index');
                var way=$(this).attr('data-way');
                var nid = self.getID(4);
                var cobj = {
                    rid: pid,
                    id: nid,
                    name: '',
                    type: 'init',
                    content: {
                        text: ""
                    },
                    btnInfo: {
                        type: null,
                        value: [],
                    }
                };
                self.addChild(cobj, pos,way);
                self.renderDom();
            })
            this.$elem.on('click', '[data-action=del-all]', function(event) {
                event.stopPropagation();
                var id = $(this).attr('data-id');
                self.delChild(id);
                self.renderDom();


            })
            this.$elem.on('click', '[data-action=del-btn]', function(event) {
                event.stopPropagation();
                var id = $(this).attr('data-id');
                
                self.renderDom();


            })
            this.$elem.on('click', '[data-action=add-phone]', function(event) {
                event.stopPropagation();
                var value = $(this).attr('data-value');
                var idx = $(this).attr('data-index');
                var id = $(this).attr('data-id');
                var url_input_html = '<input type="text" class="btn_phone" value="' + value + '" placeholder="請輸入電話號碼"><br/><span style="display: inline-block;color: red;">&nbsp;&nbsp;&nbsp;&nbsp;範例：+886287737511</span>';
                $('.card-postback').html(url_input_html);
                $('.card-postback-wrapper').show();
                $('.card-postback').offset({
                    top: $(this).offset().top + 30,
                    left: $(this).offset().left - 200
                });
                $('.btn_phone').focus();
                $('.btn_phone').on("blur", function() {
                    var phone = $(this).val();
                    var item = self.findSelf(id);
                    item.node.btnInfo.value[idx].phone = phone;
                    self.renderDom();
                })

            })
            this.$elem.on('click', '[data-action=add-url]', function(event) {
                event.stopPropagation();
                var value = $(this).attr('data-value');
                var idx = $(this).attr('data-index');
                var id = $(this).attr('data-id');
                var url_input_html = '<input type="text" class="btn_url" value="' + value + '" placeholder="請輸入网址"><br/><span style="display: inline-block;color: red;">&nbsp;&nbsp;&nbsp;&nbsp;範例：https://www.facebook.com/</span>';
                $('.card-postback').html(url_input_html);
                $('.card-postback-wrapper').show();
                $('.card-postback').offset({
                    top: $(this).offset().top + 30,
                    left: $(this).offset().left - 200
                });
                $('.btn_url').focus();
                $('.btn_url').on("blur", function() {
                    var url = $(this).val();
                    var item = self.findSelf(id);
                    item.node.btnInfo.value[idx].url = url;
                    self.renderDom();
                })

            })
            this.$elem.on('blur', '[data-action=edit-name]', function(event) {
                event.stopPropagation();
                var value = $(this).val();
                var id = $(this).attr('data-id');
                var item = self.findSelf(id);
                item.node.name = value;
                self.renderDom();
            })
            this.$elem.on('blur', '[data-action=edit-text-content]', function(event) {
                event.stopPropagation();
                var value = $(this).val();
                var id = $(this).attr('data-id');
                var item = self.findSelf(id);
                item.node.content.text = value;
                console.log(self.config.data);
                self.renderDom();
            })
            this.$elem.on('blur', '[data-action=edit-btnName]', function(event) {
                event.stopPropagation();
                var value = $(this).val();
                var id = $(this).attr('data-id');
                var idx = $(this).attr('data-index');
                var item = self.findSelf(id);
                item.node.btnInfo.value[idx].btnName = value;
                console.log(self.config.data);
                self.renderDom();
            })
            $(".card-postback-wrapper").on("click", function(e) {
                if ($(e.target).closest(".card-postback").length > 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })

        },
        //查找ID子对象
        findChild: function(id) {
            var res = {
                node: [],
                fi: "",
                si: ""
            };
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
        //找到当前的对象及其对应的三层索引值
        findSelf: function(cid) {
            var res = {
                node: [],
                fi: "",
                si: "",
                ti: ""
            };
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
                if (e.message == "ending") {}
            }
            return res;
        },
        //添加对象,@child要添加的子对象，@pos子对象添加的位置,@way是默认回复还是快速回复
        addChild: function(child, pos, way) {
            var that = this;
            var flag = false; //判断插入的元素有没有分组
            //添加父元素的btn信息
            var item = this.findSelf(child.rid);
            item.node.btnInfo.value[pos].btnVal.name = 'flow';
            item.node.btnInfo.value[pos].btnVal.value = child.id;
            
            item.node.btnInfo.type = way;
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

                        var snode = that.findSelf(node[0].rid); //获取分组元素的父元素的位置信息
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
                that.mytip("请先删除子元素");
                return false;
            }
            var pid = $('.add_material[data-cid=' + id + ']').attr('data-id');
            var idx = $('.add_material[data-cid=' + id + ']').attr('data-index');
            var pitem = this.findSelf(pid);
            if (pitem.node.length !== 0) {
                pitem.node.btnInfo.value.splice(idx, 1);
            }



            try {
                this.config.data.forEach(function(pnode, fi) {

                    pnode.forEach(function(snode, si) {

                        snode.forEach(function(item, ti) {
                            if (item.id === id) {
                                snode.splice(ti, 1);
                                //如果三层元素为空就删掉这层
                                if (snode.length == 0) {
                                    pnode.splice(si, 1);
                                }
                                //如果二层元素为空则删除
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
            } catch (e) {}
        },
        setLine: function() {

            var str = '';
            var $flow = this.$elem.find('.flow-con');
            var pointArr = []
            $flow.each(function(fi, fele) {
                var fh = [];
                $(this).find('.flow-item').each(function(ti, tele) {
                    var itemh = $(this).position().top;
                    if ($(this).find('.flow').length > 0) {
                        $(this).find('.flow').each(function(li, lele) {
                            var py = itemh + parseInt($(this).position().top) + 100;
                            var cid = $(this).find('.add_material').attr('data-cid');
                            var cy = $('.flow-item[data-id=' + cid + ']').position().top + $('.flow-item[data-id=' + cid + ']').height() / 2;
                            var point = [2, py, 62, cy];
                            fh.push(point);
                        })
                    }
                    if ($(this).find('.quickflow').length > 0) {
                        $(this).find('.quickflow').each(function(li, lele) {
                            var py = itemh + parseInt($(this).position().top) + 36;
                            var cid = $(this).find('.add_material').attr('data-cid');
                            var cy = $('.flow-item[data-id=' + cid + ']').position().top + $('.flow-item[data-id=' + cid + ']').height() / 2;
                            var point = [2, py, 62, cy];
                            fh.push(point);
                        })
                    }


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
        mytip:function(html) {
            var modalDiv =
                '<div class="my_tip">\
                  <div class="tip_body">' +
                html +
                "</div>\
                 </div>";
            $("body").append(modalDiv);
            $(".my_tip").addClass("animation-mytip-in");
            setTimeout(function() {
                $(".my_tip").fadeOut(function() {
                    $(this).remove();
                });
            }, 2000);
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
                    s += tempCatalog(node);
                    break;
                case 'video':
                    s += tempVideo(node);
                    break;
                case 'audio':
                    s += tempAudio(node);
                    break;
                case 'file':
                    s += tempFile(node);
                    break;
                default:
                    s += tempInit(node);

            }
            return s;
            //档案模块
            function tempFile(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-file"></i> <span class="text">pdf、zip、doc、xls、ppt<br>音訊大小為 25MB  以內</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>';
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }
            //音讯模板
            function tempAudio(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-volume-up"></i> <span class="text">點此上傳<br>音訊大小為 25MB  以內</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>';
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }
            //影片模板
            function tempVideo(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-youtube-play"></i> <span class="text">點此上傳<br>影片大小為 25MB 以內</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>';
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }
            //型录模板
            function tempCatalog(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="row form-group form-horizontal">\
                <label class="col-xs-7 no-padding-right control-label">設置第一個為主內容<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-5 no-padding-right"><select data-id="' + node.id + '" class="form-control">\
                    <option value="1">是</option>\
                    <option value="2">否</option>\
                </select></div>\
                </div>\
                <div class="row form-group form-horizontal">\
                <label class="col-xs-5 no-padding-right control-label">更多按鈕標題<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-7 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control"></div>\
                </div>\
                <div class="row form-group form-horizontal">\
                <label class="col-xs-5 no-padding-right control-label">更多按鈕URL<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-7 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>\
                <div class="card-element_text"><input type="text" value="" placeholder="標題  建議80個字符以內" class="inp"></div>\
                <div class="card-element_text"><textarea placeholder="描述  建議80個字符以內" class="area"></textarea></div>\
                <div class="card-element_text"><input type="url" value="" placeholder="網址" class="inp"></div>'
                str += '</div></div>';
                str += '</div></div>';
                return str;
            }
            //图文模板
            function tempImgText(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-camera"></i> <span class="text">圖片大小為 1MB 以下</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>\
                <div class="card-element_text"><input type="text" value="" placeholder="標題  建議80個字符以內" class="inp"></div>\
                <div class="card-element_text"><textarea placeholder="描述  建議80個字符以內" class="area"></textarea></div>\
                <div class="card-element_text"><input type="url" value="" placeholder="網址" class="inp"></div>'
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }

            //图片模板
            function tempImg(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <label class="card-element_image"> <div class="noimage"> <i class="fa fa-camera" style="top:40%;font-size:40px;"></i> <span class="text">点此上传<br />圖片大小為 1MB 以下</span> </div> <div class="image-uploader js-root-dropzone image" id="image-upload-0"> </div></label>';
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }
            //文字模板
            function tempText(node) {
                var str = '<div class="flow-item" data-id="' + node.id + '">\
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-type="text" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
                <div class="row form-group form-horizontal">\
                    <label class="col-xs-4 no-padding-right control-label">素材名稱<span class="required" aria-required="true">* </span></label>\
                    <div class="col-xs-8 no-padding-right"><input type="text" data-id="' + node.id + '" data-action="edit-name" class="form-control" value="' + node.name + '" name="name"></div>\
                </div>\
                <div class="card clearfix"><div class="card-div">\
                <div class="card-element">\
                <div class="text-card-title"><textarea rows="3" placeholder="標題" data-action="edit-text-content" data-id="' + node.id + '">' + node.content.text + '</textarea></div>';
                str += btnStr(node, item);
                str += '</div></div>';
                return str;
            }

            function btnStr(node) {
                var btnStr = "";                  
                //判断是否有btn属性
                if (node.btnInfo.value.length > 0) {
                    //如果btn是普通回复
                    if (node.btnInfo.type === 'default') {
                        btnStr += '<ul class="text-card-button btn_div_contaiter">';

                        for (var i = 0; i < node.btnInfo.value.length; i++) {
                            if (node.type === 'img-text') { 
                                var btnArr = {
                                    'flow': { icon: 'fa-plus-square-o', action: 'add-flow',val:'',addclass:''},
                                    'share': { icon: 'fa-share', action: 'add-forward', val: '', addclass: '' },
                                    'phone': { icon: 'fa-phone', action: 'add-phone', val: '', addclass: '' },
                                    'url':{ icon: 'fa-link', action: 'add-url',val:'',addclass:''}
                                } 
                            } else {
                                var btnArr = {
                                    'flow': { icon: 'fa-plus-square-o', action: 'add-flow',val:'',addclass:''},
                                    'phone': { icon: 'fa-phone', action: 'add-phone', val: '', addclass: '' },
                                    'url':{ icon: 'fa-link', action: 'add-url',val:'',addclass:''}
                                }
                            }
                            btnStr += '<li class="item flex flex-justify--between '+node.btnInfo.value[i].btnVal.name+'">\
                        <button type="button" class="card-btn card-grey"  data-index="' + i + '" data-id="' + node.id + '" data-action="del-btn"><i class="fa fa-trash-o bigger-120"></i></button>\
                        <input type="text" placeholder="按鈕標題" class="inp title" data-index="' + i + '" data-id="' + node.id + '" data-action="edit-btnName" value="' + node.btnInfo.value[i].btnName + '">';
                            if (node.btnInfo.value[i].btnVal.name !== '') {
                                btnArr[node.btnInfo.value[i].btnVal.name].val = node.btnInfo.value[i].btnVal.value;
                                btnArr[node.btnInfo.value[i].btnVal.name].addclass = 'green';
                           }     
                            for (k in btnArr) {
                                if (k === 'flow') {
                                  btnStr+='<button type ="button" data-index="' + i + '" data-cid="' + btnArr[k].val+ '" data-id="' + node.id + '" data-type="' + node.type + '" data-way="' + node.btnInfo.type + '" data-action="'+btnArr[k].action+'" class="card-btn card-grey add_material '+btnArr[k].addclass+'"><i class="fa bigger-120 '+btnArr[k].icon+'"></i></button>';                                  
                                } else {
                                    btnStr+='<button type="button" data-index="' + i + '" data-id="' + node.id + '" data-value="' +btnArr[k].val+ '" data-action="'+btnArr[k].action+'" class="card-btn card-grey '+btnArr[k].addclass+'"><i class="fa bigger-120 '+btnArr[k].icon+'"></i></button>'; 
                              }
                          }
                        btnStr+='</li>';
                        }

                        btnStr += '<li class="item item-nogap flex flex-justify--between add-btn" data-id="' + node.id + '" data-type="' + node.type + '">\
                                        <button type="button" class="card-btn card-grey add bigger-125"><i class="fa fa-plus-circle"></i><span>按鈕</span></button>\
                                    </li>\
                                    </ul>';
                    }
                    btnStr += '</div></div>'
                        //如果btn是快速回复
                    if (node.btnInfo.type === 'quick') {
                        
                        btnStr += '<div class="quick_div">\
                        <div class="card-quick-replies quick_btn_div_contaiter">';

                        for (var i = 0; i < node.btnInfo.value.length; i++) {
                            var addclass= "";
                            if (node.btnInfo.value[i].btnVal.name !== '') {
                                addclass = 'green';
                           } 
                            btnStr += '<div class="item quick_item quick' + node.btnInfo.value[i].btnVal.name + '"><div class="flex flex-justify--between"><button type="button" class="card-btn card-grey"  data-index="' + i + '" data-id="' + node.id + '" data-action="del-btn"><i class="fa fa-trash-o bigger-120"></i></button><input type="text" placeholder="按鈕標題" data-action="edit-btnName" data-index="' + i + '" data-id="' + node.id + '"  value="' + node.btnInfo.value[i].btnName + '" class="inp title"> <button type="button" class="card-btn card-grey add_material '+addclass+'" data-cid="' + node.btnInfo.value[i].btnVal.value + '" data-id="' + node.id + '" data-type="' + node.type + '" data-action="add-flow" data-index="' + i + '"> <i class="fa fa-plus-square-o bigger-120"></i> </button> </div></div>';
                        }

                        btnStr += '<div class="item item-nogap quick_btn_div" data-id="' + node.id + '" data-type="' + node.type + '">\
                                <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span></button></div>\
                            </div>\
                        </div>\
                    </div>';
                    }

                } else {
                    //没有btn的时候显示默认的回复和快速回复按钮
                    if (node.type === 'text' || node.type === 'img-text') {
                        btnStr += '<ul class="text-card-button btn_div_contaiter" id=""><li  data-id="' + node.id + '" data-type="' + node.type + '" class="item item-nogap flex flex-justify--between add-btn">\
                        <button type="button" class="card-btn card-grey add bigger-125"><i class="fa fa-plus-circle"></i><span>按鈕</span></button>\
                        </li></ul>';
                    }
                    btnStr += '</div></div>';
                    btnStr += '<div class="quick_div">';
                    if (node.type === 'text' || node.type === 'img-text') {
                        btnStr += '<div class="or">或</div>';
                    }
                    btnStr += '<div class="card-quick-replies quick_btn_div_contaiter" >\
                    <div class="item item-nogap quick_btn_div" data-id="' + node.id + '" data-type="' + node.type + '">\
                                <div class="flex flex-justify--between"> <button type="button" class="card-btn card-grey add bigger-125 add_quick_btn"> <i class="fa fa-plus-circle"></i> <span>快速回覆</span></button></div>\
                            </div>\
                        </div>\
                    </div>'

                }
                return btnStr;
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
                <button type="button" class="card-btn card-grey" title="删除" data-id="' + node.id + '" data-action="del-all"> <i class="fa fa-trash-o bigger-120"></i></button>\
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