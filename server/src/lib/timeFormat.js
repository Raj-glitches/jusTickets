

const timeFormat = (min) =>{
    const hours = Math.floor(min / 60)
    const minRemainder = min % 60
    return `${hours}h ${minRemainder}m`
}

export default timeFormat;