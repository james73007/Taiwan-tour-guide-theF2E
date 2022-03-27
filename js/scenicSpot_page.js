function getData(){
    const id = location.href.split("=")[1];

axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ScenicSpotID,'${id}')&$format=JSON`,{
    headers:getAuthorizationHeader()
})
    .then(res=>{
        console.log(res.data);
        let thisData = res.data;
        console.log(thisData);
        render(thisData)
    })
    .catch(err=>{
        console.log(err);
        
    })
}


function render(thisData){
    let str ="";
    thisData.forEach(item=>{
        str+=` 
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-5">
                <li class="breadcrumb-item"><a href="index.html">首頁</a></li>
                <li class="breadcrumb-item"><a href="ScenicSpot.html">探索景點</a></li>
                <li class="breadcrumb-item"><a >${item.City}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${item.ScenicSpotName}</li>
            </ol>
        </nav>
        <div class=" overflow-hidden radius-24 ratio ratio-69x37  ratio-lg-111x40 mb-5">
            <img src="${item.Picture.PictureUrl1}" class=" w-100 " alt="${item.Picture.PictureDescription1}">
        </div>
            <h2 class="fw-lighter fs-3 fs-lg-2 mb-3">${item.ScenicSpotName}</h2>
            <p class=" mb-3">
                <span class="category-tag fs-5   radius-20  mb-5"># ${item.Class3}</span>  
            </p>
        <div class="mb-5 mb-lg-9">
            <p class="fw-lighter lineHeight-lg">
                <span class="fw-bold">景點介紹： </span>
                <br>${item.DescriptionDetail}
            </p>
        </div>
        <div class="row">
            <div class="col-lg-6 ">
                <div class="infrom-descrp bg-foodDescrption radius-12 h-100">
                    <p><span class="fw-bold">開放時間：</span> ${item.OpenTime}</p>
                    <p><span class="fw-bold">服務電話：</span>${item.Phone}</p>
                    <p><span class="fw-bold">景點地址：</span>${item.Address}</p>
                    <p><span class="fw-bold">官方網站：</span>${item.WebsiteUrl}</p>
                    <p><span class="fw-bold">票價資訊：</span>${item.TicketInfo}</p>
                    <p><span class="fw-bold">注意事項：</span>${item.Remarks}</p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="">
                    <iframe src="https://www.google.com/maps?q=${item.Position.PositionLat},${item.Position.PositionLon}&hl=zh-tw&z=16&output=embed" height="250" style="border:0;" class="w-100" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
        <div class="">
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
                </div>
        </div>`
    })
    const scenicspotList = document.querySelector('.scenicspot_list');
    scenicspotList.innerHTML = str;
}

function otherScenicSpot(){
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
        let filterTourData = tourData.slice(0,4);
        renderOtherScenicSpot(filterTourData)
    })
}

function renderOtherScenicSpot(filterTourData){
    let str= "";
    filterTourData.forEach(item=>{
        str+=`
        <div class="swiper-slide mb-4">
            <a href="scenicSpot_page.html?id=${item.ScenicSpotID}">
                <div class="card border-0 mb-3 h-100" >
                    <div class="overflow-hidden radius-20 mb-2 category">
                        <img src="${item.Picture.PictureUrl1}" class="w-100  h-200 img-transition" alt="${item.Picture.PictureDescription1}">
                    </div>
                    <div class="card-body p-0">
                        <h3 class="card-title fw-bold text-dark text-truncate">${item.ScenicSpotName}</h3>
                        <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${item.City}</p>
                    </div>
                </div>
            </a>
        </div>`
    })
    const scenicspotWrapper = document.querySelector('.js-scenicspotSwipper')
    scenicspotWrapper.innerHTML = str;
    const scenicspotSwiper = document.querySelector('.js-scenicspot');
    if (scenicspotSwiper) {
    const swiper = new Swiper('.js-scenicspot', {
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
    otherScenicSpot()
}

init()