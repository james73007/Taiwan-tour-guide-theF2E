const activityCity = document.querySelector('.activityCity');
const activityDate = document.querySelector('.js-activityDate');
const activityKeyword = document.querySelector('.js-activityKeyword');
const searchActivity = document.querySelector('.js-searchActivity');
const activityList = document.querySelector('.activityList');
const activityCategory = document.querySelector('.activityCategory');
const paginationList = document.querySelector('.js-pagination');
const clickbtn = document.querySelector('.js-click-btn');
const navbar = document.querySelector('.navabr');
let data = [];

$(".js-goTop").click(function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      600
    );
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
      if ($(".goTop").hasClass("hide")) {
        $(".goTop").toggleClass("hide");
      }
    } else {
      $(".goTop").addClass("hide");
    }
  });
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
searchActivity.addEventListener('click',function(e){
    let city = activityCity.value;
    let activityTime = activityDate.value;
    let keyword = activityKeyword.value.trim();
    if(activityTime == "" || keyword == "" ){
        alert('請輸入關鍵字')
        return 
    }
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}?&filter=contains(ActivityName,'${keyword}')&$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
        // data = [];
        // console.log(res.data);
        // console.log(data);
        
        // if(res.data.length == 0){
        //     console.log('not found data');
            
        // }
            res.data.forEach(item=>{
                if(item.Picture.PictureUrl1 != undefined){
                    data.push(item)
                }
            })
            activityKeyword.value = "";
            activityDate.value = "";
            render(data)
            pagination(1)
        
    })
    .catch(err=>{
        console.log(err);
    })
})


function render(data){
        let str= "";
        str+=`<h3 class="fw-lighter mb-3">活動資料有 ${data.length} 筆</h3>`
        data.forEach(item=>{
            str+=`
            <div class="col-6 col-md-4 col-lg-3 mb-3">
                <a href="activity_page.html?id=${item.ActivityID}" class="d-block">
                    <div class="card border-0 h-100 " >
                        <div class=" overflow-hidden h-200 radius-20 category mb-2">
                            <img src="${item.Picture.PictureUrl1}" class="w-100 h-200 img-transition" alt="${item.Picture.PictureDescription1}">
                        </div>
                        <div class="card-body p-0">
                            <h5 class="card-title text-truncate text-dark mb-0">${item.ActivityName}</h5>
                            <p class="card-text">${item.City}</p>
                        </div>
                    </div>
                </a>
            </div>`
        })
        activityCategory.innerHTML =str;
}

//分頁邏輯
function pagination(nowPage){
    const perpage = 20; //每頁出現20筆資料
    const pageTotal = Math.ceil(data.length/perpage);  //無條件進位   
    const minData =  perpage*nowPage - perpage +1;
    const  maxData = perpage*nowPage;
    let currentData =[];
    data.forEach((item,index)=>{   
        if(index+1>= minData &&  index < maxData){
            currentData.push(item)
        }
    })
    const pageInfo ={
        pageTotal,
        nowPage,
        isFirstPage: nowPage == 1 ,
        isLastPage: nowPage == pageTotal,
    }      
    render(currentData); 
    pageBtn(pageInfo)
}

// 渲染分頁按鈕                              
function pageBtn(pageInfo){
    let str = '';
    let totalPages = pageInfo.pageTotal;
//判斷是否為第一頁
    if (pageInfo.isFirstPage) {
        str+=` 
        <li class="page-item disabled me-2 w-32 h-32  ">
            <a class="page-link disabled-color fw-bold" href="#">
                <i class="fas fa-angle-left text-seondary"></i>
            </a>
        </li>`
    }else{
        str += `
        <li class="page-item me-2 w-32 h-32 ">
            <a class="page-link bg-primary text-white" href="#" aria-label="Previous" data-page="${Number(pageInfo.nowPage) - 1}">
            &laquo;
            </a>
        </li>`
    }

  // 第 2 ~
for(let i=1; i<=totalPages; i++){
    if(Number(pageInfo.nowPage) == i){
    str += `
        <li class="page-item active me-2 w-32 h-32 radius-4" aria-current="page">
            <a class="page-link fw-bold" href="#" data-page="${i}">${i}</a>
        </li>`
    }else{
    str += `
        <li class="page-item me-2 w-32 h-32 " aria-current="page">
            <a class="page-link fw-bold" href="#" data-page="${i}">${i}</a>
        </li>`
    }
}

 //判斷是否為最後一頁
if (pageInfo.isLastPage) {
        str+=`
        <li class="page-item disabled me-2 w-32 h-32 ">
            <a class="page-link  bg-primary disabled-color " href="#">
            &raquo;
            </a>
        </li>`
    }else{
        str+=`  
        <li class="page-item me-2 w-32 h-32 ">
            <a class="page-link bg-primary text-white fw-bold" href="#" aria-label="Next" data-page="${Number(pageInfo.nowPage) + 1}">
                <i class="fas fa-angle-right"></i>
            </a>
        </li>`
    }
    paginationList.innerHTML = str;
}
//監聽分頁按鈕
paginationList.addEventListener('click',function(e){
    e.preventDefault()
    if (e.target.nodeName != 'A') {
        return
    }
    let page = e.target.dataset.page;
    pagination(page)
})

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