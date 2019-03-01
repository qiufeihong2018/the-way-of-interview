var i=0;

function timedCount(){
    for(var j=0,sum=0;j<100;j++){
        for(var i=0;i<100000000;i++){
            sum+=i;
        }
    }
    // 调用 postMessage 向主线程发送消息
    postMessage(sum);
}

postMessage("Before computing,"+new Date());
timedCount();
postMessage("After computing,"+new Date());
