import React from 'react';
import Chart from 'react-apexcharts';
import '../../assets/styles/charts.css';

const Column = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        title: {
            text: 'Sales and Expenses',
            align: 'left',
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar'],
        },
        yaxis: [
            {
                title: {
                    text: 'Sales (USD)',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Expenses (USD)',
                },
            },
        ],
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val + " thousands";
                },
            },
        },
    };

    const series = [
        {
            name: 'Sales',
            data: [1, 2, 2],
        },
        {
            name: 'Expenses',
            data: [1, 3, 5],
        },
    ];

    return (
        <div className='chart-container'>
            <Chart options={options}
                series={series}
                height={300}
            />
        </div>
    );
};

export default Column;
