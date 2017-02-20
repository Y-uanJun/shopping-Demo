window.onload=function(){
	var AllCheck = document.getElementsByClassName("allCheck");//全选框
	var Check = document.getElementsByClassName("check");//所有勾选框
	var goodsNumber = document.getElementById("goodsNum");
	var table = document.getElementById("table");
	var tr = table.getElementsByTagName("tr"); //行
	var priceTotal = document.getElementById("caluteSum");
    
    //更新总数
    function getTotal() {
        var selected = 0, price = 0, html = '';
        for (var i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                tr[i].className = 'on';
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value); //计算已选商品数目
                price += parseFloat(tr[i].getElementsByTagName('td')[4].innerHTML); //计算总计价格
            }else{
                tr[i].className = '';
            }
        }
        goodsNumber.innerHTML = selected; // 已选数目
        priceTotal.innerHTML = price.toFixed(2); // 总价
        /*selectedViewList.innerHTML = html;*/
        /*if (selected==0) {
            foot.className = 'foot';
        }*/
    }
    //计算单行价格
    function getSubtotal(tr) {
        var cells = tr.cells;
        var price = cells[2]; //单价
        var subtotal = cells[4]; //小计td
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        var span = tr.getElementsByTagName('span')[0]; //-号
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //如果数目只有一个，把-号去掉
        if (countInput.value == 1) {
            span.innerHTML = '';
        }else{
            span.innerHTML = '-';
        }
    }
	//选择框全选
	for(var i = 0 ; i < Check.length ; i++){
		Check[i].onclick = function(){
			if(this.className.indexOf('allCheck') == 0){
				
				//全选
				for (var j = 0; j < Check.length; j++) {
                    Check[j].checked = this.checked;

                }
			}
			if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                for (var i = 0; i < AllCheck.length; i++) {
                    AllCheck[i].checked = false;
                }
            }
            getTotal();//选完更新总计
		}

	}
	//给每一行元素添加事件
	for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
            var cls = el.className; //触发元素的class
            var countInout = this.getElementsByTagName('input')[1]; // 数目input
            var value = parseInt(countInout.value); //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            switch (cls) {
                case 'add': //点击了加号
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'dele': //点击了删除
                    var conf = confirm('确定删除此商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
            getTotal();
        }
    }

	


	

   


	
}

