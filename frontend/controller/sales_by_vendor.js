$(document).ready(() => {
    initPage().then(() => {
        routePages();
        loadChart();
    });
});

async function loadChart() {
    var sales = await $.get('/get_sales_by_vendor');

    console.log(sales);

    sales = sales.map((sale) => {
        return {
            label: sale.name,
            value: sale.count
        };
    });

    console.log('after :', sales);

    // Set up the pie chart dimensions
    var width = 400;
    var height = 400;
    var radius = Math.min(width, height) / 2;

    // Create an SVG element within the container
    var svg = d3
        .select('#pieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Generate the pie layout
    var pie = d3.pie().value(function (d) {
        return d.value;
    });

    // Generate arc shapes based on the pie layout
    var arc = d3.arc().innerRadius(0).outerRadius(radius);

    // Create the pie chart segments
    var arcs = svg.selectAll('arc').data(pie(sales)).enter().append('g');

    // Append path elements for each segment
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return ['#FF6384', '#36A2EB', '#FFCE56'][i];
        });

    // Append text labels
    arcs.append('text')
        .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text(function (d) {
            return d.data.label + '\n' + d.data.value;
        });
}
