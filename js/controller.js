require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
var all=[];
require.onResourceLoad = function (context, map, depArray) {
//console.log("prefix:"+map.prefix);    
all.push(map.name);    
//console.log("name:"+map.name);
};
function init(clean){
if(all.length>0) end();
if(clean) ["left", "center", "right"].map(function(item){$('#'+item).empty();});

    console.log("init()");
require(["js/start_ew.js", "js/start_proposal.js", "js/start_dev.js", "js/start_zendesk.js"],
        function(ew, proposal, dev, zendesk) {
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
            }
            // if(getURLParameter("dev"))
            //     dev(); 
            // else if (getURLParameter("proposal"))
            //     proposal();
            // // else if (getURLParameter("ew"))
            // //     ew();
            // else
            if(getURLParameter("proposal"))
                proposal();
            else
                zendesk();


});
}
console.log("pasando por controller");
init();

function end(){
    console.log("undef:");
all.map(function(item){

    require.undef(item);
});
};
