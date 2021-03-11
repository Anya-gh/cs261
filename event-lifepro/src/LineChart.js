import React, {useEffect} from 'react';
import Chart from "chart.js";

const LineChart = ( {labels, label, data, options} ) => {
    const chartRef = React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");  
        new Chart(myChartRef, {
            type: "line",
            data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                }
            ]},
            options: options
        });
    }, [labels, data])

    return (
        <div>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
    
}

export default LineChart;