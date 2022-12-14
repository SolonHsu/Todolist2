var send = document.getElementById('send');
var content = document.getElementById('content');
var list = document.getElementById('list');

send.addEventListener('click',function(e){
    /*var xhr = new XMLHttpRequest();
    xhr.open('post',"/addTodo");
    xhr.setRequestHeader('Content-type',"application/json")
    var todo = JSON.stringify({"content":'tmt'});
    xhr.send(todo);*/

    let str =content.value;
    fetch('addTodo',{
        method:"POST",
        headers:{'Content-type':"application/json"},
        body:JSON.stringify({"content":str}).then(function(res){
            return res.json()
        })
    })
});