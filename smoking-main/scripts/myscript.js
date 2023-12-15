// add your JavaScript/D3 to this file

  const w = 400;
  const h = 300;
  const margin = {top: 20, right: 30, bottom: 30, left: 30 };
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const svg = d3.select("div#plot")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "lightblue");

  const data = [18.1, 17.8, 16.8, 15.1, 15.5, 14.0, 13.7];

  const xScale = d3.scaleBand()
      .domain(d3.range([data.length]))
      .range([0,innerWidth]);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight, 0])

  const xAxis = d3.axisBottom()
      .scale(xScale);

  const yAxis = d3.axisLeft()
      .scale(yScale);

  const bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(data);

  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d))
      .attr("fill", "steelblue");

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);

// General Update Pattern

  function update(data) {

    xScale.domain(d3.range(data.length));

    yScale.domain([0, d3.max(data)]);

    const bars = svg.select("#plot")
        .selectAll("rect")
        .data(data);

    bars.enter().append("rect")
      .merge(bars)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d))
      .attr("fill", "steelblue");

    bars.exit().remove();

    svg.select(".xAxis")
        .call(xAxis);

    svg.select(".yAxis")
        .call(yAxis);

  }


    function add() {
      var left = Math.floor(Math.random()*data.length);
      var right = left + Math.floor(Math.random()*(data.length-left));
      var newvalue = data[data.length-1] + (data[right] - data[left]);
      data.push(newvalue);
      update(data);
    }

    function remove() {
      data.pop();
      update(data);
      };

