
const ScenicSpotList = document.querySelector('.ScenicSpotList');
const otherList = document.querySelector('.otherList');
let data= [];
let otherData= [];

function getTourItem(){
    console.log(location.href);
    
    const id = location.href.split("=")[1];
    console.log(id);
    
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?&$top=30&$format=JSON&$filter=contains(ScenicSpotID,'${id}')`,{
        headers:getAuthorizationHeader()
    })
    .then(res=>{
        console.log(res.data);
        data = res.data;
        let str="";
        data.forEach(item=>{
            str+=` 
            <img src="${item.Picture.PictureUrl1}">
            <h2>${item.ScenicSpotName}</h2>
            <p>${item.Class1}</p>
            <p>景點介紹：${item.DescriptionDetail}</p>
            <p>景點地址：${item.Address}</p>
            <p>服務電話：${item.Phone}</p>
            <p>開放時間：${item.OpenTime}</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.2456687135777!2d121.76999095091183!3d24.6840802840595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467e5d44c14d56f%3A0xf1b3cda6029631b1!2z576F5p2x5p6X5aC0!5e0!3m2!1szh-TW!2stw!4v1642083024127!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            <p>官方網站：<a> href="${item.WebsiteUrl}"></a></p>
            `
        })
        ScenicSpotList.innerHTML = str;
    })
}

//內頁顯示其他景點
function other(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON`,{
        headers:getAuthorizationHeader()
    })
    .then(res=>{
        console.log(res.data);
        otherData = res.data;
        let str="";
        otherData.forEach(item=>{
            str+=`<li>
            <img src="${item.Picture.PictureUrl1}">
            <p>${item.City}</p>
            <li> `
        })
        otherList.innerHTML = str;
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

function init(){
    getTourItem()
    other()
    console.log(location);
    
}
init()
