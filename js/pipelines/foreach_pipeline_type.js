define(["js/fiber.min.js","js/pipelines/pipeline_type.js","js/pipelines/state_step_type.js","js/async.js","js/pipelines/dispatcher.js"],
       function( Fiber, Pipeline, StateStep,async, dispatcher) {
           

           var Foreach_Pipeline=Pipeline.extend(function(base){
               return  {
                   init: function(name,model_key, on_success, on_error) {
                       this.ns="pipeline_"+name;

                       this.model_key=model_key;
                       this.future_state_steps=[];
                       
                       this.on_success=on_success;
                       this.on_error=on_error;
                       return this;
                   },
                   

                   apply_transformations:function(data_state){

                       var that=this;
                       var seq=[];
                       var steps=this.future_state_steps;

                       this.future_state_steps=[];

                      
                       
                       for(var i=0; i<data_state[this.model_key].length; i++){
                           var pipe=new Pipeline("counter"+i);
                           // TODO: maybe clone
                           pipe.future_state_steps=steps;
                           pipe.set_on_success((function (i){
                               return function(results, pipeline){
                                   if(i!=data_state[that.model_key].length){

                                 //    alert(toJson(data_state['the_model'][i+1]));
                                   results.current_data=results[that.model_key][i+1];
                                       }
                                   $('#fn_transformation').html(" inside "+i+" ended!");};
                                   
                               })(i)
                           );
                           pipe.set_on_error(this.on_error);
                           this.future_state_steps.push(pipe);
                           
                       }
                       data_state.current_data=data_state[that.model_key][0];
                       base.apply_transformations.call(this, data_state);

                       // var that=this;
 
                       // var composition=async.compose.apply(null, this.getSteps().map(function(o){
                       //     return o.transform.bind(o);
                       // }));


                      

                       // function internal_call(){
                       //     composition($.extend(true, {}, data_state),function(err, res){

                       //     if(!err){
                       //         function callback(){
                       //         that.on_success(res, that);
                       //         };

                       //         that.on_end(res, callback);

                       //     }else{
                       
                       //         console.log("big one pipeline error: "+that.ns+"\n"+toJson(data_state));

                       //             that.on_error(err, that);
                               

                       //        // this method fails because is using a data  that.on_end(res);
                       //     }

                       // });
                       // };
                       //  this.on_init(data_state, internal_call);

                       
                   }

               };
           });

           return Foreach_Pipeline;
           
       });