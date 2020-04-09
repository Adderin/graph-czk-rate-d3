import React from "react";
import * as d3 from "d3";

let width = 900;
let height = 500;
let margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
 
  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft();
  static getDerivedStateFromProps(nextProps) {

   const { data } = nextProps;
   if (!data) return {};        // checking if data coming through state

   data.sort((a, b) => new Date(a.date) - new Date(b.date));    //sorting dates

    const xExtent = d3
        .extent(data, d => d.date);

    const yExtent = d3
        .extent(data, d => d.rate);

    const xScale = d3
        .scaleTime()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);

    const yScale = d3
        .scaleLinear()
        .domain(yExtent)
        .range([height - margin.bottom, margin.top]);

    const line = d3
        .line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.rate))
        .curve(d3.curveCatmullRom);

    const minY = d3
        .min(data, d => d.rate);

    const area = d3
        .area()
        .x(d => xScale(d.date))
        .y0(d => yScale(minY))
        .y1(d => yScale(d.rate));

  return { xScale, yScale, data, line, area };
 }

  componentDidUpdate() {
        this.xAxis.scale(this.state.xScale);

        d3
        .select(this.refs.xAxis)
        .call(this.xAxis);

        this.yAxis.scale(this.state.yScale);

        d3
        .select(this.refs.yAxis)
        .call(this.yAxis);
  }

  render() {
  const styles = {
    container: {
      display: "grid",
      justifyItems: "center",
      gridGap: "20px"
    }
  };
  const { data, line, area } = this.state;

  return (
    <div style={styles.container}>
      <svg width={width} height={height}>
        <path
          id = {"line"}
          d = {line(data)}
          stroke = "#006666"
          fill = "#bedbed"
          fillOpacity = "0.3"        
        />
        <path
          id = {"area"}
          d = {area(data)}
          fill = "#008080"
          style = {{ opacity: 0.5 }}
        />
        
        <text
          transform={`translate(${width / 1.8 - margin.left}, ${height -50})`}
        >
        Timeline from Fall 2019 to Spring 2020
        </text>
        <text
         transform={`translate(0, ${height / 2.1})`}
        >
        CZK Rate
        </text>
        <g
          ref="xAxis"
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
      </svg>
    </div>
   );
  }
}

export default Graph;