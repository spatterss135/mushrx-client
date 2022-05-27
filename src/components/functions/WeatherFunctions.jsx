export function createKeys(weatherStats, data) {
  for (let year in data) {
    weatherStats[year] = {};
  }
  weatherStats["historical"] = {};
}

export function getRainfall(weatherStats, data) {
  for (const year in data) {
    let totalRainInches = 0;
    data[year].days.forEach((day) => (totalRainInches += day.precip));
    weatherStats[year].totalRainInches = totalRainInches;
  }
}

export function getAverageTemp(weatherStats, data) {
  for (const year in data) {
    let totalTemp = 0;
    data[year].days.forEach((day) => (totalTemp += day.temp));
    weatherStats[year].averageTemp = Number(
      (totalTemp / data[year].days.length).toPrecision(3)
    );
  }
}

export function getAverageHumidity(weatherStats, data) {
  for (const year in data) {
    let totalHumidity = 0;
    data[year].days.forEach((day) => (totalHumidity += day.humidity));
    weatherStats[year].averageHumidity = Number(
      (totalHumidity / data[year].days.length).toPrecision(3)
    );
  }
}

export function getHistoricalAverages(weatherStats) {
  let currentYear = new Date().getFullYear();
  let historicRainfall = 0;
  let historicTemp = 0;
  let historicHumidity = 0;
  let i = 0;
  for (let year in weatherStats) {
    if (year !== currentYear && year !== "historical") {
      i++;
      historicRainfall += weatherStats[year].totalRainInches;
      historicTemp += weatherStats[year].averageTemp;
      historicHumidity += weatherStats[year].averageHumidity;
    }
  }
  weatherStats["historical"].totalRainInches = historicRainfall / i;
  weatherStats["historical"].averageTemp = historicTemp / i;
  weatherStats["historical"].averageHumidity = Number(
    (historicHumidity / i).toPrecision(3)
  );
}
