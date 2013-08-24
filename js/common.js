define(["js/pipelines/state_step_type.js"],function(State_step){
    var r= {
        naming_fns:function(result, prefix){
            var new_map={};
            for (var key in result){
                var data={ name:((prefix)?prefix:"")+key, fn:result[key] };
                //                console.log(data.name);
//                new_map[data.name]=new State_step(data.name, data.fn);
                new_map[data.name]={name:data.name,fn:data.fn};
            }
            return new_map;
        },
        toJson: function toJson(o){
            return JSON.stringify(o, null, 4);
        },
        naming_pipes:function(result, prefix){
            for (var key in result){
                var inter_arr=result[key];
//                inter_fn= inter_fn.bind({name:((prefix)?prefix:"")+key});
                result[((prefix)?prefix:"")+key]={name:((prefix)?prefix:""), arr:inter_arr};
            }
            return result;

        },
        local_ip:"192.168.1.26",
        remote_ip:"85.136.107.32",

        
        // d3 related functions

        //__data:{type:"", data:{item:{name:"", id:""}, href:""}, }
        create_node:function(the_name, __data){

            var _data=__data.data;
//            r.common
            var que={name:the_name,ns:the_name, children:[], type:__data.type, item_name:_data.item ? _data.item.name : "" , item_id:_data.item ? _data.item.id : "", item_href:__data.href};


            return que;
        }


        , 
        // data:{item.name, item.id, href}
        create_data:function(_type, _data){
            return {type:_type, data:_data};
        },
        logging:{
            dao:{
                dir:false
            },
            dispatcher:{
                searching:false,
                listeners:true,
                listeners_detail:true
            }
            
        }

    };
    return r;
});
