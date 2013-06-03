require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

define(["js/pipelines/state_type.js", "js/pipelines/json_data.js", "js/pipelines/dispatcher.js", "js/pipelines/pipeline_type.js", "js/pipelines/helper_display.js","js/async.js", "js/d3/history_cluster.js"],
       function(State, json_data, dispatcher, Pipeline, display, async, history_cluster) {
           var app_data=State();
           // console.log(toJson(json_data));
           dispatcher.Pipeline=Pipeline;

           var good_morning_fn=function(data_state, callback){
               setTimeout(function () {
                   var user_history=[];
                   user_history.push("take a shower");
                   user_history.push("have breakfast");
                   data_state.history.push.apply(data_state.history, user_history);
                   callback(null, data_state);
               }, 250);
           };

           var good_afternoon_fn=function(data_state, callback){
               setTimeout(function () {
                   var user_history=[];
                   user_history.push("have lunch");
                   user_history.push("have a nap");
                   data_state.history.push.apply(data_state.history, user_history);
                   callback(null, data_state);
               }, 250);
           };

           var good_night_fn=function(data_state, callback){
               setTimeout(function () {
                   var user_history=[];
                   user_history.push("have dinner");
                   user_history.push("go to bed");
                   data_state.history.push.apply(data_state.history, user_history);
                   // to throw an error                    callback("that's an error!!", data_state);
                   callback(null, data_state);
               }, 250);
           };
           
           var the_slower_fn=function(data_state, callback){
               setTimeout(function () {
                   var user_history=[];
                   user_history.push("i am the slowest");
                   data_state.history.push.apply(data_state.history, user_history);
                   callback(null, data_state);
               }, 2000);
           };


           var on_success=function(res, pipeline){

               pipeline.getSteps().map(
                   function(step){
                       
                       display.jqueryIterateAndDisplayHistoryStep("#left", step.ns, step,  "history");
                   }
               );

               display.jqueryIterateAndDisplayHistoryStep("#center", pipeline.ns, pipeline, "history");

           };

           var on_error=function(err, pipeline){alert(err); };


           function clean_out(){
               $('#left').empty();

               $('#center').empty();
               $('#history_status').empty();
               $('#history_status').append("<b>transformation event history of pipelines and steps</b><br><br>");             
               dispatcher.reset();
           };



           function good_morning_and_good_afternoon_transformations_in_pipeline(){
               return  new Pipeline("good_morning_and_noon")
                   .addTransformation("Good_Morning", good_morning_fn)
                   .addTransformation("Good_Afternoon", good_afternoon_fn);

           }

           function good_night_transformation_in_pipeline(){
               return  new Pipeline("good_night")
                   .addTransformation("Good_Night", good_night_fn);

           }

           function init_history(first){
               app_data.history=[];
               app_data.history.push(first);
               return app_data;
           }

           function apply_good_morning_and_good_afternoon_pipeline(){
               clean_out();
               var  on_success_apply_good_morning_and_good_afternoon_pipeline=function(res, pipeline){
                   
                   on_success(res, pipeline); 
                   console.dir(res);
                   $('#start_pipeline').prop("value", "good_night!").off('click').click(apply_good_night_transformation_in_pipeline);};

               good_morning_and_good_afternoon_transformations_in_pipeline()
                   .set_on_success(on_success_apply_good_morning_and_good_afternoon_pipeline)
                   .set_on_error(on_error)
                   .apply_transformations(init_history("wake up!"));
           }

           function apply_good_night_transformation_in_pipeline(){
               clean_out();
               function on_success_bis(res, pipeline){
                   on_success(res, pipeline); 
                   console.dir(res);

//                   app_data.initial_state= {history:["wake up!"]};

                   $('#start_pipeline').prop("value", "start day and noon!").off('click').click(apply_good_morning_and_good_afternoon_pipeline);
               };


               good_night_transformation_in_pipeline().set_on_success(on_success_bis).set_on_error(on_error)
                   .apply_transformations(app_data);
           }
           function get_alert(message){
               return function(res, pipeline){
                   var extended_message=message+" in pipeline: "+ ((pipeline)? pipeline.ns: "no_pipeline")+"\n"+toJson((res)? res : "no res!");

                   console.log(extended_message);
                   // alert(extended_message);
               };
           }
           var  on_success_pipe=function(message){
               return function(res, pipeline){
                   on_success(res, pipeline); 
                //   get_alert(message);
                   
               };};

           function apply_composition_pipelines_day_and_night(){
               
               clean_out();

               var pipe_1=good_morning_and_good_afternoon_transformations_in_pipeline().set_on_success(on_success_pipe("success11111")).set_on_error(get_alert("error 1"));
               var pipe_2=good_night_transformation_in_pipeline().set_on_success(on_success_pipe("success222")).set_on_error(get_alert("error 2"));

               var compose=  new Pipeline("day_and_night!")
                       .set_on_success(get_alert("success::: composing"))
                       .set_on_error(get_alert("error on composing"));

               compose.addPipe(pipe_1).addPipe(pipe_2);
               //                    .addPipe(pipe_1).addPipe(pipe_2);
               
               compose.apply_transformations(init_history("composing day and night"));
               

           }

           function apply_pipeline_with_listener_to_run_pipeline_in_parallel(){
               clean_out();
               
               var pipe_1=good_morning_and_good_afternoon_transformations_in_pipeline().set_on_success(
                   on_success_pipe("success11111")
               ).set_on_error(get_alert("error 1"));
               var pipe_listener= new Pipeline("pipelineListen")
                       .addTransformation("i_am_the_slowest", the_slower_fn)
                       .set_on_success(on_success_pipe("successlistenter")).set_on_error(get_alert("error  listener"));

               dispatcher.listen("ON_INIT","pipeline_good_morning_and_noon",  pipe_listener, true);
               pipe_1.apply_transformations(init_history("parallel_listener"));
           };

           function  apply_pipeline_with_listener_to_run_pipeline_synchronous(){
               clean_out();
               
               var pipe_1=good_morning_and_good_afternoon_transformations_in_pipeline();
               var pipe_listener=new Pipeline("sync_listener")
                       .addTransformation("i_am_the_slowest", the_slower_fn)
                       .set_on_success(on_success_pipe("successlistenter")).set_on_error(get_alert("error  listener"));

               dispatcher.listen("ON_INIT","pipeline_good_morning_and_noon",  pipe_listener, false);

               var pipe_listener2=new Pipeline("pipelineListen2")
                       .addTransformation("i_am_the_slowestTT", the_slower_fn).set_on_success(on_success_pipe("successlistenter2")).set_on_error(get_alert("error  listener"));

               dispatcher.listen("ON_INIT","pipeline_good_morning_and_noon",  pipe_listener2, false);


               pipe_1.set_on_success(on_success_pipe("success good morning and noon"));
               pipe_1.apply_transformations(init_history("sync_listener"));
           };

           function init_display(){
               $('#input_user').append(
                   '<input type="button" id="start_pipeline" value="start day and noon!"/><br>'+
                       '<input type="button" id="compose_pipelines" value="start composition pipelines: \'start day and noon\' and \'start night\'" /><br>'+
                       '<input type="button" id="compose_parallel_pipelines_on_init" value="start pipeline and on_init pipeline event start async pipeline \'slower\'"/><br>'+
                       '<input type="button" id="compose_sync_pipelines_on_init" value="start pipeline and on_init pipeline event start sync pipeline \'slower\'"/><br>');
               
               $('#start_pipeline').click(apply_good_morning_and_good_afternoon_pipeline);
               $('#compose_pipelines').click(function(){apply_composition_pipelines_day_and_night();});
               $('#compose_parallel_pipelines_on_init').click(function(){apply_pipeline_with_listener_to_run_pipeline_in_parallel();});
               $('#compose_sync_pipelines_on_init').click(function(){apply_pipeline_with_listener_to_run_pipeline_synchronous();});


              dispatcher.reset_filters();

               dispatcher.filter( function(data_state, callback){
                   var that=this;
                   
                   setTimeout(function () {
                       var history_message=that.transformation_event_type+"/"+
                               that.target.ns+((that.transformation_event_type=="ON_END")? " finished in "+that.target.diff+"ms":" ... timing ..." );
                       if(contains(history_message, "state_step_"))
                           history_message=" -------- "+history_message;
                       else
                           if (that.transformation_event_type=="ON_END"){
                           if(data_state.process_history){

                               var root=create_node("root", create_data("root", {name:"root"}));
                               root.children=data_state.active_pipelines;
                               // data_state.process_history.map(function(item){
                               //     root.children.push(create_node(item.ns, create_data("pipeline", {})));
                               // });
                               
                               history_cluster(data_state);

                           }
                       }else{
                           
                       }
                       $('#history_status').append("<li>"+history_message.replace("ON_", "")+"</li>");

                       callback(null, data_state);
                   }, 10);}
                                );

           }
           
           



           



           

           
           return init_display;

       });
