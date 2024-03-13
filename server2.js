var cluster=require('cluster')
var express= require('express')

if(cluster.isMaster){
    var cpuCount= require('os').cpus().length
    console.log('Master cluster setting up ' + cpuCount + ' workers');
    for(var i=0; i<cpuCount;i+=1){
        cluster.fork()
    }
    cluster.on('online',function(worker){
        console.log('Worker '+worker.process.pid+ ' is online');
    })
    cluster.on('exit' , function(worker,code,signal){
        console.log('Worker '+ worker.process.pid + 'dead with code ' + code + ' and Signal ' + signal) ;
        console.log('Starting a new Worker...!');
        cluster.fork()
    })
}else{
    var app= express()
    app.get('/getdata',(req,res)=>{
        res.send('Hello from Worker ' +process.id + ' process ' + process.pid)
    })
    app.listen(4000,()=>{
        console.log('server is ready ' ,process.pid);
    })
}