define([   "js/ew_related/ew_component_pipes.js", "js/pipelines/dispatcher.js",  "js/common.js",  "js/ew_related/transformations.js",   "js/pipelines/foreach_pipeline_type.js", "js/pipelines/pipeline_type.js","js/pipelines/mapper_pipeline_type.js","js/pipelines/switcher_pipeline_type.js", "js/pipelines/state_step_type.js"],
       function(component_pipes, dispatcher, common,  t,   Foreach_Pipeline,Pipeline, Mapper_Pipeline,Switcher_Pipeline, StateStep) {

           var o_w={
               render_object_viewer:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.update.body_current_state_display_name)
                       .addTransformation(t.templates.load_object_viewer)
                       .addTransformation(t.cache_data.object_viewer)

                       .addPipe(new Switcher_Pipeline("resource_header", 
                                                      function switcher(_value){
                                                          switch(_value){
                                                          case null:
                                                              //  in future it must became pipeline definitio
                                                              return t.templates.load_object_viewer_without_header;
                                                              break;
                                                          default:
                                                              return o_w.render_header;
                                                              break;
                                                          };
                                                      }, 
                                                      "resource.header",function(value){
                                                    if(value==null) return "null";
                                                    else return "collection";
                                                    
                                                }))
                       .addPipe(o_w.render_children)
                   ;
               },

               render_header:function(){
                   return new Pipeline(this.name)
                       .addTransformation(t.templates.load_object_viewer_with_header)
                       .addTransformation(t.cache_data.object_viewer_header)
                       .addTransformation(t.templates.configure_object_viewer_header)
                       .addTransformation(t.relationships.object_viewer_header)
                       .addPipe(o_w.switch_header)
                   ;
               },
               switch_header:function(){
                   return new Switcher_Pipeline(this.name, 
                                                function switcher(_value){
                                                    if(_value!=null && _value.length>0)
                                                        //                                                      return result.walk_object_viewer_header_children;
                                                         if(typeof(_value)==='function')
                                                        return t.templates.object_viewer_header_function;
                                                    else
                                                        return o_w.render_header_children;
                                                    else
                                                        return t.templates.object_viewer_header_error;
                                                    
                                                }, 
                                                "resource.header.children", function(value){
                                                    if(value==null) return "null";
                                                    else if(value.length==null) return "empty";
                                                    else if(typeof(value)==='function') return "empty";
                                                    else return "collection";
                                                    
                                                });
                   
               },

               render_header_children:function(){
                   return new Foreach_Pipeline(this.name, "resource.header.children")

                       .addTransformation(t.templates.load_object_viewer_child)
                       .addTransformation(t.cache_data.object_viewer_header_child)

                       .addPipe(component_pipes.render_component)
                   ;
               },
              
               render_children:function(){
                   return new Foreach_Pipeline(this.name, "resource.children")
                       .addPipe(component_pipes.render_component)

                   ;
               }
               
           };
           
           return common.naming_pipes(o_w);
       });



