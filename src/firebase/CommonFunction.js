const getTimeOn = (timestamp) => {
    return ((new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60)).toFixed(2);
}

const formatDateToString = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export { getTimeOn, formatDateToString };