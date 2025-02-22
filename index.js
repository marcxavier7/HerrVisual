console.log ("Ya estamos otra vez en D3")

d3.csv ("ev_mig.csv").then (function (datos){
    
    
    console.log (datos)
 
/*    console.log (+(datos[0].Emigración))
    console.log (+(datos[1].Inmigración))
    console.log(new Date(datos[1].Año, datos[1].Periodo=="Semestre 1" ? 5 :  11, 30))*/
    
    const linea_Emigracion = d3.line()
        .x(d => x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
        .y(d => y(d.Emigración));
    
    const linea_Inmigracion = d3.line()
        .x(d => x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
        .y(d => y(d.Inmigración));
    
 
    var margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60
    }
    
    var width = 460 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom
    
    
    var elementoSVG = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
        
        //EJE X
        var x = d3.scaleTime()
            .domain(d3.extent(datos,function(d) {return new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30);}))
            .range([0,width]);
        elementoSVG.append("g")
            .attr("transform","translate(0," + height +")" )
            .call(d3.axisBottom(x));
        
        //EJE Y
        var y = d3.scaleLinear()
            .domain([0,d3.max(datos, function(d) {return Math.max(+d.Emigración, +d.Inmigración);})])
            .range([height, 0]);
        elementoSVG.append("g")
            .call(d3.axisLeft(y));
    
        //Tooltip

    
        var tooltip = d3.select ("body")
            .append("div")
            .attr("class", "tooltip")
        
        //Borrar tooltip Línea Emigración
        
        function borrarTooltip_Emigracion(){
            tooltip
                .transition()
                .style("opacity", 0) //Que no se muestre el tooltip
        }
    
        //Pintar tooltip Línea Emigración
    
        function pintarTooltip_Emigracion(d){
            tooltip
                .text("Año: " + d.Año + ", Período: " + d.Periodo + ", Emigración: " + d.Emigración)
                .style("top", d3.event.pageY + "px") //Te da la posición de la coordenada y donde se ha producido el evento, donde posicionar el tooltip
                .style("left", d3.event.pageX + "px") //Te da la posición de la coordenada x donde se ha producido el evento
                .transition()
                .style("opacity",1) //Para mostrar el tooltip
        }
    
        //Borrar tooltip Línea Inmigración
    
        function borrarTooltip_Inmigracion(){
            tooltip
                .transition()
                .style("opacity", 0) //Que no se muestre el tooltip
        }
    
        
        //Pintar tooltip Línea Inmigración
    
        function pintarTooltip_Inmigracion(d){
            tooltip
                .text("Año: " + d.Año + ", Período: " + d.Periodo + ", Inmigración: " + d.Inmigración)
                .style("top", d3.event.pageY + "px") //Te da la posición de la coordenada y donde se ha producido el evento, donde posicionar el tooltip
                .style("left", d3.event.pageX + "px") //Te da la posición de la coordenada x donde se ha producido el evento
                .transition()
                .style("opacity",1) //Para mostrar el tooltip
        }
        
        //Línea
        
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "steelblue")
            .attr("stroke-width",1.5)
            .attr("d",linea_Emigracion)
            .on ("mouseover", d => {
                pintarTooltip_Emigracion(d)
            })
            .on("mouseout", borrarTooltip_Emigracion)
    
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "red")
            .attr("stroke-width",1.5)
            .attr("d",linea_Inmigracion)
            .on ("mouseover", d => {
                pintarTooltip_Inmigracion(d)
            })
            .on("mouseout", borrarTooltip_Inmigracion)
    
    })
    
    
    
