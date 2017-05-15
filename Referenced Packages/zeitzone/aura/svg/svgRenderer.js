({
    render: function(component, helper) {
        
        //grab attributes from the component markup
        var classname = component.get("v.class");
        var xlinkhref = component.get("v.xlinkHref");
        var ariaHidden = component.get("v.ariaHidden");
        var style = component.get("v.style");
        var idname = component.get("v.cId");
        
        var onclick = component.get("v.onclick");
        var data = component.get("v.data");
        //return an svg element w/ the attributes
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class', classname);
        svg.setAttribute('style', style);
        svg.setAttribute('id', idname);
        svg.setAttribute('aria-hidden', ariaHidden);
        svg.innerHTML = '<use xlink:href="'+xlinkhref+'"></use>';
        if(onclick=null){
        	svg.setAttribute('onclick', onclick);
        }
        svg.setAttribute('data-data', data);
        return svg;
    }
})