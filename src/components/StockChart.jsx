import React from 'react'
import { Line } from 'react-chartjs-2';
// need this code below to import all of the chartjs funcionality and to view charts on web app
import { Chart } from 'chart.js/auto';

export default function StockChart(props) {

  return (
    <>
        {/* need to import Chart from 'chart.js/auto' as above to be able to view charts... */}
        {/* new chart */}
        <div className='row justify-content-center mb-4 '>
            <Line
                data={{
                    // change labels to dates of included timestamps >> stockHistory.t
                    // LABELS FOR FINNHUB
                    // labels: props.stockHistory.t ? props.stockDates(props.stockHistory.t) : null,
                    labels: Object.keys(props.stockHistoryAV) ? Object.keys(props.stockHistoryAV) : null,
                    datasets: [
                        {
                            // need to create a new array w timestamps mapped to dd/mm/yyyy
                            label: props.ticker, // MAYBE THIS WONT WORK SINCE TICKER IS 2 LEVELS UP...
                            // data: stockHistory.c,
                            data: Object.values(props.stockHistoryAV),
                            backgroundColor: props.quote.dp >= 0 ? 'green' : 'red',
                            borderColor: props.quote.dp >= 0 ? 'green' : 'red',
                        }
                    ]
                }}
                // height={200}
                // width={300}
                options={{
                    // display option within scales removes x axis labels...
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            }
                        }
                    },
                    // maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem) {
                                    return tooltipItem.yLabel;
                            }
                        }
                    }
                }}
            />
        </div>
    </>
  )
}
