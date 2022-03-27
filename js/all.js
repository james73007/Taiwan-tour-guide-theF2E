
const activityList = document.querySelector('.activityList');
let tourData = [];
let foodData= [];
let activityData= [];

function init(){
    getFood()
    getActivity()
    getTour()
    renderSwiper()
}
init()

const navbarClick = document.querySelector('.navbar-click');
navbarClick.addEventListener('click',function(e){
    navbarClick.classList.toggle("navbar-mobile-click");
})

const ms = document.querySelector('.ms');
const mc = document.querySelector('.mc');
ms.addEventListener('click',function(e){
    mc.classList.remove("d-none")
    mc.classList.add("d-block");
    ms.classList.remove("d-block");
    ms.classList.add("d-none");
})
mc.addEventListener('click',function(e){
    mc.classList.remove("d-block");
    mc.classList.add("d-none");
    ms.classList.remove("d-none");
    ms.classList.add("d-block");
})

function getActivity(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        res.data.forEach(item=>{
            if (item.Picture.PictureUrl1 !== undefined) {
                activityData.push(item)
              }
        });
        activityData = activityData.sort(() => Math.random() - 0.5);
        let filterThisYearData =  activityData.filter(item=>{
            let eventStartTime= item.StartTime ;
            let eventEndTime= item.EndTime ;
            let newTime = eventStartTime.split("T")[0];
            let endTime = eventEndTime.split("T")[0];
            let date = +new Date(newTime);
            let eventdate = +new Date(endTime);
            if ( date > 1640995200000 && eventdate  < 1672444800000) {
                return item
            }
        })
        let dd = filterThisYearData.slice(0,4);
        let str= "";
        dd.forEach(item=>{
            let startTime = +new Date(item.StartTime);
            let endTime = +new Date(item.EndTime);  
            let time =item.StartTime;
            let otime =item.EndTime;
            let activityStartTime = time.split("T")[0];
            let activityEndTime = otime.split("T")[0];
                str+=`
                <div class="col-md-6">
                    <div class="card border-0 mb-3 radius">
                        <div class="row g-0">
                            <div class="col-4 ">
                                <div class="overflow-hidden ratio ratio-45x31 ratio-md-1x1  card-radius cardWrap">
                                    <img src="${item.Picture.PictureUrl1}" class="img-fluid w-100 h-100  img-transition" alt="...">
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card-body d-flex flex-column  cardWrap card-bg h-100">
                                    <h5 class="card-title fw-light  card-activity-date-font mb-0">${activityStartTime} - ${activityEndTime}</h5>
                                    <p class="card-text fw-bold text-truncate fs-6 fs-lg-4  letter-spacing  card-activity-font">${item.ActivityName}</p>
                                    <p class="card-text d-flex justify-content-between mt-0 mt-md-auto"> 
                                        <span class="card-description fs-lg-6">${item.City}</span> 
                                        <a href="activity_page.html?id=${item.ActivityID}" class="card-description fs-lg-6">詳細介紹
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 3.5L10 8L6 12.5" stroke="#7F977B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        })
        activityList.innerHTML = str;
    })
}



function getTour(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        let  tourData = res.data.map(item=>{
            if (item.Picture.PictureUrl1 !== undefined) {
                return item
              }
        })
        console.log(tourData);
        
        tourData = tourData.sort(() => Math.random() - 0.5);
        let dd = tourData.slice(0,10);
        let str= "";
        dd.forEach(item=>{
            str+=`
            <div class="swiper-slide ">
                <a href="scenicSpot_page.html?id=${item.ScenicSpotID}">
                    <div class="card border-0 h-100 " >
                        <div class="overflow-hidden ratio ratio-11x8 ratio-lg-51x40 radius-20  mb-2 ">
                            <img src="${item.Picture.PictureUrl1}" class="w-100  img-transition" alt="${item.Picture.PictureDescription1}">
                        </div>
                        <div class="card-body p-0">
                            <h3 class="card-title text-dark text-truncate fw-bold  letter-spacing card-titleFont fs-lg-4">${item.ScenicSpotName}</h3>
                            <p class="card-text  text-light fw-light">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.04211 2.04201C3.34959 0.734532 5.1229 0 6.97195 0C8.821 0 10.5943 0.734532 11.9018 2.04201C13.2093 3.34948 13.9438 5.1228 13.9438 6.97185C13.9438 8.8209 13.2093 10.5942 11.9018 11.9017L10.9514 12.8417C10.2508 13.5287 9.34199 14.4127 8.22423 15.4936C7.88828 15.8184 7.43926 16 6.97195 16C6.50465 16 6.05562 15.8184 5.71968 15.4936L2.92447 12.7744C2.57297 12.4294 2.27912 12.1387 2.04211 11.9017C1.39469 11.2543 0.881117 10.4858 0.530729 9.63988C0.180342 8.79402 0 7.88742 0 6.97185C0 6.05629 0.180342 5.14969 0.530729 4.30382C0.881117 3.45795 1.39469 2.68939 2.04211 2.04201ZM11.0523 2.89074C9.96989 1.80857 8.50195 1.2007 6.97139 1.20085C5.44082 1.201 3.97301 1.80916 2.89084 2.89154C1.80868 3.97392 1.20081 5.44185 1.20096 6.97242C1.20111 8.50298 1.80926 9.9708 2.89164 11.053L4.08147 12.2284C4.90336 13.0314 5.72753 13.8321 6.55399 14.6304C6.66599 14.7388 6.81572 14.7994 6.97155 14.7994C7.12739 14.7994 7.27712 14.7388 7.38911 14.6304L10.1067 11.9882C10.483 11.6191 10.7976 11.3076 11.0515 11.053C12.1336 9.97078 12.7415 8.50306 12.7415 6.97265C12.7415 5.44225 12.1336 3.97452 11.0515 2.89234L11.0523 2.89074ZM6.97195 4.78917C7.28761 4.78917 7.60017 4.85135 7.8918 4.97214C8.18343 5.09294 8.4484 5.26999 8.67161 5.49319C8.89481 5.71639 9.07186 5.98137 9.19265 6.273C9.31345 6.56462 9.37562 6.87719 9.37562 7.19284C9.37562 7.5085 9.31345 7.82106 9.19265 8.11269C9.07186 8.40431 8.89481 8.66929 8.67161 8.89249C8.4484 9.11569 8.18343 9.29275 7.8918 9.41354C7.60017 9.53434 7.28761 9.59651 6.97195 9.59651C6.34216 9.58502 5.74205 9.32676 5.30073 8.87731C4.85941 8.42786 4.61215 7.82314 4.61215 7.19324C4.61215 6.56335 4.85941 5.95862 5.30073 5.50917C5.74205 5.05972 6.34216 4.80147 6.97195 4.78997V4.78917ZM6.97195 5.99021C6.81402 5.99021 6.65764 6.02131 6.51173 6.08175C6.36582 6.14219 6.23324 6.23078 6.12156 6.34245C6.00989 6.45413 5.9213 6.5867 5.86087 6.73261C5.80043 6.87852 5.76932 7.03491 5.76932 7.19284C5.76932 7.35078 5.80043 7.50716 5.86087 7.65307C5.9213 7.79898 6.00989 7.93156 6.12156 8.04323C6.23324 8.15491 6.36582 8.24349 6.51173 8.30393C6.65764 8.36437 6.81402 8.39548 6.97195 8.39548C7.29081 8.39548 7.5966 8.26881 7.82206 8.04335C8.04753 7.81789 8.17419 7.5121 8.17419 7.19324C8.17419 6.87439 8.04753 6.5686 7.82206 6.34313C7.5966 6.11767 7.29081 5.99101 6.97195 5.99101V5.99021Z" fill="#646464"/>
                                </svg>${item.City}
                            </p>
                        </div>
                    </div>
                </a>
            </div>`
        })
        const tourSwiperWrapper = document.querySelector('.js-tourSwipper')
        tourSwiperWrapper.innerHTML = str;
        const popularTourSwiper = document.querySelector('.js-popular-Tour');
        if (popularTourSwiper) {
        const swiper = new Swiper('.js-popular-Tour', {
            slidesPerView: 1.7,
            spaceBetween: 16,
            breakpoints: {
            576: {
                slidesPerView: 2.7,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            996: {
                slidesPerView: 4,
                spaceBetween: 30
            }
            }
        });
        }
    })
}


function getFood(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?&format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        let foodData = res.data.map(item=>{
            if (item.Picture.PictureUrl1 !== undefined) {
                return item
              }
        });
        foodData = foodData.sort(() => Math.random() - 0.5);
        let dd = foodData.slice(0,6);
        let str= "";
        dd.forEach(item=>{
            str+=`
            <div class="swiper-slide">
                <a href="restaurant_page.html?id=${item.RestaurantID}"> 
                    <div class="card border-0 " >
                        <div class="overflow-hidden ratio ratio-11x8 ratio-lg-51x40 radius-20  mb-2">
                            <img src="${item.Picture.PictureUrl1}"  class="card-img-top card-img  img-transition" alt="${item.Picture.PictureDescription1}">
                        </div>
                        <div class="card-body p-0 ">
                            <h4 class="card-title text-dark fw-bold text-truncate  letter-spacing card-titleFont fs-lg-4">${item.RestaurantName}</h4>
                            <p class="card-text text-light  fw-light">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.04211 2.04201C3.34959 0.734532 5.1229 0 6.97195 0C8.821 0 10.5943 0.734532 11.9018 2.04201C13.2093 3.34948 13.9438 5.1228 13.9438 6.97185C13.9438 8.8209 13.2093 10.5942 11.9018 11.9017L10.9514 12.8417C10.2508 13.5287 9.34199 14.4127 8.22423 15.4936C7.88828 15.8184 7.43926 16 6.97195 16C6.50465 16 6.05562 15.8184 5.71968 15.4936L2.92447 12.7744C2.57297 12.4294 2.27912 12.1387 2.04211 11.9017C1.39469 11.2543 0.881117 10.4858 0.530729 9.63988C0.180342 8.79402 0 7.88742 0 6.97185C0 6.05629 0.180342 5.14969 0.530729 4.30382C0.881117 3.45795 1.39469 2.68939 2.04211 2.04201ZM11.0523 2.89074C9.96989 1.80857 8.50195 1.2007 6.97139 1.20085C5.44082 1.201 3.97301 1.80916 2.89084 2.89154C1.80868 3.97392 1.20081 5.44185 1.20096 6.97242C1.20111 8.50298 1.80926 9.9708 2.89164 11.053L4.08147 12.2284C4.90336 13.0314 5.72753 13.8321 6.55399 14.6304C6.66599 14.7388 6.81572 14.7994 6.97155 14.7994C7.12739 14.7994 7.27712 14.7388 7.38911 14.6304L10.1067 11.9882C10.483 11.6191 10.7976 11.3076 11.0515 11.053C12.1336 9.97078 12.7415 8.50306 12.7415 6.97265C12.7415 5.44225 12.1336 3.97452 11.0515 2.89234L11.0523 2.89074ZM6.97195 4.78917C7.28761 4.78917 7.60017 4.85135 7.8918 4.97214C8.18343 5.09294 8.4484 5.26999 8.67161 5.49319C8.89481 5.71639 9.07186 5.98137 9.19265 6.273C9.31345 6.56462 9.37562 6.87719 9.37562 7.19284C9.37562 7.5085 9.31345 7.82106 9.19265 8.11269C9.07186 8.40431 8.89481 8.66929 8.67161 8.89249C8.4484 9.11569 8.18343 9.29275 7.8918 9.41354C7.60017 9.53434 7.28761 9.59651 6.97195 9.59651C6.34216 9.58502 5.74205 9.32676 5.30073 8.87731C4.85941 8.42786 4.61215 7.82314 4.61215 7.19324C4.61215 6.56335 4.85941 5.95862 5.30073 5.50917C5.74205 5.05972 6.34216 4.80147 6.97195 4.78997V4.78917ZM6.97195 5.99021C6.81402 5.99021 6.65764 6.02131 6.51173 6.08175C6.36582 6.14219 6.23324 6.23078 6.12156 6.34245C6.00989 6.45413 5.9213 6.5867 5.86087 6.73261C5.80043 6.87852 5.76932 7.03491 5.76932 7.19284C5.76932 7.35078 5.80043 7.50716 5.86087 7.65307C5.9213 7.79898 6.00989 7.93156 6.12156 8.04323C6.23324 8.15491 6.36582 8.24349 6.51173 8.30393C6.65764 8.36437 6.81402 8.39548 6.97195 8.39548C7.29081 8.39548 7.5966 8.26881 7.82206 8.04335C8.04753 7.81789 8.17419 7.5121 8.17419 7.19324C8.17419 6.87439 8.04753 6.5686 7.82206 6.34313C7.5966 6.11767 7.29081 5.99101 6.97195 5.99101V5.99021Z" fill="#646464"/>
                                </svg>${item.City}
                            </p>
                        </div>
                    </div>
                </a>
            </div>`
        })

        const foodSwiperWrapper = document.querySelector('.js-swiper-wrapper')
        foodSwiperWrapper.innerHTML = str;

        const popularTourSwiper = document.querySelector('.js-foodSwiper');

        if (popularTourSwiper) {
        const swiper = new Swiper('.js-foodSwiper', {
            slidesPerView: 1.7,
            spaceBetween: 16,
            breakpoints: {
            576: {
                slidesPerView: 2.7,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            996: {
                slidesPerView: 4,
                spaceBetween: 30
            }
            }
        });
        }
    })
}



function renderSwiper(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/NewTaipei?$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        // tourData = res.data;
        let swiperData = res.data.map(item=>{
            if (item.Picture.PictureUrl1 !== undefined) {
                return item
            }
        })
        swiperData = swiperData.sort(() => Math.random() - 0.5);
        let dd = swiperData.slice(0,6);
        let str = "";
        dd.forEach((item) => {
            str += `
            <li class="swiper-slide position-relative ">
                <a href="scenicSpot_page.html?id=${item.ScenicSpotID}" class="d-block">
                    <div class="border-0 ratio ratio-69x37  ratio-lg-111x40 overflow-hidden cardWrap radius-20">
                        <img src="${item.Picture.PictureUrl1}" class="img-fluid radius-24 img-transition"  alt="${item.Picture.PictureDescription1}" >
                    </div>
                    <div class=" fs-lg-3 fw-bold text-white position-absolute top-50 start-50 translate-middle">${item.City}|${item.ScenicSpotName}</div>
                </a>
            </li>`;
        });
        const bannerSwiperWrapper = document.querySelector('.js-bannerSwiper')
        bannerSwiperWrapper.innerHTML = str;

        const popularTourSwiper = document.querySelector('.js-bannerWrapSwiper');

        if (popularTourSwiper) {
        const swiper = new Swiper('.js-bannerWrapSwiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction:false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
        }
        })
}   

function getAuthorizationHeader() {
        let AppID = '618eb550effe49088b44665359fa2b06';
        let AppKey = 'PijBFrx2RtPy6i-Ca9iwVIVaP8k';
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }
    