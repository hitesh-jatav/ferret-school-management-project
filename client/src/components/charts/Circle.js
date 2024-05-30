import React from 'react';
import Chart from 'react-apexcharts';
import '../../assets/styles/charts.css'

const Circle = () => {
    const [chartData, setChartData] = React.useState({
        series: [67, 84],
        options: {
            chart: {
                height: 300,
                type: "radialBar",
            },
        },
    });

    return (
        <div className='chart-container'>
            <Chart
                options={chartData.options}
                series={chartData.series}
                height={300}
                type="radialBar" />
        </div>
    );
}

export default Circle;
