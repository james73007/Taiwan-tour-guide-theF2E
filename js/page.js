const select= document.querySelector('.select');
const search = document.querySelector('.search');
const searchLocation = document.querySelector('.searchLocation');
const list = document.querySelector('.list');
const tourCategory = document.querySelector('.tourCategory');
const paginationList = document.querySelector('.js-pagination');

let tourData = [];



//旅遊類別
tourCategory.addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.nodeName != 'H2 '){
       return
    }
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?&$format=JSON`,{
      headers:getAuthorizationHeader()
  })
    .then(res=>{
       tourData = res.data;
       let category = e.target.dataset.category;
       let data = tourData.filter(item=>{
         if (item.Picture.PictureUrl1 != undefined) {
            return item
         }
       })
       let str="";
       str+=`<p>搜尋結果有${data.length} 筆</p>`;

       data.forEach(item=>{
          if(category == item.Class1){
             str+=`
             <div class="card border-0 mb-3 h-100" style="width: 18rem;">
               <img src="${item.Picture.PictureUrl1}" style="height:200px"  class="card-img-top" alt="...">
               <div class="card-body">
                  <h4>${item.ScenicSpotName}</h4>
                  <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${item.Class1}</p>
               </div>
             </div>
             `
          }
       })
       tourCategory.innerHTML = str;
    })
})


 search.addEventListener('click',function(e){
    let selectCity = select.value;
    let keyword = searchLocation.value;
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${selectCity}?&$filter=contains(ScenicSpotName,'${keyword}')&$format=JSON`,{
        headers: getAuthorizationHeader()
    })
    .then(res=>{
      
       res.data.forEach(item=>{
          if (item.Picture.PictureUrl1 != undefined) {
             tourData.push(item)
          }
       })
       render(tourData)
       searchLocation.value = "";
       pagination(1)

    })
    .catch(error=>{
      console.dir(error);
    })
 })


function render(data){
   let str="";
   str+=`<p>搜尋結果有${data.length} 筆</p>`;
   data.forEach(item=>{
      str+=`
      <li class=" col-md-6 col-lg-3 mb-3">
        <div class="card mb-4 h-100 border border-danger" style="width: 18rem; ">
           <div class="overflow-hidden">
              <img src="${item.Picture.PictureUrl1}" style="height:200px"  class="card-img-top " alt="${item.Picture.PictureDescription1}">
           </div>
           <div class="card-body">
              <a  href="Attrictions.html?id=${item.ScenicSpotID}">${item.ScenicSpotName}</a>
              <p class="card-text"><i class="fas fa-map-marker-alt"></i>${item.City}</p>
           </div>
        </div>
      </li>          `
   })
   tourCategory.innerHTML = str;
}


//分頁邏輯
function pagination(nowPage){
   console.log("目前在第"+nowPage+'頁');
   
   console.log(foodData.length);
   
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
   <li class="page-item disabled">
       <a class="page-link" href="#">
           <i class="fas fa-angle-left"></i>
       </a>
   </li>`
}else{
   str += `
   <li class="page-item">
       <a class="page-link" href="#" aria-label="Previous" data-page="${Number(pageInfo.nowPage) - 1}">
       &laquo;
       </a>
   </li>`
}

 // 第 2 ~
for(let i=1; i<=totalPages; i++){
   if(Number(pageInfo.nowPage) == i){
   str += `
       <li class="page-item active" aria-current="page">
           <a class="page-link" href="#" data-page="${i}">${i}</a>
       </li>`
   }else{
   str += `
       <li class="page-item" aria-current="page">
       <a class="page-link" href="#" data-page="${i}">${i}</a>
       </li>`
   }
}

//判斷是否為最後一頁
if (pageInfo.isLastPage) {
   str+=`
   <li class="page-item disabled">
       <a class="page-link" href="#">
       &raquo;
       </a>
   </li>`
}else{
   str+=`  
   <li class="page-item">
       <a class="page-link" href="#" aria-label="Next" data-page="${Number(pageInfo.nowPage) + 1}">
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
