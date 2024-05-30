import React from 'react';
import Chart from 'react-apexcharts';
import '../../assets/styles/charts.css'

const Line = () => {
    const [chartData, setChartData] = React.useState({
        options: {
            chart: {
                id: 'basic-line',
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
        },
        series: [{
            name: 'Series 1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 90, 60],
        }],
    });

    return (
        <div className='chart-container'>
            <Chart options={chartData.options}
                series={chartData.series} type="line"
                height={300}
            />
        </div>
    );
}

export default Line;
