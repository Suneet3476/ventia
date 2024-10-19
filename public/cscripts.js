const ctx = document.getElementById('mentalHealthChart').getContext('2d');
const mentalHealthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
        datasets: [{
            label: 'Percentage of People Suffering from Depression',
            data: [5, 10, 15, 20, 25, 30, 35],
            borderColor: '#8c4fff',
            backgroundColor: 'rgba(140, 79, 255, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#8c4fff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#333'
                }
            },
            y: {
                ticks: {
                    color: '#333',
                    beginAtZero: true
                }
            }
        }
    }
});
