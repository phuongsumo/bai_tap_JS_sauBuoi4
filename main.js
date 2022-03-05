const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Bai 1:
function quest1() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    var pause = true;

    $("#quest1 .btn_left").onclick = () => {
        pause = !pause;
        if (pause) {
            $("#quest1 .btn_left").innerText = "Continue"
            $("#quest1 .btn_left").style.backgroundColor = "#0073ff"
        } else {
            $("#quest1 .btn_left").innerText = "Pause"
            $("#quest1 .btn_left").style.backgroundColor = "#00f300"
        }
    };

    $("#quest1 .btn_right").onclick = () => {
        pause = true;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        $("#quest1 .btn_left").innerText = "Start";
        $("#quest1 .btn_left").style.backgroundColor = "#00f300";
        $('#quest1 .hours').innerText = hours < 10 ? `0${hours}` : hours;
        $('#quest1 .minutes').innerText = minutes < 10 ? `0${minutes}` : minutes
        $('#quest1 .seconds').innerText = seconds < 10 ? `0${seconds}` : seconds
        $('#quest1 .millisecond').innerText = milliseconds < 10 ? `0${milliseconds}` : milliseconds
    }
    const times = setInterval(() => {
        if (!pause) {
            if (milliseconds > 100) {
                milliseconds = 0;
                seconds++;
                if (seconds > 59) {
                    seconds = 0;
                    minutes++;
                    if (minutes > 59) {
                        minutes = 0;
                        hours++;
                        if (hours > 59) {
                            hours = 0;
                        }
                        $('#quest1 .hours').innerText = hours < 10 ? `0${hours}` : hours;
                    }
                    $('#quest1 .minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
                }
                $('#quest1 .seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
            }
            $('#quest1 .millisecond').innerText = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
            milliseconds++;
        }
    }, 10);
};

quest1();

// Bai 2:
function quest2() {
    const numbers = $$(".btn_number");
    const clearBtn = $(".btn_clear");
    const setBtn = $(".btn_set");
    const backBtn = $(".btn_back");

    let pause = true;
    let milliseconds = 0;
    let arr = [];
    let arrNew = [];

    const setNumbers = (arr) => {
        $('#quest2 .seconds .last').innerText = arr[0] || 0;
        $('#quest2 .seconds .first').innerText = arr[1] || 0;
        $('#quest2 .minutes .last').innerText = arr[2] || 0;
        $('#quest2 .minutes .first').innerText = arr[3] || 0;
        $('#quest2 .hours .last').innerText = arr[4] || 0;
        $('#quest2 .hours .first').innerText = arr[5] || 0;
    };

    clearBtn.onclick = () => {
        arr = [];
        setNumbers(arr);
    };

    setBtn.onclick = () => {
        if (arr.length > 0) {
            arr[1] = arr[1] || 0;
            arr[2] = arr[2] || 0;
            arr[3] = arr[3] || 0;
            arr[4] = arr[4] || 0;
            arr[5] = arr[5] || 0;

            // Chục giây
            if (arr[1] >= 6) {
                if (arr[2] < 9) {
                    arr[2] += 1;
                } else {
                    arr[2] = 0
                    arr[3] += 1;
                }
                arr[1] -= 6
            }

            // Phút
            if (arr[2] > 9) {
                if (arr[3] < 9) {
                    arr[3] += 1;
                } else {
                    arr[4] += 1;
                }
                arr[2] -= 9
            }

            // Chục phút
            if (arr[3] >= 6) {
                if (arr[4] < 9) {
                    arr[4] += 1;
                } else {
                    arr[4] = 0;
                    arr[5] += 1;
                }
                arr[3] -= 6
            }
            setNumbers(arr);
            clearBtn.style.display = 'none';
            setBtn.style.display = 'none';
            numbers.forEach((number) => {
                number.style.display = 'none';
            });

            $("#quest2 .btn_left").style.display = 'inline-block';
            $("#quest2 .btn_right").style.display = 'inline-block';
            $("#quest2 .btn_back").style.display = 'inline-block';
            arrNew = [...arr];
        }
    };


    const interval = setInterval(() => {
        if (!pause) {
            if (arrNew[0] > 0 || arrNew[1] > 0 || arrNew[2] > 0 || arrNew[3] > 0 || arrNew[4] > 0 || arrNew[5] > 0 || milliseconds > 0) {
                if (milliseconds < 0) {
                    milliseconds = 99;
                    arrNew[0]--;
                    if (arrNew[0] < 0) {
                        arrNew[0] = 9;
                        arrNew[1]--;
                        if (arrNew[1] < 0) {
                            arrNew[1] = 5;
                            arrNew[2]--;
                            if (arrNew[2] < 0) {
                                arrNew[2] = 9;
                                arrNew[3]--;
                                if (arrNew[3] < 0) {
                                    arrNew[3] = 5;
                                    arrNew[4]--;
                                    if (arrNew[4] < 0) {
                                        arrNew[4] = 9;
                                        arrNew[5]--;
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                $("#quest2 .btn_left").style.display = "none";
                pause = true;
            }
            setNumbers(arrNew)
            $('#quest2 .millisecond').innerText = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
            milliseconds--;
        }
    }, 10);

    $("#quest2 .btn_left").onclick = () => {
        pause = !pause;
        if (pause) {
            $("#quest2 .btn_left").innerText = "Continue"
            $("#quest2 .btn_left").style.backgroundColor = "#0073ff"
        } else {
            $("#quest2 .btn_left").innerText = "Pause"
            $("#quest2 .btn_left").style.backgroundColor = "#00f300"
        }
    };

    $("#quest2 .btn_right").onclick = () => {
        pause = true;
        milliseconds = 0;
        $("#quest2 .btn_left").style.display = "inline-block";
        $("#quest2 .btn_left").style.backgroundColor = "#00f300";
        $("#quest2 .btn_left").innerText = "Start";
        $("#quest2 .millisecond").innerText = `0${milliseconds}`;
        arrNew = [...arr];
        setNumbers(arr);
    };

    backBtn.onclick = () => {
        pause = true;
        arr = [];
        milliseconds = 0;
        setNumbers(arr);
        clearBtn.style.display = 'inline-block';
        setBtn.style.display = 'inline-block';
        numbers.forEach((number) => {
            number.style.display = 'inline-block';
        });

        $("#quest2 .btn_left").style.display = 'none';
        $("#quest2 .btn_right").style.display = 'none';
        $("#quest2 .btn_back").style.display = 'none';

        $("#quest2 .btn_left").innerText = 'Start';
        $("#quest2 .millisecond").innerText = `0${milliseconds}`;
    }

    numbers.forEach((number, index) => {
        number.onclick = () => {
            if (arr.length < 6) {
                arr.unshift(index);
                setNumbers(arr);
            }
        }
    });
}

quest2();

// Bai 3:

async function quest3() {
    try {
        const response = await fetch("https://randomuser.me/api/");
        const user = await response.json();
        console.log(user);
        $("#quest3 .name").innerText = `Họ tên: ${user.results[0].name.first} ${user.results[0].name.last}`;
        $("#quest3 .email").innerText = `Email: ${user.results[0].email}`;
        $("#quest3 .date_of_birth").innerText = `Ngày sinh: ${user.results[0].dob.date}`;
        $("#quest3 .address").innerText = `Địa chỉ: ${user.results[0].location.city} ${user.results[0].location.country}`;
        $("#quest3 .phone").innerText = `Số điện thoại: ${user.results[0].phone}`;
    } catch (error) {
        console.log(error);
    }
}

quest3();