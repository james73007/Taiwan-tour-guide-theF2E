
const foodCity= document.querySelector('.foodCity');
const foodKeyword = document.querySelector('.foodKeyword');
const searchFood = document.querySelector('.searchFood');
const foodList = document.querySelector('.foodList');
const paginationList = document.querySelector('.js-pagination');

let foodData= [];

searchFood.addEventListener('click',function(e){
    let city  = foodCity.value;
    let keyword = foodKeyword.value.trim();
    if(keyword ==""){
        alert('請輸入關鍵字')
        return 
    }
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}?&$filter=contains(RestaurantName,'${keyword}')&$format=JSON`,{
        headers:getAuthorizationHeader()
    })
    .then(res=>{
        // 處理查詢不到資料
        if(res.data.length == 0){
            let str = "";
            str+= `<h3 >搜尋結果 共有 ${res.data.length} 筆 </h3>
            <div class="d-flex justify-content-center text-ceneter">
              <p class="fs-3 text-center">目前查無資料 <br>  <span>請重新搜尋</span></p>
              <img src="../img/notfound80.png">
            </div>` ;
            foodList.innerHTML = str;
            foodKeyword.value = "";
            foodCity.value = "";                                                     
            return
        }

        if(foodData.length > 0 ){
            foodData = [];
            console.log(foodData);
            res.data.forEach(item=>{
                if(item.Picture.PictureUrl1 !== undefined){
                    foodData.push(item)
                }
            })
            foodKeyword.value = "";
            renderData(foodData);
            pagination(1,foodData);
        }else{
            res.data.forEach(item=>{
                if(item.Picture.PictureUrl1 !== undefined){
                    foodData.push(item)
                }
            })
            foodKeyword.value = "";
            renderData(foodData);
            pagination(1,foodData);
        }

    })
 });



let foodFilterData =[];
//食物類別
// foodList.addEventListener('click',function(e){
//     e.preventDefault();
//     console.log(e.target.nodeName);
//     console.log(e.target.dataset.foodcategory);
    
//     if(e.target.nodeName != 'IMG'){ return };
//     axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?&format=JSON`,{
//       headers:getAuthorizationHeader()
//   })
//     .then(res=>{
//         foodData = res.data;
//         foodData.forEach(item=>{
//             if (item.Picture.PictureUrl1 !== undefined) {
//                 foodFilterData.push(item)
//              }
//         });

//         // foodFilterData = foodFilterData.sort(() => Math.random() - 0.5);

//         let category = e.target.dataset.foodcategory;
//         console.log(category);
        
//         let newData = foodData.filter(item=>{
//             if(category == item.Class){ return item }
//        })
//        console.log(newData);

//        renderData(newData)

//        pagination(1);
//     })
// })


//渲染畫面
function renderData(currentData) {
    console.log(currentData);
    
    let str="";
    str+=`<h3 >搜尋結果 共有 ${foodData.length} 筆 </h3>`;
    currentData.forEach(item=>{
        str+=`
            <div class="col-md-6 col-lg-3 mb-3 ">
                <div class="card  mb-3 h-100 border border-danger w-100" >
                    <a href="food_page.html?id=${item.RestaurantID}">
                    <div class="card-body p-0 ">
                        <div class="h-200 border border-danger w-100 overflow-hidden" >
                            <img src="${item.Picture.PictureUrl1}"  class="card-img-top  h-100" alt="${item.Picture.PictureDescription1}">
                        </div>
                        <h4 class="card-title">${item.RestaurantName}</h4> 
                        <p class="card-text"><i class="fas fa-map-marker-alt"></i>${item.City}</p>
                    </div>
                    </a>
                </div>
            </div>`
            
        })
        foodList.innerHTML = str;
}

//分頁邏輯
function pagination(nowPage){
        console.log("目前在第"+nowPage+'頁');
        // console.log(data);
        
        // console.log(data.length);
        
        const perpage = 20; //每頁出現20筆資料
        const pageTotal = Math.ceil(foodData.length/perpage);  //無條件進位   //待修改
        console.log("總頁數:"+pageTotal); //總頁數
    
        const minData =  perpage*nowPage - perpage +1;
        const  maxData = perpage*nowPage;
        console.log('minData',minData,'maxData',maxData);
        
        let currentData =[];
        foodData.forEach((item,index)=>{   //待修改
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
        renderData(currentData);
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
            </li>
           
            
            
            `
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


function init(){
    // getAllTour()
}
init()


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
    