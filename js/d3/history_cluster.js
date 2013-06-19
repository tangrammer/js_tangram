define( function() {

    
    var
    radio=4,
    radio_max=150,
    width = 1100,
    height = 1600;

    var cluster = d3.layout.cluster()
            .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

    function _create_node(item){
        return {ns:item.ns,item:item, children:[]};
    };

    function recursive(colector, container){
       if(colector.children)
         for(var i=0; i<colector.children.length; i++){

            var child=colector.children[i];
//             console.log(child);
            var element=_create_node(child);
             container.children.push(element);
             recursive(child, element);
        }
    }

    function render(root, div_id, item_fn){

        var int_root=_create_node(root);

       recursive(root, int_root);
        
   //     console.dir(int_root);

        $(div_id).empty();
        $(div_id).hide();
        var svg = d3.select(div_id).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(40,0)");

        var nodes = cluster.nodes(int_root),
            links = cluster.links(nodes);

        var link = svg.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", diagonal);

        var node = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        // pipelines and root
        node.append("circle")
            .attr("display",function(d){ if(d.ns.indexOf("state_step_")>-1) return "visible"; return "none";})
            .attr("r", radio)
            .attr("fill","red")
            .on(item_fn.mouse_event_name, function(d,i){
              item_fn.fn.call(d.item);
                // not necesary but this works if(d3.select(this).attr("display"))

            })
        ;

        node.append("text")
            .attr("dx", function(d) { return d.children ? -8 : 8; })
            .attr("dy",3)
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) { return d.ns.replace("pipeline_", "").replace("state_step_", ""); });

        d3.select(self.frameElement).style("height", height + "px");        
        $(div_id).fadeIn(1000, function(){

               
        });
      


    };




    return render;

});
