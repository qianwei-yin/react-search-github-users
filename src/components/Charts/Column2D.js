// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const Column2Di = ({ data }) => {
	// STEP 3 - Creating the JSON object to store the chart configurations
	const chartConfigs = {
		type: "column2d", // The chart type
		width: "100%", // Width of the chart
		height: "400", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: "Most Popular Repo",
				subCaption: "Stars Per Repo",
				decimals: 0,
				// doughnutRadius: "45%",
				showPercentValues: false,
				theme: "candy",
				xAxisName: "Repository Name",
				yAxisName: "Stars",
			},
			// Chart Data
			data,
		},
	};

	return <ReactFC {...chartConfigs} />;
};

export default Column2Di;
