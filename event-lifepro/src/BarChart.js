import React, {useEffect} from 'react';
import Chart from "chart.js";

const LineChart = ( {labels, label, data} ) => {
    const chartRef = React.createRef();
    useEffect(() => {
        console.log(labels);
        console.log(data);
        const myChartRef = chartRef.current.getContext("2d");  
        new Chart(myChartRef, {
            type: "bar",
            data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                }
            ]},
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5
                        }
                    }]
                }
            }
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