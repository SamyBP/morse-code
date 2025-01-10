const barColors = ["#04AA6D", "#ED4337"];

async function fetchGuessStatistics() {
    try {
        const response = await fetch('/api/guess/statistics');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error('Error fetching guess statistics:', error);
        return {};
    }
}


async function fetchGuessJourney() {
    try {
        const response = await fetch('/api/guess/journey');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error('Error fetching guess accuracy over time:', error);
        return [];
    }
}

function createChart(chartId, type, labels, data, backgroundColor, options) {
    const fill = type === "line" ? false : true;
    return new Chart(chartId, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                fill: fill
            }]
        },
        options: options
    });
}

async function initializeCharts() {
    const statistics = await fetchGuessStatistics();
    const guessAccuracyOverTime = await fetchGuessJourney();

    const mostWrongGuessedWords = statistics.mostWrongGuessedWords;
    const guessCounts = statistics.guessCounts;
    const mostMissedLetters = statistics.mostMissedLetters;

    createChart("mostWrongGuessedWords", "bar", 
        mostWrongGuessedWords.map(word => word.value), 
        mostWrongGuessedWords.map(word => word.count), 
        "#04AA6D", {
            legend: { display: false },
            title: { display: true, text: "Most wrong guessed words" },
            scales: { 
                yAxes: [{ ticks: { beginAtZero: true, max: 5 } }] 
            }
        });

    createChart("guessStatusRatio", "pie", 
        ["Correct", "Wrong"], 
        [guessCounts.correct, guessCounts.wrong], 
        barColors, {
            title: { display: true, text: "Correct vs Wrong guesses" }
        });

    createChart("accuracyJourney", "line", 
        guessAccuracyOverTime.map(dataPoint => dataPoint.date.slice(0, 10)),
        guessAccuracyOverTime.map(dataPoint => dataPoint.accuracy), 
        "#04AA6D", {
            legend: { display: false },
            title: { display: true, text: "Journey" },
            scales: { 
                yAxes: [{ ticks: { beginAtZero: true, max: 120, stepSize: 20 } }] 
            }
        });

    createChart("mostMissedLetters", "bar", 
        mostMissedLetters.map(data => data.letter), 
        mostMissedLetters.map(data => data.count), 
        "#04AA6D", {
            legend: { display: false },
            title: { display: true, text: "Most missed letters" },
            scales: { 
                yAxes: [{ ticks: { beginAtZero: true, max: 5 } }] 
            }
        });
}

initializeCharts();