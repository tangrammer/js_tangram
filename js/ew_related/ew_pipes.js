define([  "js/ew_related/ew_ow_pipes.js", "js/pipelines/dispatcher.js",  "js/common.js",  "js/ew_related/transformations.js",   "js/pipelines/foreach_pipeline_type.js", "js/pipelines/pipeline_type.js","js/pipelines/mapper_pipeline_type.js","js/pipelines/switcher_pipeline_type.js", "js/pipelines/state_step_type.js"],
       function(object_viewer_pipes, dispatcher, common,  t,   Foreach_Pipeline,Pipeline, Mapper_Pipeline,Switcher_Pipeline, StateStep) {

           var result={
               
               render_pages_main:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.renders.page)
                       .addTransformation(t.renders.activity_list)
                       .addTransformation(t.renders.clean_trays)
                       .addTransformation(t.update.loading_object_editor)
                       .addTransformation(t.dao.load_pages_main_data)
                       .addTransformation(t.state_history.update_current_name)
                       .addTransformation(t.footer.update_breadcrumbs)                   
                       .addTransformation(t.state_history.save_to_cookie)
                       .addTransformation(t.renders.trays)
                       .addPipe(object_viewer_pipes.render_object_viewer)
                   ;
               },
               render_page_body:function(){
                   return new Pipeline(this.name)

                       .addTransformation(t.cache_data.page_body)

                       .addPipe(new Mapper_Pipeline("page_type", 
                                                    {"task": t.renders.task,
                                                     "object":result.render_pages_main}, 
                                                    "change_state_data.page_type"))
                   
                   //                       .throw_event_on_success("body_change_state")
                   ;

               },


               
               render_modal:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.renders.modal);
               },
               
               render_modal_your_history:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.modals.render_your_history);
               },

                 render_main_search_results:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.modals.render_search_results);
               },

               body_change_state:function(){
                   return new Pipeline(this.name)

                       .addTransformation(t.modals.close)
                       .addTransformation(t.state_history.prepare)
                       .addTransformation(t.state_history.save_to_cookie)
                       .addTransformation(t.transformations.debug)
                       .addPipe(new Mapper_Pipeline("state", 
                                                    {
                                                        "main_search_results":result.render_main_search_results,
                                                        "modal":result.render_modal,
                                                     "object_view":result.render_page_body}, 
                                                    "change_state_data.state"))
                       .addTransformation(t.footer.update_breadcrumbs)                   
                   //                       .throw_event_on_success("body_change_state")
                   ;
               },
               
               current_state_is_still_active:function(){
                   var p=new Pipeline(this.name);
                   p.addTransformation(t.transformations.check_current_state_is_active);
                   p.parallel=true;
                   return new Pipeline(this.name);
               },
               init:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.state_history.init)
                       .addTransformation(t.renders.footer)
                       .addTransformation(t.renders.header) 
                       .addTransformation(t.modals.init)//TODO 
                       .addTransformation(t.dao.load_dashboard_data)
                   //                       .addTransformation(t.transformations.body_change_state)
                   // i am proposing this tecnique of throwing an event-domain-name on "end" pipe to improve EOP... not always using on_end event, that doesn mean anyting more, and in this case we are inside of an "init" pipeline that doesn't mean nothing niether
                       .throw_event_on_success("body_change_state")
                   ;
               },
                   show_profile:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.dao.load_dashboard_data)
                       .throw_event_on_success("body_change_state")
                   ;
               },
               clear_history:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.state_history.clear_history)
                       .addTransformation(t.state_history.save_to_cookie)
                       .throw_event_on_success("window_reload")

                   ;

               }





               

               
               
               
               
               
               
           };
           
           return common.naming_pipes(result);
       });




