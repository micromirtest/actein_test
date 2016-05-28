jQuery.noConflict();
(function(e){
    e.fn.sorted=function(t){
        var n={
            reversed:!1,
            by:function(e){
                return e.text()
                }
            };
    return e.extend(n,t),jQuerydata=e(this),arr=jQuerydata.get(),arr.sort(function(t,r){
        var i=n.by(e(t)),s=n.by(e(r));
        return n.reversed?i<s?1:i>s?-1:0:i<s?-1:i>s?1:0
        }),e(arr)
    }
})(jQuery),jQuery(function(){
    var e=function(e){
        var t={
            selected:!1,
            type:0
        };
        for(var n=0;n<e.length;n++)e[n].indexOf("selected-")==0&&(t.selected=!0),e[n].indexOf("segment-")==0&&(t.segment=e[n].split("-")[1]);
        return t
        },t=function(e){
        var t=e.parent().filter('[class*="selected-"]');
        return t.find("a").attr("data-value")
        },n=function(e){
        var t=e.parent().filter('[class*="selected-"]');
        return t.find("a").attr("data-value")
        },r={
        duration:800,
        easing:"easeInOutQuad",
        adjustHeight:"auto",
        useScaling:!0
        },i=jQuery("#list"),s=i.clone(),o=jQuery("ul.splitter");
    o.each(function(u){
        var a=jQuery(this),f=a.find("a");
        f.bind("click",function(u){
            var a=jQuery(this),l=a.parent(),c=e(l.attr("class").split(" ")),h=c.selected,p=c.segment;
            if(!h){
                f.parent().removeClass("selected-0").removeClass("selected-1").removeClass("selected-2"),l.addClass("selected-"+p);
                var d=t(o.eq(1).find("a")),v=n(o.eq(0).find("a"));
                if(v=="all")var m=s.find("li");else var m=s.find("li."+v);
                if(d=="size")var g=m.sorted({
                    by:function(e){
                        return parseFloat(jQuery(e).find("span").text())
                        }
                    });else var g=m.sorted({
                by:function(e){
                    return jQuery(e).find("strong").text().toLowerCase()
                    }
                });
        i.quicksand(g,r)
            }
            u.preventDefault()
        })
    });
var u=!0,a=jQuery("#performance-toggle"),f=a.html();
a.find("a").bind("click",function(e){
    u?(r.useScaling=!1,a.html('CSS3 scaling turned off. Try the demo again. <a href="#toggle">Reverse</a>.'),u=!1):(r.useScaling=!0,a.html(f),u=!0),e.preventDefault()
    })
});
