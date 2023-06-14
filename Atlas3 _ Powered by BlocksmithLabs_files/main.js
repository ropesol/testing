const { moment } = window

const TimeSet = () => {

    const time = localStorage.getItem("timerDate")

    if(time) {
        return JSON.parse(time)
    }

    const date = new Date();
    const currDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(),
    date.getUTCMinutes(), date.getUTCSeconds()) + (1000 * 60 * 27)

    const dateEnd = new Date(currDate)

    const d = {
        year: Number(dateEnd.getFullYear()),
        month:  Number(dateEnd.getMonth()),
        day: Number(dateEnd.getDate()),
        hours: Number(dateEnd.getHours()),
        minutes: Number(dateEnd.getMinutes()),
    }

    localStorage.setItem("timerDate", JSON.stringify(d))
    return d
}

const dateparams = TimeSet()


const stringFormat = (num) => {
    const text = String(num).length
  
    return text === 1 ? "0" + num : num 
}

const timerHtml = document.getElementById("timer")
const close = setInterval(() => {
    const date = new Date();

    const dateUtcEnd = Date.UTC(dateparams.year, dateparams.month, dateparams.day, dateparams.hours, dateparams.minutes)

    const currDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    date.getUTCDate(), date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds())

    const timer = dateUtcEnd - currDate


    const duration = moment.duration(timer, 'milliseconds');
    const time = `${stringFormat(duration.minutes())}m ${stringFormat(duration.seconds())}s`
    
    timerHtml.innerHTML = time

    if(timer <= 0) {

        TimerSuccsess()
        clearInterval(close)
    }
}, 1000);


const TimerSuccsess = () => {
    timerHtml.innerHTML = ""
    console.log("ok")
}