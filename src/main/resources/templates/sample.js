/*
"use strict";

var tpCategoryMngObj = null;

$(document).ready(function() {
    tpCategoryMngObj = new tpCategoryMng();
});

function tpCategoryMng() {

    this.selected_detail = null;

    this.init = function() {

        // 메뉴 > active
        var commonUtil = new CommonUtil();
        commonUtil.adminLeftMenuInit();

        $( "#tp_adm_left_common_manage" ).addClass("active");
        $( "#tp_adm_left_common_manage" ).parent( "li" ).addClass("menu-open");
        $( "#tp_adm_left_productManage_categoryManage" ).addClass("active");

        this.setEvent();
        this.getInit();
    },
        this.setTreeEvent = function() {

            $( '#tp_adm_basic_code_tree' ).on('select_node.jstree', function (e, data) {

                var selected_id = data.node.id;

                var ajaxUtil = new AjaxUtil();

                var dataObj = {};
                dataObj.id = selected_id;

                var setObj = {
                    url: '/adm/commonManage/categoryDetailAjax',
                    callback: tpCategoryMngObj.codeDetailAjaxCB,
                    data: dataObj
                };

                ajaxUtil.ajaxCall(setObj);

            });
        },
        this.hideAllDiv = function() {

            $( "#tp_basic_code_child_view" ).css("display", "none");
            $( "#tp_basic_code_detail_view" ).css("display", "none");
            $( "#tp_basic_code_group_view" ).css("display", "none");
        },
        this.initChildView = function() {

            $( "#tp_basic_sub_p_category_id" ).val("");
            $( "#tp_basic_sub_category_name" ).val("");
            // $( "#tp_basic_sub_view_order" ).val("");
        },
        this.initGroupView = function() {

            $( "#tp_basic_group_name" ).val("");
        },
        this.initDetailView = function() {

            $( "#tp_basic_category_id" ).val("");
            $( "#tp_basic_p_category_name" ).val("");
            $( "#tp_basic_p_category_id" ).val("");
            $( "#tp_basic_category_name" ).val("");
            // $( "#tp_basic_view_order" ).val("");
            $( "#tp_basic_use_yn" ).empty();

            // $( '#tp_basic_is_del' ).empty();
        },
        this.setEvent = function() {

            this.setTreeEvent();

            $( "#tp_basic_code_group" ).click(function() {

                // 그룹 생성
                tpCategoryMngObj.hideAllDiv();
                tpCategoryMngObj.initGroupView();
                $( "#tp_basic_code_group_view" ).css("display", "block");

                $( "#tp_basic_group_name" ).focus();

            });

            $( "#tp_basic_code_child" ).click(function() {

                // 하위 항목 > 화면 표시

                // tree 에서 부모인지 check
                var arrNodes = $( '#tp_adm_basic_code_tree' ).jstree("get_selected",true);
                var type = arrNodes[0].data.type_custom;

                // p, c
                if(type == "c"){

                    toastr.error('그룹(부모)노드를 선택하세요');
                    return;
                }

                tpCategoryMngObj.hideAllDiv();
                tpCategoryMngObj.initChildView();
                $( "#tp_basic_code_child_view" ).css("display", "block");

                var categoryId = arrNodes[0].id;
                $( "#tp_basic_sub_p_category_id" ).val(categoryId);

            });

            $( "#tp_basic_code_sub_create" ).click(function() {

                // 하위 항목 > 생성
                var commonUtil = new CommonUtil();

                var area = $("#tp_basic_code_child_view").find(".required");

                if(tpCommonObj.validationChk(area)) {
                    var result = confirm("생성 하시겠습니까?");

                    if(result)
                    {
                        var ajaxUtil = new AjaxUtil();

                        var dataObj = {};
                        dataObj.p_category_id = $( "#tp_basic_sub_p_category_id" ).val();
                        dataObj.category_name = $( "#tp_basic_sub_category_name" ).val();
                        dataObj.viewOrder = $( "#tp_basic_sub_view_order" ).val();

                        var setObj = {
                            url: '/adm/commonManage/subCategoryAjax',
                            callback: tpCategoryMngObj.subCodeAjaxCB,
                            data: dataObj
                        };

                        ajaxUtil.ajaxCall(setObj);

                    }else{
                        toastr.error('취소 되었습니다');
                    }
                }

            });

            $( "#tp_basic_code_group_create" ).click(function() {

                var commonUtil = new CommonUtil();
                var group_name = $( "#tp_basic_group_name" ).val();

                var area = $("#tp_basic_code_group_view").find(".required");

                if(tpCommonObj.validationChk(area)) {
                    var ajaxUtil = new AjaxUtil();

                    var dataObj = {};
                    dataObj.category_name = group_name;

                    var setObj = {
                        url: '/adm/commonManage/insertGroupCategoryAjax',
                        callback: tpCategoryMngObj.groupCodeAjaxCB,
                        data: dataObj
                    };

                    ajaxUtil.ajaxCall(setObj);

                }

            });

            $( "#tp_basic_code_update" ).click(function() {

                var commonUtil = new CommonUtil();
                // 수정내용 비교
                var changed = false;
                var originObj = tpCategoryMngObj.selected_detail;

                // if(originObj.view_order == 0)
                // {
                // 	// parent
                // 	// 삭제여부
                // 	var del_val = commonUtil.toLowerCase( originObj.is_del );
                // 	var cur_del = $( "#tp_basic_is_del" ).val();
                //
                // 	if(del_val != cur_del){
                // 		changed = true;
                // 	}
                // }
                // else
                // {
                // child
                var use_yn = commonUtil.toLowerCase( originObj.use_yn );
                var cur_use = $( "#tp_basic_use_yn" ).val();

                if(use_yn != cur_use){
                    changed = true;
                }

                if( originObj.category_name != ($( "#tp_basic_category_name" ).val()) ){
                    changed = true;
                }
                else if( originObj.view_order != ($( "#tp_basic_view_order" ).val()) ){
                    changed = true;
                }
                // }

                if(changed == false){
                    toastr.error('변경된 내용이 없습니다');
                    return;
                }
                else
                {
                    // validate
                    // if(originObj.view_order == 0)
                    // {
                    // 	// parent
                    // }
                    // else
                    // {
                    // child


                    var area = $("#tp_basic_code_detail_view").find(".required");

                    if(tpCommonObj.validationChk(area)) {
                        var result = confirm("수정하시겠습니까?");

                        if(result)
                        {
                            // 수정 ajax
                            var ajaxUtil = new AjaxUtil();

                            var dataObj = {};
                            dataObj.category_id = originObj.category_id;
                            dataObj.use_yn = $( "#tp_basic_use_yn" ).val();
                            dataObj.p_category_id = originObj.p_category_id;

                            // if(originObj.view_order == 0)
                            // {
                            // 	// parent
                            // 	dataObj.detail_content = '';
                            // 	dataObj.view_order = originObj.view_order;
                            // }
                            // else
                            // {
                            // child
                            dataObj.category_name = $( "#tp_basic_category_name" ).val();
                            dataObj.view_order = $( "#tp_basic_view_order" ).val();
                            // }

                            var setObj = {
                                url: '/adm/commonManage/categoryDetailUpdateAjax',
                                callback: tpCategoryMngObj.codeDetailUpdateAjaxCB,
                                data: dataObj
                            };

                            ajaxUtil.ajaxCall(setObj);

                        }else{
                            toastr.error('취소 되었습니다');
                        }

                    }
                }

            });
        },
        this.getInit = function() {

            var ajaxUtil = new AjaxUtil();

            var dataObj = {};

            var setObj = {
                url: '/adm/commonManage/categoryTreeAjax',
                callback: this.codeTreeAjaxCB,
                data: dataObj
            };

            ajaxUtil.ajaxCall(setObj);

        },
        this.getTreeCurrent = function() {

            var ajaxUtil = new AjaxUtil();

            var dataObj = {};

            var setObj = {
                url: '/adm/commonManage/categoryTreeAjax',
                callback: this.getTreeCurrentCB,
                data: dataObj
            };

            ajaxUtil.ajaxCall(setObj);

        },
        this.getTreeCurrentCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }
            else
            {
                $( '#tp_adm_basic_code_tree' ).jstree().destroy(true);

                $( '#tp_adm_basic_code_tree' ).jstree({
                    'core' : {
                        'data' : data.dataObj.codeList,
                        "animation" : 0
                    }
                });

                tpCategoryMngObj.setTreeEvent();

                tpCategoryMngObj.hideAllDiv();
            }
        },
        this.codeTreeAjaxCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }
            else
            {
                $( '#tp_adm_basic_code_tree' ).jstree({
                    'core' : {
                        'data' : data.dataObj.codeList,
                        "animation" : 0
                    }
                });
            }
        },
        this.subCodeAjaxCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }

            // tree update
            tpCategoryMngObj.getTreeCurrent();
            toastr.success('하위 항목 생성 완료');

        },
        this.groupCodeAjaxCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }

            // tree update
            tpCategoryMngObj.getTreeCurrent();
            toastr.success('그룹코드 생성 완료');
        },
        this.codeDetailUpdateAjaxCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }

            // tree update
            tpCategoryMngObj.getTreeCurrent();
            toastr.success('수정 완료');

        },
        this.codeDetailAjaxCB = function(data, textStatus) {

            if(data.code != "R000")
            {
                toastr.error(data.msg);
                return;
            }
            else
            {
                tpCategoryMngObj.hideAllDiv();
                tpCategoryMngObj.initDetailView();
                $( "#tp_basic_code_detail_view" ).css("display", "block");

                tpCategoryMngObj.selected_detail = data.dataObj.detailList[0];

                $( "#tp_basic_category_id" ).val(tpCategoryMngObj.selected_detail.category_id);
                $( "#tp_basic_p_category_name" ).val(tpCategoryMngObj.selected_detail.pCategoryName);
                $( "#tp_basic_p_category_id" ).val(tpCategoryMngObj.selected_detail.p_category_id);
                $( "#tp_basic_category_name" ).val(tpCategoryMngObj.selected_detail.category_name);
                $( "#tp_basic_view_order" ).val(tpCategoryMngObj.selected_detail.view_order);
                $( "#tp_basic_u_date" ).val(tpCategoryMngObj.selected_detail.u_date);
                // 삭제여부
                var commonUtil = new CommonUtil();
                var use_yn = commonUtil.toLowerCase( tpCategoryMngObj.selected_detail.use_yn );

                var optionHTML = '';
                optionHTML += '<option value="y">사용</option>';
                optionHTML += '<option value="n">미사용</option>';

                $( '#tp_basic_use_yn' ).empty();
                $( '#tp_basic_use_yn' ).append(optionHTML);

                $( "#tp_basic_use_yn" ).val(use_yn);
            }
        }

    this.init();
}

*/
