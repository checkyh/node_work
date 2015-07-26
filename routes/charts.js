/**
 * Created by ¡¤ on 2015/7/21 0021.
 */
function charts(chart_no)
{
    var colorselector;
    colorselector = ["#f44336", "#f46c36", "#f48b36", "#f49d36", "#f4b836", "#f4ce36", "#f4e436", "#f4ed36", "#f2f436", "#e0f436", "#dbf436", "#bcf436", "#b3f436", "#a1f436", "#9df436", "#94f436", "#8bf436",
        "#79f436", "#70f436", "#55f436", "#4cf436", "#3ff436", "#36f455", "#36f47e", "#36f48b", "#36f4af", "#36f4e0", "#36f4f2", "#36e0f4", "#36aaf4", "#368bf4", "#366cf4", "#3648f4", "#5536f4", "#7e36f4", "#a136f4",
        "#c136f4", "#e436f4", "#f436d2", "#f436af", "#f43698", "#f43675", "#f4365e", "#f43651", "#f43643", "#f43636"];
    var color = function (xcode) {
        return colorselector[xcode["letter"]];
    };;
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var Tsv_name=chart_no.toString().concat(".tsv");
    console.log(Tsv_name);
    d3.tsv(Tsv_name, type, function (error, data) {
        if (error) throw error;

        x.domain(data.map(function (d) {
            return d.letter;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.frequency;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");
        var xcode;
        svg.selectAll("b")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                xcode = x(d.letter);
                return xcode;
            })
            .attr("fill", function (xcode) {
                return color(xcode);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("height", function (d) {
                return height - y(d.frequency);
            });
    });
    function type(d) {
        d.frequency = +d.frequency;
        return d;
    }
}
charts(chart_no);