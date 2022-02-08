function getData(){
    const id = location.href.split("=")[1];

axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(RestaurantID,'${id}')&$format=JSON`,{
    headers:getAuthorizationHeader()
})
    .then(res=>{
        console.log(res.data);
        let thisData = res.data;
        console.log(thisData);
        let str ="";
        thisData.forEach(item=>{
            str+=` 
            <div class=" overflow-hidden">
                <img src="${item.Picture.PictureUrl1}" class="h-185  h-lg-400 w-100" alt="${item.Picture.PictureDescription1}">
            </div>
                <h2 class="mb-3">${item.RestaurantName}</h2>
                <p class="border border-danger mb-3"># ${item.Class}</p>
            <div class="mb-5">
                 <p><span class="fw-bold">餐廳介紹：</span> <br>${item.Description}</p>
            </div>
            <div class="row">
                <div class="col-lg-6 ">
                    <div class="p-3 bg-info h-100">
                        <p>營業時間：${item.OpenTime}</p>
                        <p>聯絡電話：${item.Phone}</p>
                        <p>餐廳地址：${item.Address}</p>
                        <p>官方網站：${item.WebsiteUrl}</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="">
                        <iframe src="https://www.google.com/maps?q=${item.Position.PositionLat},${item.Position.PositionLon}&hl=zh-tw&z=16&output=embed"  style="border:0;" class="w-100 h-185 h-lg-250" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
            <div class="">
                    <div class="ms-auto w-50">
                        <h4 class="mb-3">周邊資訊：</h4>
                        <ul class="d-flex list-unstyled">
                            <li>

                                <a> 附近景點</a> 
                            </li>
                            <li>

                                <a> 附近活動</a>
                            </li>
                            <li>

                                <a> 附近美食</a> 
                            </li>
                        </ul>
                    </div>
            </div>`
        })
        const foodList = document.querySelector('.food_list');
        foodList.innerHTML = str;
      
    })
    .catch(err=>{
        console.log(err);
        
    })
}

function otherFood(){
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
        let dd = tourData.slice(0,6);
        let str= "";
        dd.forEach(item=>{
            str+=`
            <div class="swiper-slide mb-4">
            <a href="food_page.html?id=${item.RestaurantID}">
                <div class="card  border border-danger mb-3 h-100" >
                    <div class="overflow-hidden">
                        <img src="${item.Picture.PictureUrl1}" style="height:200px" class="w-100 card-img-top card-img border border-danger" alt="${item.Picture.PictureDescription1}">
                    </div>
                    <h3 class="card-title">${item.RestaurantName}</h3>
                    <div class="card-body">
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
    otherFood()
}
init()