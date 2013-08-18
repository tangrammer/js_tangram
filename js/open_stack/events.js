define(["js/common.js", "js/pipelines/dispatcher.js"],
       function(common, dispatcher) {


           var result= {
               throw_event:function (name){
                   return function(data_state, callback){
                       
                       dispatcher.dispatch(name, this, data_state);
                       callback(null, data_state);
                   };
               },
               tenant_selected:"tenant_selected",
               try_to_log:"try_to_log",
              send_create_server: "send_create_server",
               send_create_subnet: "send_create_subnet",
               send_create_network: "send_create_network",
               operation_selected:"operation_selected"


           };
           
           return result;







       });
