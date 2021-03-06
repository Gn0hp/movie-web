const cheerio = require("cheerio");   //~jquery . phan tich DOM
const req_promise= require("request-promise");
const Ptit = require("../models/Ptit");
const converter = require("../../utils/convertObject");
class PtitController {
  //:id
  async news(req, res) {
    Ptit.find({type: {$ne:"covid-19-report"}}).
      then(data=>{
        return converter.multipleToObject(data)
      })
    .then(ptitDataArr=>{
    res.render("ptit/news",{
        ptitDataArr: ptitDataArr,
    });
  })
  }
  async introductions (req,res){
    res.render("ptit/introductions");
  } 
  async education (req,res){
    res.render("ptit/education");
  } 
  async tech (req,res){
    res.render("ptit/tech");
  } 
  async cooperations (req,res){
    res.render("ptit/cooperation");
  } 
  async entrancy (req,res){
    res.redirect("https://tuyensinh.ptit.edu.vn/")      // current here
  } 
  async library (req,res){
    res.redirect("https://portal.ptit.edu.vn/tttv/");
  } 
  async emails (req,res){
    res.redirect("https://outlook.office.com/mail/");
  } 
  async covid19 (req,res){
    Ptit.find({type: 'covid-19-report'}).exec()
      .then(data=> converter.multipleToObject(data))
      .then(data=> {
        let arr = []
        let arr2 = []
        data.forEach(element => {
          if(element.type == "covid-19-report") arr=[...arr,element] 
          if(element.type == "covid-19-p4") arr2 = [...arr2,element]
        })
        
        res.render("ptit/covid19",{
          ptitDataArr: arr,
          p4: arr2
        });
      })
   
  } 

}

module.exports = new PtitController();





/// ---------------get DATA from ptit new websites--------------------------
// await req_promise(
//   "https://portal.ptit.edu.vn/category/tin-tuc/",
//   (err, response, html) => {
//     console.log(response.statusCode);
//     if (response.statusCode == 200 && !err) {
//       const $ = cheerio.load(html);
//       $(".post-item.isotope-item.clearfix.category-tin-tuc").each(
//         (idx, val) => {
//           const tmp = {
//             title: $(val).find(".entry-title").text(),
//             img: $(val).find("img").attr("src"),
//             des: $(val).find(".entry-title").text(),
//             link: $(val).find("a").attr("href"),
//           };
//           const toDB= new Ptit({
//             title: tmp.title,
//             img: tmp.img,
//             des: tmp.des,
//             link: tmp.link,
//           });
//           toDB.save();
          
//         }
//       );
//     }
//   }
// );

//  json covid 19 type addition:
/*
  {
  "_id": {
    "$oid": "62a9f798a51f9ab0cdcbada5"
  },
  "img": "https://portal.ptit.edu.vn/wp-content/uploads/2021/07/anh-bia-ho-tro-covid.jpg",
  "href": "https://portal.ptit.edu.vn/hoc-vien-cong-nghe-buu-chinh-vien-thong-co-so-ha-noi-ho-tro-sinh-vien-ky-tuc-xa-trong-thoi-gian-ha-noi-gian-cach-xa-hoi/",
  "des": "H???c vi???n C??ng ngh??? B??u ch??nh Vi???n th??ng ??? C?? s??? H?? N???i h??? tr???h sinh vi??n k?? t??c x?? trong th???i gian H?? N???i gi??n c??ch x?? h???i",
  "type": "covid-19-report"
}

{
  "_id": {
    "$oid": "62a9f983a51f9ab0cdcbada6"
  },
  "img": "https://portal.ptit.edu.vn/wp-content/uploads/2021/05/thong-bao-covid.jpg",
  "href": "https://portal.ptit.edu.vn/hoc-vien-cong-nghe-buu-chinh-vien-thong-thong-bao-thuc-hien-chi-thi-17-ct-ubnd-cua-ubnd-thanh-pho-ha-noi-ve-viec-thuc-hien-gian-cach-xa-hoi-tren-dia-ban-thanh-pho/",
  "des": "H???c vi???n C??ng ngh??? B??u ch??nh Vi???n th??ng th??ng b??o th???c hi???n ch??? th??? 17/CT-UBND c???a UBND th??nh ph??? H?? N???i v??? vi???c th???c hi???n gi??n c??ch x?? h???i tr??n ?????a b??n Th??nh ph???",
  "type": "covid-19-report"
}

{
  "_id": {
    "$oid": "62a9fa20a51f9ab0cdcbada7"
  },
  "img": "https://portal.ptit.edu.vn/wp-content/uploads/2021/05/thong-bao-covid.jpg",
  "href": "https://portal.ptit.edu.vn/thong-bao-ve-viec-nghiem-tuc-tang-cuong-trien-khai-cac-bien-phap-phong-chong-dich-covid-19-ap-dung-doi-voi-cac-don-vi-cua-hoc-vien-tai-khu-vuc-ha-noi/",
  "des": "Th??ng b??o v??? vi???c nghi??m t??c, t??ng c?????ng tri???n khai c??c bi???n ph??p ph??ng ch???ng d???ch COVID-19 (??p d???ng ?????i v???i c??c ????n v??? c???a H???c vi???n t???i khu v???c H?? N???i)",
  "type": "covid-19-report"
}
*/




/* p4:
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/cau-hoi1.jpg",
    "des": "B??? Y T??? y??u c???u t??ng c?????ng truy???n th??ng ph??ng, ch???ng b???nh vi??m ???????ng h?? h???p COVID -19 nh?? sau: CV 643",
    "link": "https://portal.ptit.edu.vn/bo-y-te-yeu-cau-tang-cuong-truyen-thong-phong-chong-benh-viem-duong-ho-hap-covid-19/",
    "type": "covid-19-p4"
  }
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/cau-hoi1.jpg",
    "des": "B??? Y T??? khuy???n c??o ph??ng ch???ng b???nh COVID-19 cho ng?????i ??i???u khi???n ph????ng ti???n giao th??ng c??ng c???ng v?? ph????ng ti???n s??? d???ng ???ng d???ng [???]",
    "link": "https://portal.ptit.edu.vn/khuyen-cao-cua-bo-y-te-ve-hong-chong-benh-covid-19-cho-nguoi-dieu-khien-phuong-tien-giao-thong-cong-cong-va-phuong-tien-su-dung-ung-dung-ket-noi/",
    "type": "covid-19-p4"
  }
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/user-guide-e1583739961133.jpg",
    "des": "Danh m???c nh???ng vi???c c???n l??m ????? ph??ng ch???ng d???ch b???nh COVID-19 trong tr?????ng h???c",
    "link": "https://portal.ptit.edu.vn/danh-muc-nhung-viec-can-lam-de-phong-chong-dich-benh-covid-19-trong-truong-hoc/",
    "type": "covid-19-p4"
  }

*/ 