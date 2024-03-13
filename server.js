var cluster = require(cluster)
var express = require( 'express')

if(cluster.isMaster){

    var cpuCount= require('os').cpus.length
    for (var i=0;i<cpuCount;i+=1) {
        cluster.fork()
}
}else {
var app =express()
app.get('/getdata', (req,res)=>{

    res.send("Hello from  worker " , +cluster.Worker.id)
    })

    app.listen (4000,()=>{
        console.log('server is ready ',+cluster.worker.id);
        })
        cluster.on( 'exit', function( worker ){
            console.error( 'worker is exited' , worker.id);
            cluster.fork( )
        })

    }