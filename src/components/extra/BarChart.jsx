import React from "react";
import { Line } from 'react-chartjs-2';
// need this code below to import all of the chartjs funcionality and to view charts on web app
import Chart from 'chart.js/auto';

export default function BarChart() {
  return (
    // need to import Chart from 'chart.js/auto' as above to be able to view charts...
    <div>
        <Line 
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '30-day',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'black',
                        borderColor: 'black',
                    }
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: true,
            }}
        />
    </div>
  )
}