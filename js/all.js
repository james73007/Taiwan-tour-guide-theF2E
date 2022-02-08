
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
                    
                    <div class="card h-100" >
                        <div class="row g-0 flex-nowrap">
                        <div class="col-3 col-md-4  ">
                            <div class="ratio ratio-1x1 h-100 overflow-hidden">
                                <img src="${item.Picture.PictureUrl1}" class="img-fluid rounded-start w-100 img-tran h-62 h-lg-200 " alt="${item.Picture.PictureDescription1}">
                            </div>
                        </div>
                        <div class="col-9 col-md-8">
                            <div class="card-body d-flex flex-column  h-100 p-0 p-md-4">
                                <p class="card-text">${activityStartTime} - ${activityEndTime}</p>
                                <h5 class="card-title">${item.ActivityName}</h5>
                                <div class="d-flex justify-content-between mt-lg-auto">
                                    <p class="card-text mt-auto"><small class="text-muted"><i class="fas fa-map-marker-alt"></i> ${item.City}</small></p>
                                    <a href="activity_page.html?id=${item.ActivityID}"  class="d-none d-md-block">詳細介紹</a>
                                </div>
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
                    <div class="card border-0 h-100" >
                        <div class="h-200 overflow-hidden ratio ratio-4x3">
                            <img src="${item.Picture.PictureUrl1}" class="w-100 card-img-top card-img " alt="${item.Picture.PictureDescription1}">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title text-dark fs-6">${item.ScenicSpotName}</h3>
                            <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${item.City}</p>
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
            <div class=" swiper-slide ">
                <a href="food_page.html?id=${item.RestaurantID}"> 
                    <div class="card border-0" >
                        <div class="h-200 overflow-hidden ratio ratio-4*3">
                            <img src="${item.Picture.PictureUrl1}"  class="card-img-top card-img"  alt="${item.Picture.PictureDescription1}">
                        </div>
                        <div class="card-body ">
                            <h4 class="card-title text-dark fs-6"> ${item.RestaurantName}</h4>
                            <p class="card-text"><i class="fas fa-map-marker-alt"></i>${item.City}</p>
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
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$format=JSON`,{
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
            <li class="swiper-slide">
                <div class="card border-0 ">
                    <img src="${item.Picture.PictureUrl1}"  alt="${item.Picture.PictureDescription1}" class="card-img img-fluid  h-185 h-lg-400 ">
                </div>
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
    