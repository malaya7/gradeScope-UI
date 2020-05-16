import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const updateInterval = 10000;
class DynamicColumnChart extends Component {
	constructor() {
		super();
		this.state = {      
            index:0,         
        }; 
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		//var dpsColor, dpsTotal = 0, deltaY, yVal;
		var dps = this.chart.options.data[0].dataPoints;
		const data = this.props.data;
		for (let i = 0; i < data.length ; i++) {
			//deltaY = Math.round(2 + Math.random() *(-2-2));
			//yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
			//dpsColor = yVal >= 90 ? "#e40000" : yVal >= 70 ? "#ec7426" : yVal >= 50 ? "#81c2ea" : "#88df86 ";
			dps[i] = data[i];//{label: "Core "+(i+1) , y: yVal, color: dpsColor};
			//dpsTotal += yVal;
		}
		// this.chart.options.data[0].dataPoints = dps;
		//this.chart.options.title.text = "CPU Usage " + Math.round(dpsTotal / 6) + "%";
		this.chart.render();
	}
	render() {
		const options = {
			theme: "dark2",
			title: {
				text: "Grades Distribution"
			},
			subtitles: [{
				text: ""
			}],
			axisY: {
				title: "Number Of Studetns",
				suffix: "",
			maximum: this.props.data[0].length
			},
			data: [{
				type: "column",
				yValueFormatString: "#,###'%'",
				indexLabel: "{y}",
				dataPoints: this.props.data[0]
			}]
		}
		console.log(this.props)
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}/>
			{/*You can get reference to the chart instance as shown above using onRef. 
			This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DynamicColumnChart;