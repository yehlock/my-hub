setInterval(Time, 1);

function Time() {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();
    $("h1").text(`${hour}:${minute}:${second}`)
}