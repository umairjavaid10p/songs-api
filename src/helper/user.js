const getUserRank = (meditationSeconds) => {
    const minutes = meditationSeconds / 60;
    if (minutes > 10) {
        return 'Expert';
    } else if (minutes >= 5 && minutes <= 7) {
        return 'Intermediate';
    }
    return 'Basic';
};

export const calcTime = (meditationSeconds, showSeconds = false) => {

    let remainingSeconds;
    const days = Math.floor(meditationSeconds / (3600 * 24));
    remainingSeconds = meditationSeconds - (days * (3600 * 24));

    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds -= (hours * 3600);

    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds -= (minutes * 60);

    let seconds = Math.round(remainingSeconds);

    // round seconds
    seconds = Math.round(seconds * 100) / 100;

    const totalDays = days ? `${days}d ` : '';
    const totalHours = hours ? `${hours}h ` : '';
    const totalConditionalMinutes = minutes ? `${minutes}m ` : '';
    const totalMinutes = `${minutes}m`;
    const totalSeconds = `${seconds}s`;

    let time;
    if (showSeconds) {
        time = `${totalDays}${totalHours}${totalConditionalMinutes}${totalSeconds}`;
    } else {
        time = `${totalDays}${totalHours}${totalMinutes}`;
    }

    return time;
};

export const getMeditationData = (meditationSeconds) => {
    return {
        rank: getUserRank(meditationSeconds),
        meditationTime: calcTime(meditationSeconds),
    };
};
