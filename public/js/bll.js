var send = document.getElementById('send');
var content = document.getElementById('content');
var list = document.getElementById('list');


send.addEventListener('click',(e)=>{

    var str=content.value;
    const url = './addTodo';
    const todo = JSON.stringify({"content":str});

    fetch(url,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:todo
    })
    .then(response=>response.json())
    .then(data =>{
        //console.log(data.result);
        var str ='';
        var result=data.result;
        for(item in result){
            str+='<li>'+ result[item].content+' <input type="button" value="刪除" data-id="'+ item + '"/></li>'
        }
        list.innerHTML=str;
    }

    
)
    .catch(error=>{
        console.log(error);
    })
})
list.addEventListener('click',(e)=>{
    if(e.target.nodeName !=='INPUT'){//li節點
        return;
    }
    var id = e.target.dataset.id;//key名為id
    var url = './removeTodo';
    console.log(url);
    var removetodo = JSON.stringify({'id':id}); 
    fetch(url,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:removetodo
            }
        )
    .then(response=>response.json())
    .then(data=>{
            console.log(data);
            var str ='';
            var result=data.result;
            for(item in result){
                str+='<li>'+ result[item].content+' <input type="button" value="刪除" data-id="'+ item + '"/></li>'
        }
            list.innerHTML=str;
        })
    .catch(error=>{
        console.log(error);
        }
            )
    }
)
