function exponentialSmoothing(data, alpha) {
    const smoothedData = [data[0]];
    for (let i = 1; i < data.length; i++) {
        const previousSmoothed = smoothedData[i - 1];
        const currentData = data[i];
        const smoothedValue = alpha * currentData + (1 - alpha) * previousSmoothed;
        smoothedData.push(smoothedValue);
    }
    return smoothedData;
}

const glucoseLevels = [3, 3.6, 4, 4.4, 3.5, 4];
const alpha = 0.5;

const smoothedGlucoseLevels = exponentialSmoothing(glucoseLevels, alpha);
console.log(smoothedGlucoseLevels);