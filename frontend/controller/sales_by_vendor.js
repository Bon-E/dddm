$(document).ready(() => {
    initPage().then(() => {
        routePages();
        loadChart();
    });
});

async function loadChart() {
    var sales = await $.get('/get_sales_by_vendor');

    sales = sales.map((sale) => {
        return {
            label: sale.name,
            value: sale.count
        };
    });

    var width = 600;
    var height = 600;
    var radius = Math.min(width, height) / 2;

    var svg = d3
        .select('#pieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var pie = d3.pie().value(function (d) {
        return d.value;
    });

    var arc = d3.arc().innerRadius(0).outerRadius(radius);

    var arcs = svg.selectAll('arc').data(pie(sales)).enter().append('g');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return getRandomColor();
        });

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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
