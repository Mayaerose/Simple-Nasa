//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
// https://science.nasa.gov/wp-json/wp/v2/apod-basic/140918
// (NASA's older api.nasa.gov/planetary/apod address now sends back the NASA logo for every date,
//  so this uses the science.nasa.gov address from the line above. It needs no API key.
//  The end of the address is the date as YYMMDD, so 2014-09-18 becomes 140918.)


document.querySelector("button").addEventListener('click', pressButton)

function pressButton() {

        const dateNasa = document.querySelector("input").value

        // no date picked yet
        if (dateNasa === "") {
            document.querySelector('h2').innerText = "Please pick a date first"
            return
        }

        // "2014-09-18" -> "140918"
        const dateId = dateNasa.slice(2, 4) + dateNasa.slice(5, 7) + dateNasa.slice(8, 10)
        let nasaUrl = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${dateId}`

        fetch(nasaUrl).then (res => {

        // NASA answers with an error for dates it doesn't have (like the future)
        if (!res.ok) {
            throw new Error("no picture for that date")
        }
        return res.json()
    }).then(data => {
        // console.log(data)
        document.querySelector('h3').innerHTML = data.explanation

        const img = document.querySelector('img')
        const iframe = document.querySelector('iframe')

        // for a picture, hdurl is the image. For a video, hdurl is a preview picture
        // and the video itself lives on NASA's page, so we add a link to it
        img.src = data.hdurl
        img.alt = data.alt || data.title
        img.hidden = false
        iframe.src = ''
        iframe.hidden = true

        if (data.media_type === 'video') {
            document.querySelector('h3').innerHTML =
                `<p><a href="${data.permalink}" target="_blank" rel="noopener noreferrer">This day's picture is a video. Watch it on NASA's site.</a></p>` + data.explanation
        }


        document.querySelector('h2').innerText = data.title

    }
        )

    .catch(err => {
        console.log(`error & ${err}`)
        document.querySelector('h2').innerText = "No picture found for that date"
        document.querySelector('h3').innerText = "Pick a date from June 16, 1995 up to today."
        document.querySelector('img').hidden = true
    })
}
