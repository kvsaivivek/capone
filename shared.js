var em = required('events').EventEmmitter;


var emitter = new em()

emitter.on('callme', function(ev) {

comnsole.log('subscriber',ev);


}