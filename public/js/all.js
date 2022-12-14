

var send = document.getElementById('send');
var content = document.getElementById('content');
var list = document.getElementById('list');
send.addEventListener('click',function(e){
    var str=content.value;
    var xhr = new XMLHttpRequest();
    xhr.open('post',"/addTodo");
    xhr.setRequestHeader('Content-type',"application/json")
    var todo = JSON.stringify({"content":str});
    xhr.send(todo);
    xhr.onload = function(){//onload：完畢後立刻執行
        var originData = JSON.parse(xhr.responseText);//parse:解析json 轉為JavaScript
        if(originData.success==false){
            alert(originData.message);
            return;
        }
        var data = originData.result;
        var str ='';
        for(item in data){
            str+='<li>'+ data[item].content+' <input type="button" value="刪除" data-id="'+ item + '"/></li>'
        }
        list.innerHTML=str;
        //innerHTML覆蓋原本的並渲染
    }
})


list.addEventListener('click',function(e){
    if(e.target.nodeName !=='INPUT'){//li節點
        return;
    }
    var id = e.target.dataset.id;//key名為id
    var xhr = new XMLHttpRequest();
    xhr.open('post','/removeTodo');
    xhr.setRequestHeader('Content-type','application/json');
    var removeTodo = JSON.stringify({"id":id});
    xhr.send(removeTodo);
    xhr.onload = function(){
        var originData = JSON.parse(xhr.responseText);
        //JSON轉為Jacascript可處理物件，responseText為字符串形式
        var data = originData.result;
    
        var str='';
        for(item in data){
            str+='<li>'+ data[item].content+' <input type="button" value="刪除" data-id="'+ item + '"/></li>'
        }
        list.innerHTML = str;
    }
})