const navMenu = document.querySelector('.nav-menu-box')
const navExitBtn = document.querySelector('.exit-btn')
const navMenuBtn = document.querySelector('.menu-btn')
const navBar = document.querySelector('nav')
const navSideBar = document.querySelector('.nav-side')
const contentPage = document.querySelector('.content-page')
const nowLink = document.querySelector('ul li span.d-now')
const trendLink = document.querySelector('ul li span.d-trend')
const popLink = document.querySelector('ul li span.d-pop')
const topLink = document.querySelector('ul li span.d-top')
const upLink = document.querySelector('ul li span.d-up')
const searchInput = document.querySelector('.search-input')
const inputNum1 = document.querySelector('.input-valid-1')
const inputNum2 = document.querySelector('.input-valid-2')
const inputNum3 = document.querySelector('.input-valid-3')
const inputNum4 = document.querySelector('.input-valid-4')
const inputNum5 = document.querySelector('.input-valid-5')
const inputNum6 = document.querySelector('.input-valid-6')
const submitBtn = document.querySelector('.sub-btn')
const moodBoxBtn=document.querySelector('#night-mood')
const moodBoxBtn1=document.querySelector('.modd')




window.addEventListener('click', function (e) {
    if (e.target == navMenu || e.target == navMenuBtn || e.target == navExitBtn) {
        navExitBtn.classList.toggle('d-none')
        navMenuBtn.classList.toggle('d-none')
        navBar.classList.toggle('opened')
        navSideBar.classList.toggle('opened')
    }
  

})


const moonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 modd ">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
`;

const sunSVG = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 modd">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
`;


moodBoxBtn.addEventListener('click', function () {
    document.body.classList.toggle("night");

    if (moodBoxBtn.classList.contains('night')) 
    {
        moodBoxBtn.classList.remove('night');
        moodBoxBtn.innerHTML = moonSVG;
    } 
    else 
    {
        moodBoxBtn.classList.add('night');
        moodBoxBtn.innerHTML = sunSVG;
    }

});


async function fetchData(l) {
    let res = await fetch(`${l}`)
    let response = await res.json()
    return response
}

async function display(url, index) {
    let d = await fetchData(url)
    let data = d.results
    let str = ``;
    for (let i = index; i < data.length; i++) {
        let imgPath = data[i].poster_path;
        let fullURL = `https://image.tmdb.org/t/p/original${imgPath}`;

        str += `                <div class="item rounded-3">
                    <div class="inner shadow rounded-4 overflow-hidden position-relative">
                        <img class="w-100 img-trans rounded-3" src=${fullURL} alt="Desc">
                        <div class="layer position-absolute text-white top-0 bottom-0 start-0 end-0  rounded-3">
                            <div class="trans-left m-3">
                                <h3 class="movie-name fs-3 my-4 text-center">${data[i].title}</h3>
                                <p class="movie-desc text-center mb-4 fs-5 fw-light">${data[i].overview}</p>
                                <p class="movie-release-date fs-5">${data[i].release_date}</p>
                                <div
                                    class="movie-rate-box border border-3 w-fit text-center d-flex flex-column justify-content-center rounded-circle text-white border-success">
                                    ${data[i].vote_average}</div>
                            </div>
                        </div>
                    </div>
                </div>`
    }

    contentPage.innerHTML = str;

}

display('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)

window.addEventListener('click', function (e) {
    if (e.target == nowLink) {
        display('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)
    }
    else if (e.target == trendLink) {
        display('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 1)
    }
    else if (e.target == popLink) {
        display('https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)
    }
    else if (e.target == topLink) {
        display('https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)
    }
    else if (e.target == upLink) {
        display('https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)
    }
})

searchInput.addEventListener('input', function (e) {
    if (searchInput.value) {
        display(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchInput.value}`, 0)
    }
    else display('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44', 0)
})



// intialize object of regexes for validation
let allRegex = {
    nameRegex: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^(?:\+201|01)(0|1|2|5)\d{8}$/,
    ageRegex: /^(?:1[89]|[2-9][0-9])$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

}

function validation(regexOfElement, element) {
    let regex = regexOfElement;
    if (regex.test(element.value.trim())) {
        if (element == inputNum1) element.parentElement.classList.remove('invalid-name')
        else if (element == inputNum2) element.parentElement.classList.remove('invalid-mail')
        else if (element == inputNum3) element.parentElement.classList.remove('invalid-phone')
        else if (element == inputNum4) element.parentElement.classList.remove('invalid-age')
        else if (element == inputNum5) element.parentElement.classList.remove('invalid-password')
        else if (element == inputNum6) element.parentElement.classList.remove('invalid-repassword')

        element.classList.add('valid')
        element.classList.remove('invalid')

        return true;
    }

    else {
        if (element == inputNum1) element.parentElement.classList.add('invalid-name')
        else if (element == inputNum2) element.parentElement.classList.add('invalid-mail')
        else if (element == inputNum3) element.parentElement.classList.add('invalid-phone')
        else if (element == inputNum4) element.parentElement.classList.add('invalid-age')
        else if (element == inputNum5) element.parentElement.classList.add('invalid-password')
        else if (element == inputNum6) element.parentElement.classList.add('invalid-repassword')

        element.classList.remove('valid')
        element.classList.add('invalid')

        return false;
    }
}

inputNum1.addEventListener('input', function () {
    validation(allRegex.nameRegex, inputNum1)
})
inputNum2.addEventListener('input', function () {
    validation(allRegex.emailRegex, inputNum2)
})
inputNum3.addEventListener('input', function () {
    validation(allRegex.phoneRegex, inputNum3)
})
inputNum4.addEventListener('input', function () {
    validation(allRegex.ageRegex, inputNum4)
})
inputNum5.addEventListener('input', function () {
    validation(allRegex.passwordRegex, inputNum5)
})
inputNum6.addEventListener('input', function () {
    if (inputNum5.value == inputNum6.value) {
        inputNum6.parentElement.classList.remove('invalid-repassword')
        inputNum6.classList.add('valid')
        inputNum6.classList.remove('invalid')
    }
    else {
        inputNum6.parentElement.classList.add('invalid-repassword')
        inputNum6.classList.remove('valid')
        inputNum6.classList.add('invalid')
    }
})

let state = false;

function check() {
    return  (validation(allRegex.nameRegex, inputNum1) &&
        validation(allRegex.emailRegex, inputNum2) &&
        validation(allRegex.phoneRegex, inputNum3) &&
        validation(allRegex.ageRegex, inputNum4) &&
        validation(allRegex.passwordRegex, inputNum5) &&
        (inputNum6.value === inputNum5.value)
    ) 
}

function resetForm() {
    let inputs = [inputNum1, inputNum2, inputNum3, inputNum4, inputNum5, inputNum6];

    inputs.forEach(input => {

        // clear value
        input.value = "";

        // remove valid/invalid classes
        input.classList.remove("valid", "invalid");

        // remove parent invalid classes
        input.parentElement.classList.remove(
            "invalid-name",
            "invalid-mail",
            "invalid-phone",
            "invalid-age",
            "invalid-password",
            "invalid-repassword"
        );
    });

    // reset button position
    submitBtn.classList.remove("mouse-enter-right");
    submitBtn.classList.add("mouse-enter-origin");
}


submitBtn.addEventListener('mouseenter', function () {

    state=check()

    if (state== false) {
        submitBtn.classList.toggle('mouse-enter-right')
        submitBtn.classList.toggle('mouse-enter-origin')
    } else {
        submitBtn.classList.remove('mouse-enter-right')
        submitBtn.classList.add('mouse-enter-origin')
    }

})
submitBtn.addEventListener('click', function () {
    
    state=check()
     if (state) {
        window.alert("You Have Successfully Registered");
        resetForm()
    }

})