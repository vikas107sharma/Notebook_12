import dayjs from 'dayjs'

export const getDate = () => {

    let date = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
     return date = dayjs(date).format("MMM DD, YYYY")
}

