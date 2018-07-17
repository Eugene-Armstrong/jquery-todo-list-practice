$(function () {
    function generateUUID() {
        /*jshint bitwise:false */
        var i, random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
    }

    var $checkB = $(".done-todo");

    // 添加list-item
    $(document)
        .on("click","#button",function () {
            var $input = $(".input-text");
            if($input!=null && $input.val() != ""){
                var content ='<li id='+generateUUID()+' class="list-item">' +
                    '<input name="done-todo" type="checkbox" class="done-todo">' + $input.val()+ '</li>';
                $("#list-box").append(content);
                $input.val("");
            }else{
                alert("list内容不能为空！");
                $input.focus();
            }
        })

        //取消勾选
        .on("click",".done-todo",function (event) {
            var t = $(this);
            if(t.is(":checked")){
                t.parent().addClass("checked");
                t.attr("checked",false);
            }else{
                t.parent().removeClass("checked");
                t.attr("checked",true);
            }
            event.stopPropagation();
        })

        //点击All
        .on("click","a[data-filter='all']",function () {
            $checkB.each(function () {
                $(this).parent().show();
            })
        })

        //点击Active
        .on("click","a[data-filter='active']",function () {
            $(".list-item").each(function () {
                $(this).show();
                if($(this).find(".done-todo").is(":checked")){
                    $(this).css("display","none");
                }
            })
        })

        //点击Complete
        .on("click","a[data-filter='complete']",function () {
            $(".list-item").each(function () {
                $(this).show();
                if(!$(this).find(".done-todo").is(":checked")){
                    $(this).css("display","none");
                }
            })
        })

        //添加编辑
        .on("click",".list-item",function () {
            $(this).attr("contentEditable","true").focus();

        })
});