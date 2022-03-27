const select= document.querySelector('.select');
const search = document.querySelector('.search');
const searchLocation = document.querySelector('.searchLocation');
const list = document.querySelector('.list');
const tourCategory = document.querySelector('.tourCategory');
const paginationList = document.querySelector('.js-pagination');
const tourClass = document.querySelector('.tour');

let tourData = [];

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

//旅遊類別
// tourCategory.addEventListener('click',function(e){
//     e.preventDefault();
//     console.log(e.target.nodeName);
//     console.log(e.target.dataset.category);
    
//     if(e.target.nodeName != 'IMG'){
//        return
//     }
//     axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?&$format=JSON`,{
//       headers:getAuthorizationHeader()
//   })
//     .then(res=>{
//        tourData = res.data;
//        let category = e.target.dataset.category;
//        let data = tourData.filter(item=>{
//          if (item.Picture.PictureUrl1 != undefined) {
//             return item
//          }
//        })
//        let str="";
//        str+=`<p>搜尋結果有${data.length} 筆</p>`;

//        data.forEach(item=>{
//           if(category == item.Class1){
//              str+=`
//              <div class="col">
//                <div class="card border-0 mb-3 h-100" >
//                   <a href="scenicSpot_page.html?id=${item.ScenicSpotID}" >
//                      <div class="overflow-hidden radius-20 h-200  w-100 overflow-hidden ">
//                         <img src="${item.Picture.PictureUrl1}"  class="card-img-top" alt="...">
//                      </div>
//                      <div class="card-body p-0">
//                         <h4 class="text-truncate" >${item.ScenicSpotName}</h4>
//                         <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${item.Class1}</p>
//                      </div>
                  
//                   </a>
//                </div>
//              </div>`
//           }
//        })
//        tourCategory.innerHTML = str;
//     })
// })


 search.addEventListener('click',function(e){
   let selectCity = select.value;
   let keyword = searchLocation.value;
   let tour = tourClass.value;
   // if(keyword ==""){
   //    alert('請輸入關鍵字')
   //    return 
   // }
   axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${selectCity}?&$filter=contains(ScenicSpotName,'${keyword}')&$format=JSON`,{
        headers: getAuthorizationHeader()
   })
   .then(res=>{
      
      //  res.data.forEach(item=>{
      //     if (item.Picture.PictureUrl1 != undefined) {
      //        tourData.push(item)
      //     }
      //  })
      //  render(tourData)
      //  searchLocation.value = "";
      //  pagination(1)


         // 處理查詢不到資料
         if(res.data.length == 0){
            let str = "";
            str+= `<h2 class="fw-light">搜尋結果  共有 ${res.data.length} 筆 </h2>
            <div class="d-flex flex-column justify-content-center  align-items-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="40" cy="40" r="40" fill="#7F977B" fill-opacity="0.2"/>
               <path d="M7.53937 75.2H53.3539C55.1581 75.2 56.6263 73.7306 56.6263 71.925V55.55C56.6263 55.5282 56.6154 55.5107 56.6132 55.4889C56.7332 55.4125 56.8576 55.3404 56.9754 55.2596L74.398 72.6957C74.4985 72.8001 74.6187 72.8835 74.7517 72.9408C74.8847 72.9982 75.0278 73.0285 75.1726 73.03C75.3175 73.0315 75.4611 73.0041 75.5953 72.9494C75.7294 72.8947 75.8513 72.8138 75.9538 72.7114C76.0564 72.6091 76.1376 72.4873 76.1926 72.3532C76.2477 72.2191 76.2755 72.0754 76.2744 71.9305C76.2734 71.7855 76.2435 71.6423 76.1865 71.509C76.1295 71.3757 76.0466 71.2551 75.9426 71.1543L58.6792 53.8776C60.0958 52.5548 61.2256 50.9548 61.9983 49.1767C62.771 47.3987 63.1703 45.4806 63.1712 43.5417C63.1691 41.1592 62.5672 38.8157 61.421 36.7276C60.2748 34.6395 58.6213 32.8741 56.6132 31.5945C56.6154 31.5726 56.6263 31.5552 56.6263 31.5333V26.075C56.6263 26.0379 56.6089 26.0073 56.6067 25.9724C56.6023 25.9222 56.5892 25.8785 56.5783 25.8305C56.5441 25.6788 56.477 25.5365 56.382 25.4135C56.3667 25.3938 56.3689 25.3698 56.3536 25.3501L38.9005 5.70014C38.8939 5.69359 38.8852 5.69359 38.8787 5.68704C38.7458 5.54743 38.5777 5.44635 38.3922 5.39448C38.3507 5.38138 38.3136 5.37701 38.27 5.37046C38.2067 5.35954 38.1478 5.33334 38.0824 5.33334H7.53937C5.73515 5.33334 4.26691 6.80273 4.26691 8.60834V71.925C4.26691 73.7306 5.73515 75.2 7.53937 75.2ZM60.9896 43.5417C60.9896 50.1637 55.6053 55.55 48.9906 55.55C42.3758 55.55 36.9915 50.1637 36.9915 43.5417C36.9915 36.9196 42.3758 31.5333 48.9906 31.5333C55.6053 31.5333 60.9896 36.9196 60.9896 43.5417ZM39.1732 9.29609L53.1073 24.9833H40.264C39.784 24.9833 39.1732 24.0663 39.1732 23.3458V9.29609ZM6.44855 8.60834C6.44855 8.31882 6.56347 8.04115 6.76804 7.83642C6.97261 7.63169 7.25007 7.51668 7.53937 7.51668H36.9915V23.3458C36.9915 25.1122 38.4205 27.1667 40.264 27.1667H54.4447V30.4439C51.8095 29.3407 48.9021 29.063 46.106 29.6472C43.3099 30.2315 40.7565 31.6504 38.7827 33.7167H16.2659C15.9766 33.7167 15.6992 33.8317 15.4946 34.0364C15.29 34.2411 15.1751 34.5188 15.1751 34.8083C15.1751 35.0979 15.29 35.3755 15.4946 35.5803C15.6992 35.785 15.9766 35.9 16.2659 35.9H37.0613C35.797 37.8668 35.0427 40.118 34.8666 42.45H16.2659C15.9766 42.45 15.6992 42.565 15.4946 42.7698C15.29 42.9745 15.1751 43.2522 15.1751 43.5417C15.1751 43.8312 15.29 44.1089 15.4946 44.3136C15.6992 44.5183 15.9766 44.6333 16.2659 44.6333H34.8644C35.0416 46.9651 35.7958 49.2161 37.0592 51.1833H16.2659C15.9766 51.1833 15.6992 51.2984 15.4946 51.5031C15.29 51.7078 15.1751 51.9855 15.1751 52.275C15.1751 52.5645 15.29 52.8422 15.4946 53.0469C15.6992 53.2517 15.9766 53.3667 16.2659 53.3667H38.6278C38.6736 53.3667 38.7129 53.347 38.7587 53.3405C40.7318 55.4154 43.2882 56.8417 46.0893 57.4304C48.8904 58.0192 51.8041 57.7426 54.4447 56.6373V71.925C54.4447 72.2145 54.3298 72.4922 54.1252 72.6969C53.9206 72.9017 53.6432 73.0167 53.3539 73.0167H7.53937C6.92851 73.0167 6.44855 72.5363 6.44855 71.925V8.60834Z" fill="#7F977B"/>
               <path d="M16.2669 27.1668H29.3568C29.6461 27.1668 29.9235 27.0517 30.1281 26.847C30.3327 26.6423 30.4476 26.3646 30.4476 26.0751C30.4476 25.7856 30.3327 25.5079 30.1281 25.3032C29.9235 25.0984 29.6461 24.9834 29.3568 24.9834H16.2669C15.9776 24.9834 15.7001 25.0984 15.4956 25.3032C15.291 25.5079 15.1761 25.7856 15.1761 26.0751C15.1761 26.3646 15.291 26.6423 15.4956 26.847C15.7001 27.0517 15.9776 27.1668 16.2669 27.1668Z" fill="#7F977B"/>
               <path d="M16.2669 62.1H44.6283C44.9176 62.1 45.195 61.985 45.3996 61.7803C45.6042 61.5756 45.7191 61.2979 45.7191 61.0084C45.7191 60.7188 45.6042 60.4412 45.3996 60.2364C45.195 60.0317 44.9176 59.9167 44.6283 59.9167H16.2669C15.9776 59.9167 15.7001 60.0317 15.4956 60.2364C15.291 60.4412 15.1761 60.7188 15.1761 61.0084C15.1761 61.2979 15.291 61.5756 15.4956 61.7803C15.7001 61.985 15.9776 62.1 16.2669 62.1Z" fill="#7F977B"/>
            </svg>
            <p class="fs-3 text-primary text-center">目前查無資料 <br>  <span>請重新搜尋</span></p>
            </div>` ;
            tourCategory.innerHTML = str;
            searchLocation.value = "";
            select.value = "";                                                     
            return
        }

        if(tourData.length > 0 ){
         tourData = [];
            console.log(tourData);
            res.data.forEach(item=>{
                if(item.Picture.PictureUrl1 !== undefined){
                  tourData.push(item)
                }
            })
            searchLocation.value = "";
            select.value = "";       
            render(tourData);
            pagination(1,tourData);
        }else{
            res.data.forEach(item=>{
                if(item.Picture.PictureUrl1 !== undefined){
                  tourData.push(item)
                }
            })
            searchLocation.value = "";
            select.value = "";       
            render(tourData);
            pagination(1,tourData);
        }

    })
    .catch(error=>{
      console.dir(error);
    })
 })


function render(data){
   let str="";
   str+=`<p class="fw-lighter fs-3 fs-lg-2 letter-spacing">搜尋結果<span class="fw-light fs-6">共有${tourData.length}筆</span></p>`;
   data.forEach(item=>{
      str+=`
      <li class=" col-md-6 col-lg-3 mb-3">
         <a href="scenicSpot_page.html?id=${item.ScenicSpotID}" class="d-block">
            <div class="card border-0 mb-4 h-100 category" >
               <div class="overflow-hidden radius-20 mb-3">
                  <img src="${item.Picture.PictureUrl1}" class="img-transition h-200 w-100" alt="${item.Picture.PictureDescription1}">
               </div>
               <div class="card-body p-0">
                  <h4 class="fw-bold fs-6 fs-lg-4 text-truncate text-dark">${item.ScenicSpotName}</h4>
                  <p class="card-text fw-normal"><i class="fas fa-map-marker-alt"></i>${item.City}</p>
               </div>
            </div>
         </a>
      </li>          `
   })
   tourCategory.innerHTML = str;
}


//分頁邏輯
function pagination(nowPage){
   console.log("目前在第"+nowPage+'頁');
   console.log(tourData.length);
   
   const perpage = 20; //每頁出現20筆資料
   const pageTotal = Math.ceil(tourData.length/perpage);  //無條件進位
   console.log("總頁數:"+pageTotal); //總頁數

   const minData =  perpage*nowPage - perpage +1;
   const  maxData = perpage*nowPage;
   console.log('minData',minData,'maxData',maxData);
   
   let currentData =[];
   tourData.forEach((item,index)=>{
       if(index+1>= minData &&  index < maxData){
           currentData.push(item)
       }
   })
   console.log(currentData);
   const pageInfo ={
       pageTotal,
       nowPage,
       isFirstPage: nowPage == 1 ,
       isLastPage: nowPage == pageTotal,
   }
   console.log(pageInfo);
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
      <li class="page-item me-2 w-32 h-32">
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
           <a class="page-link" href="#" data-page="${i}">${i}</a>
       </li>`
   }else{
   str += `
      <li class="page-item me-2 w-32 h-32" aria-current="page">
         <a class="page-link fw-bold" href="#" data-page="${i}">${i}</a>
      </li>`
   }
}

//判斷是否為最後一頁
if (pageInfo.isLastPage) {
   str+=`
   <li class="page-item disabled me-2 w-32 h-32">
       <a class="page-link disabled-color" href="#">
       &raquo;
       </a>
   </li>`
}else{
   str+=`  
   <li class="page-item">
       <a class="page-link bg-primary text-white fw-bold" href="#" aria-label="Next" data-page="${Number(pageInfo.nowPage) + 1}">
           <i class="fas fa-angle-right"></i>
       </a>
   </li>
   `
}

   console.log(str)
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
