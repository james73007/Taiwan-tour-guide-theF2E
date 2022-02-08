function getData(){
    const id = location.href.split("=")[1];

axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(ActivityID,'${id}')&$format=JSON`,{
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
                <h2 class="mb-3">${item.ActivityName}</h2>
                <p class="border border-danger mb-3"># ${item.Class1}</p>
                <p class="border border-danger mb-3"># ${item.Class2}</p>
            <div class="mb-5">
                 <p><span class="fw-bold">餐廳介紹：</span> <br>${item.Description}</p>
            </div>
            <div class="row">
                <div class="col-lg-6 ">
                    <div class="p-3 bg-info h-100">
                        <p>活動時間：${item.StartTime} - ${item.EndTime} </p>
                        <p>聯絡電話：${item.Phone}</p>
                        <p>主辦單位：${item.Organizer}</p>
                        <p>活動地點：${item.Location}</p>
                        <p>官方網站：${item.WebsiteUrl}</p>
                        <p>活動費用：${item.Charge}</p>
                        <p>注意事項：${item.Remarks}</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="">
                        <iframe src="https://www.google.com/maps?q=${item.Position.PositionLat},${item.Position.PositionLon}&hl=zh-tw&z=16&output=embed" height="250" style="border:0;" class="w-100" allowfullscreen="" loading="lazy"></iframe>
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
        const activityList = document.querySelector('.js-activity_list');
        activityList.innerHTML = str;
      
    })
    .catch(err=>{
        console.log(err);
        
    })
}


function otherActivity(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON`,{
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
            <a href="activity_page.html?id=${item.ActivityID}">
                <div class="card  border border-danger mb-3 h-100" >
                    <div class="overflow-hidden">
                        <img src="${item.Picture.PictureUrl1}" style="height:200px" class="w-100 card-img-top card-img border border-danger" alt="${item.Picture.PictureDescription1}">
                    </div>
                    <h3 class="card-title">${item.ActivityName}</h3>
                    <div class="card-body">
                        <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${item.City}</p>
                    </div>
                </div>
                
            </a>
            </div>`
        })
        const activitySwiperWrapper = document.querySelector('.js-activitySwipper')
        activitySwiperWrapper.innerHTML = str;
        const activitySwiper = document.querySelector('.js-activity');
        if (activitySwiper) {
        const swiper = new Swiper('.js-activity', {
            slidesPerView: 1.8,
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
    otherActivity()
}
init()