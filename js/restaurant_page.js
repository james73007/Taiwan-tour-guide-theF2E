function getData(){
    const id = location.href.split("=")[1];
axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(RestaurantID,'${id}')&$format=JSON`,{
    headers:getAuthorizationHeader()
})
    .then(res=>{
        console.log(res.data);
        let thisData = res.data;
        console.log(thisData);
        renderGetData(thisData)
    })
    .catch(err=>{
        console.log(err);
    })
}

function renderGetData(thisData){
    let str ="";
    thisData.forEach(item=>{
        let isWebData = "";
        if(item.WebsiteUrl != undefined){
            isWebData =  item.WebsiteUrl;
        };
        console.log(isWebData);
        str+=` 
        <nav aria-label="breadcrumb ">
            <ol class="breadcrumb mb-4 mb-lg-5">
                <li class="breadcrumb-item"><a href="index.html">首頁</a></li>
                <li class="breadcrumb-item text-primary">${item.City}</li>
                <li class="breadcrumb-item active" aria-current="page">${item.RestaurantName}</li> 
            </ol>
        </nav>
        <div class="overflow-hidden mb-4  mb-lg-5">
            <img src="${item.Picture.PictureUrl1}" class="h-185 h-lg-400 w-100 card-img radius-24" alt="${item.Picture.PictureDescription1}">
        </div>
            <h2 class="fs-3 fs-lg-2 fw-lighter mb-3 letter-spacing">${item.RestaurantName}</h2>
            <p class="mb-4 mb-lg-5">
                <span class="category-tag fs-5   radius-20  mb-5"># ${item.Class}</span>            
            </p>
        <div class=" mb-5 mb-lg-9">
            <h4 class="fs-5 fw-bold mb-3">餐廳介紹：</h4>
            <p class="fw-lighter lineHeight-lg fs-5" >${item.Description}</span>
        </div>
        <div class="row mb-5">
            <div class="col-lg-6 ">
                <div class="infrom-descrp h-100 bg-foodDescrption radius-12">
                    <p class="fw-bold fs-6 fs-lg-5 mb-3 "> 營業時間： <span class="fw-light">${item.OpenTime}</span></p>
                    <p class="fw-bold fs-6 fs-lg-5 mb-3 "> 聯絡電話： <span class="fw-light">${item.Phone}</span></p>
                    <div class="d-flex">
                        <p class="fw-bold fs-6 fs-lg-5 mb-3"> 餐廳地址： </p>
                        <a href="" target="_blank" class="fw-light text-decoration-underline word-break">${item.Address}</a>
                    </div>
                    <p class="fw-bold fs-6 fs-lg-5 "> 官方網站： <a href="${isWebData}" target="_blank" class="fw-light text-decoration-underline">${item.isWebData == undefined ? '未提供' : ''} </a></p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="radius-12">
                    <iframe src="https://www.google.com/maps?q=${item.Position.PositionLat},${item.Position.PositionLon}&hl=zh-tw&z=16&output=embed"  style="border:0;" class="w-100 h-185 h-lg-250" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
                <div class="ms-lg-auto w-100 w-lg-50 mb-9">
                    <h4 class="fw-bold mb-3">周邊資訊：</h4>
                    <div class="row">
                        <div class="col-md-4 mb-2 mb-lg-0 radius-4">
                            <a class="d-block other-inform-border-color"  href="javascript:;">
                            <div class="d-flex flex-column align-items-center other-inform" >
                                <svg class="d-block text-center" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 19.5L1.5 26.5H28.5L26 19.5C24.1667 20.8334 19.5 22.7 15.5 19.5C11.5 16.3 6.16667 18.1667 4 19.5Z" fill="#E5E5E5"/>
                                    <path d="M10 4L15.3333 14L22 7.75L28.6667 26.5H2L10 4Z" stroke="#7F977B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.85327 19.0999C8.3466 17.1374 11.8399 17.3124 15.3333 19.6249C18.9866 22.0499 22.6533 22.1249 26.3066 19.8624" stroke="#7F977B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="fw-bold">附近景點</span>
                            </div>
                            </a>
                        </div>
                        <div class="col-md-4 mb-2 mb-lg-0">
                            <a class="d-block  other-inform-border-color"  href="javascript:;">
                                <div class="d-flex flex-column align-items-center other-inform radius-6">
                                    <svg class="d-block text-center" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="6" y="7" width="18" height="4" fill="#E5E5E5"/>
                                        <path d="M24 5.5H22.75V3.8C22.75 3.35817 22.3918 3 21.95 3H21.05C20.6082 3 20.25 3.35817 20.25 3.8V5.5H10.25V3.8C10.25 3.35817 9.89183 3 9.45 3H8.55C8.10817 3 7.75 3.35817 7.75 3.8V5.5H6.5C5.125 5.5 4 6.625 4 8V25.5C4 26.875 5.125 28 6.5 28H24C25.375 28 26.5 26.875 26.5 25.5V8C26.5 6.625 25.375 5.5 24 5.5ZM24 25.5H6.5V13H24V25.5ZM6.5 10.5V8H24V10.5H6.5ZM9 16.3C9 15.8582 9.35817 15.5 9.8 15.5H20.7C21.1418 15.5 21.5 15.8582 21.5 16.3V17.2C21.5 17.6418 21.1418 18 20.7 18H9.8C9.35817 18 9 17.6418 9 17.2V16.3ZM9 21.3C9 20.8582 9.35817 20.5 9.8 20.5H16.95C17.3918 20.5 17.75 20.8582 17.75 21.3V22.2C17.75 22.6418 17.3918 23 16.95 23H9.8C9.35817 23 9 22.6418 9 22.2V21.3Z" fill="#7F977B"/>
                                    </svg>
                                    <span class="fw-bold">附近活動</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 mb-2 mb-lg-0">
                            <a class="d-block other-inform-border-color"  href="javascript:;">
                            <div class="d-flex flex-column align-items-center other-inform">
                                <svg class="d-block text-center" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 15.5C18.8 8.7 10 7 6 7V25.5L7.5 26.5L11 24.5L13 25.5L17 23.5V20L22 15.5Z" fill="#E5E5E5"/>
                                    <path d="M5.005 5.32603C5.005 3.45478 6.5425 1.81978 8.53 2.01603C15.0017 2.65748 20.9975 5.70308 25.3325 10.551C26.67 12.0423 26.2538 14.256 24.7338 15.3573C22.7563 16.7923 19.8088 18.9285 18.13 20.1485C18.1275 20.6948 18.1275 21.0498 18.1287 21.5135V22.2985C18.1289 22.6183 18.059 22.9342 17.9239 23.224C17.7888 23.5138 17.5918 23.7705 17.3468 23.9759C17.1018 24.1814 16.8147 24.3306 16.5058 24.4131C16.1968 24.4957 15.8736 24.5094 15.5588 24.4535C15.3038 25.486 14.3938 26.3623 13.1287 26.3623C12.2537 26.3623 11.5513 25.9435 11.1175 25.3435L9.46125 26.5398C7.60125 27.8823 4.99875 26.5535 5 24.2573L5.005 5.32603ZM8.34625 3.88228C7.585 3.80728 6.87875 4.43603 6.87875 5.32603V5.97603C13.4463 6.25228 19.2675 9.41228 23.11 14.2185L23.6338 13.8385C24.3563 13.3135 24.4488 12.3723 23.9363 11.801C19.9138 7.30348 14.3508 4.47823 8.34625 3.88353V3.88228ZM6.875 24.2573C6.875 25.0223 7.7425 25.466 8.3625 25.0173L11.0225 23.0998C11.1627 22.9989 11.3279 22.9388 11.5001 22.9259C11.6723 22.913 11.8446 22.948 11.9982 23.0268C12.1518 23.1057 12.2806 23.2254 12.3705 23.3728C12.4604 23.5203 12.5078 23.6896 12.5075 23.8623C12.5075 24.1998 12.7687 24.4873 13.1287 24.4873C13.2112 24.4881 13.2929 24.4725 13.3693 24.4414C13.4456 24.4104 13.515 24.3644 13.5734 24.3062C13.6318 24.2481 13.6781 24.1788 13.7095 24.1026C13.7408 24.0264 13.7568 23.9447 13.7563 23.8623V22.2973C13.7563 22.0486 13.855 21.8102 14.0308 21.6344C14.2067 21.4586 14.4451 21.3598 14.6938 21.3598C14.9424 21.3598 15.1808 21.4586 15.3567 21.6344C15.5325 21.8102 15.6313 22.0486 15.6313 22.2973C15.6313 22.4723 15.77 22.6098 15.9412 22.6098C16.0241 22.6098 16.1036 22.5769 16.1622 22.5182C16.2208 22.4596 16.2537 22.3802 16.2537 22.2973V21.5198C16.2525 20.9323 16.2513 20.5098 16.26 19.6585C16.2612 19.5121 16.2966 19.368 16.3634 19.2378C16.4303 19.1076 16.5267 18.9948 16.645 18.9085C17.7725 18.0885 19.765 16.6435 21.59 15.321C19.8078 13.1038 17.5741 11.2913 15.0375 10.0038C12.5008 8.71629 9.71923 7.9833 6.8775 7.85353L6.875 24.2573Z" fill="#7F977B"/>
                                    <path d="M5.005 5.32603C5.005 3.45478 6.5425 1.81978 8.53 2.01603C15.0017 2.65748 20.9975 5.70308 25.3325 10.551C26.67 12.0423 26.2538 14.256 24.7338 15.3573C22.7563 16.7923 19.8088 18.9285 18.13 20.1485C18.1275 20.6948 18.1275 21.0498 18.1287 21.5135V22.2985C18.1289 22.6183 18.059 22.9342 17.9239 23.224C17.7888 23.5138 17.5918 23.7705 17.3468 23.9759C17.1018 24.1814 16.8147 24.3306 16.5058 24.4131C16.1968 24.4957 15.8736 24.5094 15.5588 24.4535C15.3038 25.486 14.3937 26.3623 13.1287 26.3623C12.2537 26.3623 11.5513 25.9435 11.1175 25.3435L9.46125 26.5398C7.60125 27.8823 4.99875 26.5535 5 24.2573L5.005 5.32603ZM8.34625 3.88228C7.585 3.80728 6.87875 4.43603 6.87875 5.32603V5.97603C13.4463 6.25228 19.2675 9.41228 23.11 14.2185L23.6338 13.8385C24.3563 13.3135 24.4488 12.3723 23.9363 11.801C19.9138 7.30348 14.3508 4.47823 8.34625 3.88353V3.88228ZM6.875 24.2573C6.875 25.0223 7.7425 25.466 8.3625 25.0173L11.0225 23.0998C11.1627 22.9989 11.3279 22.9388 11.5001 22.9259C11.6723 22.913 11.8446 22.9479 11.9982 23.0268C12.1518 23.1057 12.2806 23.2254 12.3705 23.3728C12.4604 23.5203 12.5078 23.6896 12.5075 23.8623C12.5075 24.1998 12.7687 24.4873 13.1287 24.4873C13.2112 24.4881 13.2929 24.4725 13.3693 24.4414C13.4456 24.4104 13.515 24.3644 13.5734 24.3062C13.6318 24.2481 13.6781 24.1788 13.7095 24.1026C13.7408 24.0264 13.7568 23.9447 13.7563 23.8623V22.2973C13.7563 22.0486 13.855 21.8102 14.0308 21.6344C14.2067 21.4586 14.4451 21.3598 14.6938 21.3598C14.9424 21.3598 15.1808 21.4586 15.3567 21.6344C15.5325 21.8102 15.6313 22.0486 15.6313 22.2973C15.6313 22.4723 15.77 22.6098 15.9412 22.6098C16.0241 22.6098 16.1036 22.5769 16.1622 22.5182C16.2208 22.4596 16.2537 22.3802 16.2537 22.2973V21.5198C16.2525 20.9323 16.2513 20.5098 16.26 19.6585C16.2612 19.5121 16.2966 19.368 16.3634 19.2378C16.4303 19.1076 16.5267 18.9948 16.645 18.9085C17.7725 18.0885 19.765 16.6435 21.59 15.321C19.8078 13.1038 17.5741 11.2913 15.0375 10.0038C12.5008 8.71629 9.71923 7.9833 6.8775 7.85353L6.875 24.2573Z" stroke="#7F977B" stroke-width="0.4"/>
                                    <path d="M10.8888 12.8724C10.6543 13.1068 10.3364 13.2385 10.0049 13.2385C9.67336 13.2385 9.35542 13.1068 9.121 12.8724C8.88658 12.638 8.75488 12.32 8.75488 11.9885C8.75488 11.657 8.88658 11.3391 9.121 11.1046C9.35542 10.8702 9.67336 10.7385 10.0049 10.7385C10.3364 10.7385 10.6543 10.8702 10.8888 11.1046C11.1232 11.3391 11.2549 11.657 11.2549 11.9885C11.2549 12.32 11.1232 12.638 10.8888 12.8724Z" fill="#7F977B"/>
                                    <path d="M15.8888 16.6199C16.1232 16.3855 16.2549 16.0675 16.2549 15.736C16.2549 15.4045 16.1232 15.0866 15.8888 14.8521C15.6543 14.6177 15.3364 14.486 15.0049 14.486C14.6734 14.486 14.3554 14.6177 14.121 14.8521C13.8866 15.0866 13.7549 15.4045 13.7549 15.736C13.7549 16.0675 13.8866 16.3855 14.121 16.6199C14.3554 16.8543 14.6734 16.986 15.0049 16.986C15.3364 16.986 15.6543 16.8543 15.8888 16.6199Z" fill="#7F977B"/>
                                    <path d="M10.8888 20.3674C10.6543 20.6018 10.3364 20.7335 10.0049 20.7335C9.67336 20.7335 9.35542 20.6018 9.121 20.3674C8.88658 20.133 8.75488 19.815 8.75488 19.4835C8.75488 19.152 8.88658 18.8341 9.121 18.5996C9.35542 18.3652 9.67336 18.2335 10.0049 18.2335C10.3364 18.2335 10.6543 18.3652 10.8888 18.5996C11.1232 18.8341 11.2549 19.152 11.2549 19.4835C11.2549 19.815 11.1232 20.133 10.8888 20.3674Z" fill="#7F977B"/>
                                </svg>
                                <span class="fw-bold">附近美食</span>
                            </div>
                            </a>
                        </div>
                    </div>    
                </div>`
    })
    const foodList = document.querySelector('.food_list');
    foodList.innerHTML = str;
}

function getOtherData(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON`,{
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
        let filterTourData = tourData.slice(0,6);
        renderOtherData(filterTourData)
    })
}

function renderOtherData(filterTourData){
    let str= "";
    filterTourData.forEach(item=>{
        str+=`
        <div class="swiper-slide mb-4">
            <a href="restaurant_page.html?id=${item.RestaurantID}">
                <div class="card border-0 mb-3 h-100" >
                    <div class="overflow-hidden ratio ratio-4x3 mb-3">
                        <img src="${item.Picture.PictureUrl1}" class="w-100  radius-20" alt="${item.Picture.PictureDescription1}">
                    </div>
                    <div class="card-body p-0">
                        <h3 class="card-title text-dark fw-bold fs-4 letter-spacing text-truncate">${item.RestaurantName}</h3>
                        <p class="card-text fw-light text-light">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.04211 2.04201C4.34959 0.734532 6.1229 0 7.97195 0C9.821 0 11.5943 0.734532 12.9018 2.04201C14.2093 3.34948 14.9438 5.1228 14.9438 6.97185C14.9438 8.8209 14.2093 10.5942 12.9018 11.9017L11.9514 12.8417C11.2508 13.5287 10.342 14.4127 9.22423 15.4936C8.88828 15.8184 8.43926 16 7.97195 16C7.50465 16 7.05562 15.8184 6.71968 15.4936L3.92447 12.7744C3.57297 12.4294 3.27912 12.1387 3.04211 11.9017C2.39469 11.2543 1.88112 10.4858 1.53073 9.63988C1.18034 8.79402 1 7.88742 1 6.97185C1 6.05629 1.18034 5.14969 1.53073 4.30382C1.88112 3.45795 2.39469 2.68939 3.04211 2.04201ZM12.0523 2.89074C10.9699 1.80857 9.50195 1.2007 7.97139 1.20085C6.44082 1.201 4.97301 1.80916 3.89084 2.89154C2.80868 3.97392 2.20081 5.44185 2.20096 6.97242C2.20111 8.50298 2.80926 9.9708 3.89164 11.053L5.08147 12.2284C5.90336 13.0314 6.72753 13.8321 7.55399 14.6304C7.66599 14.7388 7.81572 14.7994 7.97155 14.7994C8.12739 14.7994 8.27712 14.7388 8.38911 14.6304L11.1067 11.9882C11.483 11.6191 11.7976 11.3076 12.0515 11.053C13.1336 9.97078 13.7415 8.50306 13.7415 6.97265C13.7415 5.44225 13.1336 3.97452 12.0515 2.89234L12.0523 2.89074ZM7.97195 4.78917C8.28761 4.78917 8.60017 4.85135 8.8918 4.97214C9.18343 5.09294 9.4484 5.26999 9.67161 5.49319C9.89481 5.71639 10.0719 5.98137 10.1927 6.273C10.3135 6.56462 10.3756 6.87719 10.3756 7.19284C10.3756 7.5085 10.3135 7.82106 10.1927 8.11269C10.0719 8.40431 9.89481 8.66929 9.67161 8.89249C9.4484 9.11569 9.18343 9.29275 8.8918 9.41354C8.60017 9.53434 8.28761 9.59651 7.97195 9.59651C7.34216 9.58502 6.74205 9.32676 6.30073 8.87731C5.85941 8.42786 5.61215 7.82314 5.61215 7.19324C5.61215 6.56335 5.85941 5.95862 6.30073 5.50917C6.74205 5.05972 7.34216 4.80147 7.97195 4.78997V4.78917ZM7.97195 5.99021C7.81402 5.99021 7.65764 6.02131 7.51173 6.08175C7.36582 6.14219 7.23324 6.23078 7.12156 6.34245C7.00989 6.45413 6.9213 6.5867 6.86087 6.73261C6.80043 6.87852 6.76932 7.03491 6.76932 7.19284C6.76932 7.35078 6.80043 7.50716 6.86087 7.65307C6.9213 7.79898 7.00989 7.93156 7.12156 8.04323C7.23324 8.15491 7.36582 8.24349 7.51173 8.30393C7.65764 8.36437 7.81402 8.39548 7.97195 8.39548C8.29081 8.39548 8.5966 8.26881 8.82206 8.04335C9.04753 7.81789 9.17419 7.5121 9.17419 7.19324C9.17419 6.87439 9.04753 6.5686 8.82206 6.34313C8.5966 6.11767 8.29081 5.99101 7.97195 5.99101V5.99021Z" fill="#646464"/>
                        </svg> ${item.City}</p>
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
        return { 'Authorization': Authorization, 'X-Date': GMTString  }; 
}

function init(){
    getData()
    getOtherData()
}
init()