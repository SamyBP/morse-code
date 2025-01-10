const barColors = ["#04AA6D", "#ED4337"];

async function fetchMostWrongGuessedWords() {
  try {
    const response = await fetch('/api/guess?limit=3');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error fetching most wrong guessed words:', error);
    return [];
  }
}

async function fetchGuessCounts() {
  try {
    const response = await fetch('/api/guess/counts');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error fetching guess counts:', error);
    return { correct: 0, wrong: 0 };
  }
}

async function fetchGuessAccuracyOverTime() {
    try {
        const response = await fetch('/api/guess/accuracy');
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

async function fetchMostMissedLetters() {
    try {
        const response = await fetch('/api/guess/letters');
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

async function initializeCharts() {
  const mostWrongGuessedWords = await fetchMostWrongGuessedWords();
  const guessCounts = await fetchGuessCounts();
  const guessAccuracyOverTime = await fetchGuessAccuracyOverTime();
  const mostMissedLetters = await fetchMostMissedLetters();

  new Chart("myBarChart", {
    type: "bar",
    data: {
      labels: mostWrongGuessedWords.map(word => word.value),
      datasets: [{
        backgroundColor: "#04AA6D",
        data: mostWrongGuessedWords.map(word => word.count)
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Most wrong guessed words"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 5
          }
        }]
      }
    }
  });

  new Chart("myPieChart", {
    type: "pie",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [{
        backgroundColor: barColors,
        data: [guessCounts.correct, guessCounts.wrong]
      }]
    },
    options: {
      title: {
        display: true,
        text: "Correct vs Wrong guesses"
      }
    }
  });

  new Chart("myLineChart", {
    type: "line",
    data: {
      labels: guessAccuracyOverTime.map(dataPoint => dataPoint.date.slice(0, 10)),
      datasets: [{
        label: "Accuracy",
        data: guessAccuracyOverTime.map(dataPoint => dataPoint.accuracy),
        backgroundColor:"#04AA6D",
        borderColor: "rgba(0,0,255,0.1)",
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: "Journey"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 120,
            stepSize: 20
          }
        }]
      }
    }
  });

  new Chart("letterMisses", {
    type: "bar",
    data: {
      labels: mostMissedLetters.map(data => data.letter),
      datasets: [{
        backgroundColor: "#04AA6D",
        data: mostMissedLetters.map(data => data.count)
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Most missed letters"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 5
          }
        }]
      }
    }
  });
}

initializeCharts();