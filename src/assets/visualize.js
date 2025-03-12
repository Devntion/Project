let data = [];

function handleFile() {
    const fileInput = document.getElementById('csvFile');

    if (!fileInput.files.length) {
        alert("Please select a CSV file!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const text = event.target.result;
        data = d3.csvParse(text);
        populateDropdowns(data.columns);
    };

    reader.readAsText(file);
}

function populateDropdowns(columns) {
    const dropdowns = ['xColumn', 'yColumn', 'zColumn', 'colorColumn', 'groupByColumn'];

    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        dropdown.innerHTML = ''; // Clear existing options

        // ✅ Add "None" as the first option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'None';
        dropdown.appendChild(emptyOption);

        columns.forEach(col => {
            const option = document.createElement('option');
            option.value = col;
            option.textContent = col;
            dropdown.appendChild(option);
        });
    });

    // ✅ Populate aggregation type based on data type
    const aggregationDropdown = document.getElementById('aggregationType');
    aggregationDropdown.innerHTML = ''; // Clear existing options
    const defaultOptions = ['sum', 'average', 'count'];
    defaultOptions.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        aggregationDropdown.appendChild(option);
    });
}

function visualize() {
    const xColumn = document.getElementById('xColumn').value;
    const yColumn = document.getElementById('yColumn').value;
    const zColumn = document.getElementById('zColumn').value || null;
    const colorColumn = document.getElementById('colorColumn').value || null;
    const groupByColumn = document.getElementById('groupByColumn').value || null;
    const aggregationType = document.getElementById('aggregationType').value;
    const chartType = document.getElementById('chartType').value;


    if (chartType === 'parallel') {
        data = cleanDataForParallel(data);
        generateParallelCoordinates(data);
        return;
    }


    if (!xColumn || !yColumn) {
        alert("Please select at least X and Y columns.");
        return;
    }

    const isNumeric = value => /^-?\d+(\.\d+)?$/.test(value);

    const isMixedColumn = (data, column) => {
        return data.some(d => d[column] !== undefined && !isNumeric(d[column]));
    };

    const isXNumeric = !isMixedColumn(data, xColumn);
    const isYNumeric = !isMixedColumn(data, yColumn);

    console.log(`Is X Numeric: ${isXNumeric}`);
    console.log(`Is Y Numeric: ${isYNumeric}`);

    data = data.map(d => {
        const normalized = {};

        if (d[xColumn] !== undefined && d[xColumn] !== "") { // Removed "None" check
            if (isXNumeric && isNumeric(d[xColumn])) {
                normalized[xColumn] = +d[xColumn];
            } else {
                normalized[xColumn] = d[xColumn]; // Keep "None" as string
            }
        } else {
            normalized[xColumn] = null;
        }

        if (d[yColumn] !== undefined && d[yColumn] !== "") { // Removed "None" check
            if (isYNumeric && isNumeric(d[yColumn])) {
                normalized[yColumn] = +d[yColumn];
            } else {
                normalized[yColumn] = d[yColumn]; // Keep "None" as string
            }
        } else {
            normalized[yColumn] = null;
        }

        if (zColumn && d[zColumn] !== undefined && d[zColumn] !== "None" && d[zColumn] !== "") {
            if (isNumeric(d[zColumn])) {
                normalized[zColumn] = +d[zColumn];
            } else {
                normalized[zColumn] = d[zColumn];
            }
        } else if (zColumn) {
            normalized[zColumn] = null;
        }

        if (colorColumn && d[colorColumn] !== undefined && d[colorColumn] !== "None" && d[colorColumn] !== "") {
            if (isNumeric(d[colorColumn])) {
                normalized[colorColumn] = +d[colorColumn];
            } else {
                normalized[colorColumn] = d[colorColumn];
            }
        } else if (colorColumn) {
            normalized[colorColumn] = null;
        }

        return normalized;
    });


    data = data.filter(d =>
        (d[xColumn] !== null && d[xColumn] !== "None" && d[xColumn] !== "none" &&
            d[yColumn] !== null && d[yColumn] !== "None" && d[yColumn] !== "none") &&
        (!zColumn || d[zColumn] !== null) &&
        (!colorColumn || d[colorColumn] !== null)
    );

    console.log("Cleaned Data:", data);

    if (groupByColumn) {
        data = groupByAndAggregate(data, groupByColumn, yColumn, aggregationType);
    }

    console.log("Grouped Data:", data);

    if (data.length === 0) {
        alert("No valid data to visualize after cleaning.");
        return;
    }

    if (chartType === 'scatter2D') {
        generate2DScatter(data, xColumn, yColumn, colorColumn);
    } else if (chartType === 'scatter3D') {
        generate3DScatter(data, xColumn, yColumn, zColumn, colorColumn);
    } else if (chartType === 'heatmap') {
        generateHeatmap(data, xColumn, yColumn, colorColumn);
    } else if (chartType === 'parallel') {
        generateParallelCoordinates(data);
    } else if (chartType === 'bar') {
        generateBarChart(data, xColumn, yColumn);
    }
}

function groupByAndAggregate(data, groupByColumn, targetColumn, aggregationType) {
    const groupedData = Array.from(
        d3.group(data, d => d[groupByColumn]),
        ([key, values]) => {
            if (aggregationType === 'sum') {
                return {
                    [groupByColumn]: key,
                    [targetColumn]: d3.sum(values, d => d[targetColumn])
                };
            } else if (aggregationType === 'average') {
                return {
                    [groupByColumn]: key,
                    [targetColumn]: d3.mean(values, d => d[targetColumn])
                };
            } else if (aggregationType === 'count') {
                return {
                    [groupByColumn]: key,
                    [targetColumn]: values.length
                };
            }
        }
    );

    return groupedData;
}


function generate2DScatter(data, xColumn, yColumn, colorColumn) {
    Plotly.newPlot('chart', [{
        x: data.map(d => d[xColumn]),
        y: data.map(d => d[yColumn]),
        mode: 'markers',
        marker: {
            color: colorColumn ? data.map(d => d[colorColumn]) : 'steelblue',
            size: 10
        },
        type: 'scatter'
    }]);
}

function generate3DScatter(data, xColumn, yColumn, zColumn, colorColumn) {
    Plotly.newPlot('chart', [{
        x: data.map(d => d[xColumn]),
        y: data.map(d => d[yColumn]),
        z: data.map(d => d[zColumn]),
        mode: 'markers',
        marker: {
            color: colorColumn ? data.map(d => d[colorColumn]) : 'steelblue',
            size: 5
        },
        type: 'scatter3d'
    }]);
}

function generateHeatmap(data, xColumn, yColumn, colorColumn) {
    const heatmapData = data.map(d => [d[xColumn], d[yColumn], d[colorColumn]]);

    Plotly.newPlot('chart', [{
        x: data.map(d => d[xColumn]),
        y: data.map(d => d[yColumn]),
        z: data.map(d => d[colorColumn]),
        type: 'heatmap',
        colorscale: 'Viridis'
    }]);
}


function cleanDataForParallel(data) {
    return data.map(d => ({
        Organisation: d.Organisation
            ? d.Organisation.startsWith('https://') || d.Organisation.startsWith('http://')
                ? d.Organisation.split('/').pop()
                : String(d.Organisation)
            : "Unknown",
        Repository: d.Repository
            ? d.Repository.startsWith('https://') || d.Repository.startsWith('http://')
                ? d.Repository.split('/').pop()
                : String(d.Repository)
            : "Unknown",
        Package: d.Package
            ? d.Package.startsWith('https://') || d.Package.startsWith('http://')
                ? d.Package.split('/').pop()
                : String(d.Package)
            : "Unknown",
        Topic: d.Topic
            ? d.Topic.startsWith('https://') || d.Topic.startsWith('http://')
                ? d.Topic.split('/').pop()
                : String(d.Topic)
            : "Unknown",
        Language: d.Language
            ? d.Language.startsWith('https://') || d.Language.startsWith('http://')
                ? d.Language.split('/').pop()
                : String(d.Language)
            : "Unknown",
        Contributors: isNaN(+d.Contributors) ? 0 : +d.Contributors,
        Forks: isNaN(+d.Forks) ? 0 : +d.Forks,
        Stargazers: isNaN(+d.Stargazers) ? 0 : +d.Stargazers,
        OpenIssues: isNaN(+d.OpenIssues) ? 0 : +d.OpenIssues,
        ClosedIssues: isNaN(+d.ClosedIssues) ? 0 : +d.ClosedIssues
    })).filter(d =>
        d.Contributors !== null &&
        d.Forks !== null &&
        d.Stargazers !== null &&
        d.OpenIssues !== null &&
        d.ClosedIssues !== null
    );
}

function generateParallelCoordinates(data) {
    const margin = {top: 30, right: 30, bottom: 10, left: 160};
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const columnOrder = [
        'Organisation', 'Repository', 'Language', 'Topic', 'Contributors',
        'Forks', 'Stargazers', 'Package', 'OpenIssues', 'ClosedIssues',
    ];

    const categoricalColumns = ['Organisation', 'Repository', 'Package', 'Topic', 'Language'];
    const categoryMaps = {};

    categoricalColumns.forEach(col => {
        const uniqueValues = [...new Set(data.map(d => d[col]))];
        categoryMaps[col] = d3.scaleBand()
            .domain(uniqueValues)
            .range([height, 0])
            .padding(0.5);
    });

    const y = {};
    columnOrder.forEach(col => {
        if (categoricalColumns.includes(col)) {
            y[col] = categoryMaps[col];
        } else {
            y[col] = d3.scaleLinear()
                .domain(d3.extent(data, d => +d[col]))
                .nice() // Ensures symmetrical rounding at both ends
                .range([height, 0]);
        }
    });


    const x = d3.scalePoint()
        .domain(columnOrder)
        .range([0, width]);

    const path = d => d3.line()(columnOrder.map(col => [
        x(col),
        categoricalColumns.includes(col)
            ? y[col](d[col]) // Center for categorical data
            : y[col](d[col]) // Center for continuous data (like Forks)
    ]));

    svg.selectAll("path")
        .data(data)
        .join("path")
        .attr("d", path)
        .attr("stroke", "#d3d3d3")  // Light color by default
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .on("mouseover", function () {
            d3.select(this)
                .raise()
                .transition()
                .duration(200)
                .attr("stroke", "#000")  // Dark color on hover
                .attr("stroke-width", 3)
                .style("cursor", "pointer"); // Change cursor to pointer
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("stroke", "#d3d3d3")  // Return to light color
                .attr("stroke-width", 1.5)
                .style("cursor", "default"); // Change cursor back to default
        })
        .on("click", (event, d) => {
            alert(`Selected values:\n${columnOrder.map(col => `${col}: ${d[col]}`).join('\n')}`);
        });


    svg.selectAll(".axis")
        .data(columnOrder)
        .enter()
        .append("g")
        .attr("class", "axis")
        .attr("transform", d => `translate(${x(d)},0)`)
        .each(function (d) {
            d3.select(this).call(d3.axisLeft(y[d]));
        })
        .append("text")
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text(d => d)
        .style("fill", "black");

    svg.selectAll("path")
        .on("click", (event, d) => {
            alert(`Selected values:\n${columnOrder.map(col => `${col}: ${d[col]}`).join('\n')}`);
        });
}


// function generateParallelCoordinates(data) {
//     // Define your desired column order
//     const columnOrder = [
//         'Organisation',
//         'Repository',
//         'Language',
//         'Topic',
//         'Contributors',
//         'Forks',
//         'Stargazers',
//         'OpenIssues',
//         'Repository',
//         'ClosedIssues',
//         'Package'
//     ];
//
//     // Convert categorical dimensions to numerical indices
//     const categoricalColumns = ['Organisation', 'Repository', 'Package', 'Topic', 'Language'];
//     const categoryMaps = {};
//
//     // Create numerical mappings for categorical columns
//     categoricalColumns.forEach(col => {
//         const uniqueValues = [...new Set(data.map(d => d[col]))];
//         categoryMaps[col] = {
//             mapping: new Map(uniqueValues.map((val, idx) => [val, idx])),
//             tickvals: uniqueValues.map((val, idx) => idx),
//             ticktext: uniqueValues
//         };
//     });
//
//     // Create dimensions array in specified order
//     const dimensions = columnOrder.map(col => {
//         if (categoricalColumns.includes(col)) {
//             return {
//                 label: col,
//                 values: data.map(d => categoryMaps[col].mapping.get(d[col])),
//                 tickvals: categoryMaps[col].tickvals,
//                 ticktext: categoryMaps[col].ticktext,
//                 tickfont: {size: 10}
//             };
//         } else {
//             const values = data.map(d => d[col]);
//             // Safe calculation of min/max using reduce
//             const min = values.reduce((a, b) => Math.min(a, b), Infinity);
//             const max = values.reduce((a, b) => Math.max(a, b), -Infinity);
//
//             return {
//                 label: col,
//                 values: values,
//                 tickformat: ',d',
//                 range: [min, max]
//             };
//         }
//     });
//
//
//
//     const validColors = data.map(d => d.Stargazers).filter(v => !isNaN(v));
//
//     if (validColors.length === 0) {
//         console.error("No valid color values for parallel coordinates plot.");
//         return;
//     }
//
//     // Create the plot with interactive features
//     const plot = Plotly.newPlot('chart', [{
//         type: 'parcoords',
//         dimensions: dimensions,
//         line: {
//             color: validColors,
//             colorscale: 'Viridis',
//             showscale: true,
//             cmin: Math.min(...validColors),
//             cmax: Math.max(...validColors)
//         },
//         brushmode: 'closest',
//         hoverinfo: 'all',
//         hoveron: 'dimensions'
//     }], {
//         margin: {l: 60, r: 30, t: 30, b: 60},
//         dragmode: 'select',
//         selectdirection: 'any'
//     });
//
//     // Add click interaction
//     document.getElementById('chart').on('plotly_click', function (data) {
//         const points = data.points[0];
//         alert(`Selected values:\n${
//             columnOrder.map((col, i) =>
//                 `${col}: ${points.dimensions[i].value}`
//             ).join('\n')
//         }`);
//     });
// }


function generateBarChart(data, xColumn, yColumn) {
    // Clear previous chart
    d3.select("#chart").selectAll("*").remove();

    const width = 800;
    const height = 500;
    const margin = {top: 30, right: 30, bottom: 50, left: 250}; // Increased left margin for better alignment

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Detect data types
    const isXNumeric = data.every(d => typeof d[xColumn] === 'number');
    const isYNumeric = data.every(d => typeof d[yColumn] === 'number');

    // Determine orientation
    const verticalBars = !isXNumeric && isYNumeric;
    const horizontalBars = isXNumeric && !isYNumeric;

    if (!verticalBars && !horizontalBars) {
        alert("Bar chart requires one categorical and one numeric axis.");
        return;
    }

    // Sort data by numeric column (descending)
    data.sort((a, b) => verticalBars
        ? b[yColumn] - a[yColumn]
        : b[xColumn] - a[xColumn]
    );

    // Create color scale (different color for each bar)
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(data.map(d => d[xColumn]));

    // Create scales
    let xScale, yScale;

    if (verticalBars) {
        xScale = d3.scaleBand()
            .domain(data.map(d => d[xColumn]))
            .range([margin.left, width - margin.right])
            .paddingInner(0.5) // Add padding between bars
            .paddingOuter(0.4); // Add padding at edges

        yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[yColumn])])
            .nice()
            .range([height - margin.bottom, margin.top]);
    } else {
        xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[xColumn])])
            .nice()
            .range([margin.left, width - margin.right]);

        yScale = d3.scaleBand()
            .domain(data.map(d => d[yColumn]))
            .range([margin.top, height - margin.bottom])
            .paddingInner(0.5)
            .paddingOuter(0.4);
    }

    // Draw Bars
    const bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", d => colorScale(d[xColumn]))
        .attr("x", d => verticalBars ? xScale(d[xColumn]) : margin.left)
        .attr("y", d => verticalBars ? yScale(d[yColumn]) : yScale(d[yColumn]))
        .attr("width", d => verticalBars ? xScale.bandwidth() : xScale(d[xColumn]) - margin.left)
        .attr("height", d => verticalBars ? height - margin.bottom - yScale(d[yColumn]) : yScale.bandwidth())
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "orange");
            tooltip.style("visibility", "visible")
                .html(`${xColumn}: ${d[xColumn]}<br>${yColumn}: ${d[yColumn]}`)
                .style("top", `${event.pageY - 20}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function (event, d) {
            d3.select(this).attr("fill", colorScale(d[xColumn]));
            tooltip.style("visibility", "hidden");
        });

    // Draw Axes
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(verticalBars
            ? d3.axisBottom(xScale)
            : d3.axisBottom(xScale).ticks(5, "~s")
        )
        .selectAll("text")
        .style("text-anchor", verticalBars ? "end" : "middle")
        .style("font-size", "12px")
        .attr("transform", verticalBars ? "rotate(-15)" : null);

    // ✅ Improved Dynamic Wrapping for Y-Axis Labels
    const yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .style("font-size", "12px");

    yAxis.selectAll("text").each(function (d) {
        const text = d3.select(this);
        const labelWidth = margin.left - 20;
        const words = d.split(/\s+/);
        text.text(null);

        let line = [];
        let yPos = 0;
        for (let i = 0; i < words.length; i++) {
            line.push(words[i]);
            text.text(line.join(" "));
            if (text.node().getComputedTextLength() > labelWidth) {
                line.pop();
                text.text(line.join(" "));
                text.append("tspan")
                    .attr("x", -10)
                    .attr("dy", ++yPos * 1.2 + "em")
                    .text(words[i]);
                line = [words[i]];
            }
        }
    });


    svg.selectAll(".bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => verticalBars ? xScale(d[xColumn]) + xScale.bandwidth() / 2 : xScale(d[xColumn]) + 5)
        .attr("y", d => verticalBars ? yScale(d[yColumn]) - 5 : yScale(d[yColumn]) + yScale.bandwidth() / 2)
        .attr("text-anchor", verticalBars ? "middle" : "start")
        .attr("alignment-baseline", "middle")
        .style("font-size", "12px")
        .style("fill", "#ff0000")
        .text(d => d[xColumn]);


    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("padding", "5px")
        .style("border", "1px solid #ddd")
        .style("visibility", "hidden");


    // Attach data ID for visibility toggle
    bars.attr("data-id", d => d[xColumn]);
}


function exportSVG() {
    const svgElement = d3.select("#chart svg").node();
    if (!svgElement) {
        alert("No chart available to export!");
        return;
    }

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgElement);
    const blob = new Blob([svgStr], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function exportPDF() {
    const svgElement = d3.select("#chart svg").node();

    if (!svgElement) {
        alert("No chart available to export!");
        return;
    }

    try {
        const {jsPDF} = window.jspdf;
        const pdf = new jsPDF('landscape');

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgElement);

        // Create a high-resolution canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Increase resolution (4x for better quality)
        const scaleFactor = 4;
        const width = svgElement.clientWidth * scaleFactor;
        const height = svgElement.clientHeight * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        // Load SVG into an Image object
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));

        img.onload = () => {
            // Draw the SVG at higher resolution
            ctx.drawImage(img, 0, 0, width, height);

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (height * imgWidth) / width;

            // Add the upscaled SVG to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            pdf.save('chart.pdf');
        };

        img.onerror = (error) => {
            console.error("Error loading SVG for PDF export:", error);
            alert("Failed to export PDF.");
        };
    } catch (error) {
        console.error("Error exporting PDF:", error);
        alert("Failed to export PDF.");
    }
}


// Attach event listener to the export button
document.getElementById("exportBtn").addEventListener("click", exportSVG);
document.getElementById('exportPDFBtn').addEventListener('click', exportPDF);



