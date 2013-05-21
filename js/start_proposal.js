require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

define(["js/pipelines/json_data.js", "js/pipelines/dispatcher.js", "js/pipelines/pipeline_type.js","js/pipelines/state_type.js", "js/pipelines/helper_display.js","js/async.js"],
       function(json_data, dispatcher, Pipeline, State,  display, async) {

           var timeOut=1000;

           var show_child=new Pipeline("show_childs").
                   addTransformation("loading_child_template",
                                     function(data_state, callback){
                                         var my_col=data_state.object_data.body.resources;
                                         if(!data_state.childs){
                                             data_state.childs=[];
                                         }
                                         
                                         if(data_state.childs.length<my_col.length){
                                             data_state.current_child=my_col[data_state.childs.length];
                                             data_state.childs.push(data_state.current_child);
                                             data_state["state_step_loading_child_template"].demo.data="iterating more";


                                         }else{
                                             dispatcher.remove("ON_END","state_step_loading_child_template",  show_child);
                                             data_state["state_step_loading_child_template"].demo.data="finish iteration";
                                         }
                                                  callback(null, data_state);                                         
                                     }
                                    ).
                   set_on_success(
                       function(results, pipeline){
                           alert("finishing show_pipeline");

                       }).
                   set_on_error(function(err, pipeline){
                           alert("error showing_pipeline");
                   });

           var p=function(){
               
               $('body').append("<b id='fn_transformation'>starting simulation  init</b><hr><div id='proposal'></div>");

               
               

               var pipeline1=new Pipeline("Welcome_to_the_user")
                       .addTransformation("query_server_user_dashboard", 
                                          function (data_state, callback){
                                              setTimeout(function () {
                                                  data_state.user_dashboard=json_data.user_data;
                                                  // only for demo display result
                                                  data_state["state_step_query_server_user_dashboard"].demo.data=data_state.user_dashboard;
                                                  callback(null, data_state);
                                              }, timeOut);
                                          })
                       .addTransformation("query_server_object_uri", 
                                          function (data_state, callback){
                                              setTimeout(function () {
                                                  if(data_state.user_dashboard.uuri=="/object_test")
                                                      data_state.object_data=json_data.test_objects;                                                      
                                                  // only for demo display result
                                                  data_state["state_step_query_server_object_uri"].demo.data=json_data.test_objects;
                                                  callback(null, data_state);
                                              }, timeOut);
                                          });

               pipeline1
                   .set_on_success(
                       function(results, pipeline){
                           $('#fn_transformation').html(" process ended!");
                           console.log(toJson(results));

                       })
                   .set_on_error(
                       function(error, pipeline){
                           alert("error"+toJson(error));})
                   .apply_transformations(State());
        
           };

           // EOP
           dispatcher.reset();
// here i can hear the on_end event, so the collection on json data is loaded
// now i need to iterate over this collectino and run pipelines in relation to each data type loaded

//maybe i need a  next function to call itself if still  there are elements availables
           dispatcher.listen("ON_END","state_step_query_server_object_uri",  show_child, false);
           dispatcher.listen("ON_END","state_step_loading_child_template",  show_child, false);
           



          // Filtering all tansformations ::: AOP 

           dispatcher.reset_filters();


           // filtering for timming
           dispatcher.filter( function(data_state, callback){
               var that=this;
               setTimeout(function () {
                   var history_message=that.transformation_event_type+"/"+
                           that.target.ns+((that.transformation_event_type=="ON_END")? " finished in "+that.target.diff+"ms":" ... timing ..." );
                   if(contains(history_message, "state_step_"))
                       history_message=" -------- "+history_message;
                   $('#history_status').append("<li>"+history_message.replace("ON_", "")+"</li>");

                   callback(null, data_state);
               }, 10);});

           // filtering to demo display 
           dispatcher.filter( function(data_state, callback){
               var that=this;
               setTimeout(function () {
                   if(that.transformation_event_type=="ON_END"){
                       $('#proposal').append("DONE: <b>"+that.target.ns+".</b> In Time: "+that.target.diff+"<br>");                 
                       if(data_state[that.target.ns])
                           $('#proposal').append("<span>"+toJson(data_state[that.target.ns].demo.data)+"</span><br><br>");                    
                   }
                   callback(null, data_state);
               }, 10);});


           return p;

       });
