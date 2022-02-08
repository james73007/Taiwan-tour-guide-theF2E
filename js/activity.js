const activityCity = document.querySelector('.activityCity');
const activityDate = document.querySelector('.js-activityDate');
const activityKeyword = document.querySelector('.js-activityKeyword');
const searchActivity = document.querySelector('.js-searchActivity');
const activityList = document.querySelector('.activityList');
const activityCategory = document.querySelector('.activityCategory');
let data = [];

searchActivity.addEventListener('click',function(e){
    let city = activityCity.value;
    let activityTime = activityDate.value;
    let keyword = activityKeyword.value;
    if(activityTime == "" || keyword == "" ){
        alert('請輸入關鍵字')
        return 
    }
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}?&filter=contains(ActivityName,'${keyword}')&$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        console.log(res.data);
        data = res.data;
        let str= "";
        str+=`<p>活動資料有 ${data.length} 筆</p>`

        data.forEach(item=>{
            let thisTime =  +new Date(activityTime);
            let startTime = +new Date(item.StartTime);
            let endTime = +new Date(item.EndTime);  
            let time =item.StartTime;
            let otime =item.EndTime;
            let activityStartTime = time.split("T")[0];
            let activityEndTime = otime.split("T")[0];
            if (thisTime > startTime && thisTime < endTime) {
                    str+=`
                    <div class="col-6 col-md-4 col-lg-4">
                        <div class="card border border-danger h-100 " >
                            <div class="card-body overflow-hidden">
                                <img src="${item.Picture.PictureUrl1}" class="card-img-top h-200" alt="${item.Picture.PictureDescription1}">
                            </div>
                            <div class="card-body ">
                                <h5 class="card-title">${item.ActivityName}</h5>
                                <p class="card-text">開始時間: ${activityStartTime} - 結束時間: ${activityEndTime} </p>
                                <p class="card-text">${item.City}</p>
                            </div>
                        </div>
                    </div>
                    `
            }
        })
        activityCategory.innerHTML =str;
    })
    
})


activityCategory.addEventListener('click',e=>{
    e.preventDefault();
    console.log('a');
    
    if(e.target.nodeName != "A"){
        return
    }
    console.log('沒點到a');
    
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?&format=JSON`,{
        headers:getAuthorizationHeader()
    })
    .then(res=>{
        data = res.data;
       
       let str= "";
    //    str+=`<p>搜尋結果 ${foodData.length}筆</p>`

       data.forEach(item=>{
          str+=`
          <div class="card border-0" style="width: 18rem;">
          <img src="${item.Picture.PictureUrl1}" class="card-img-top" alt="${item.Picture.PictureDescription1}">
          <div class="card-body">
            <h5 class="card-title">${item.ActivityName}</h5>
          </div>
        </div>`
       })
       activityList.innerHTML = str;
    })
})


function checkEventTime(thisTime,startTime,endTime){
    if(thisTime > startTime && thisTime < endTime){
        return true
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
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}