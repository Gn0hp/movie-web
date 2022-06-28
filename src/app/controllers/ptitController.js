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
  "des": "Học viện Công nghệ Bưu chính Viễn thông – Cơ sở Hà Nội hỗ trợh sinh viên ký túc xá trong thời gian Hà Nội giãn cách xã hội",
  "type": "covid-19-report"
}

{
  "_id": {
    "$oid": "62a9f983a51f9ab0cdcbada6"
  },
  "img": "https://portal.ptit.edu.vn/wp-content/uploads/2021/05/thong-bao-covid.jpg",
  "href": "https://portal.ptit.edu.vn/hoc-vien-cong-nghe-buu-chinh-vien-thong-thong-bao-thuc-hien-chi-thi-17-ct-ubnd-cua-ubnd-thanh-pho-ha-noi-ve-viec-thuc-hien-gian-cach-xa-hoi-tren-dia-ban-thanh-pho/",
  "des": "Học viện Công nghệ Bưu chính Viễn thông thông báo thực hiện chỉ thị 17/CT-UBND của UBND thành phố Hà Nội về việc thực hiện giãn cách xã hội trên địa bàn Thành phố",
  "type": "covid-19-report"
}

{
  "_id": {
    "$oid": "62a9fa20a51f9ab0cdcbada7"
  },
  "img": "https://portal.ptit.edu.vn/wp-content/uploads/2021/05/thong-bao-covid.jpg",
  "href": "https://portal.ptit.edu.vn/thong-bao-ve-viec-nghiem-tuc-tang-cuong-trien-khai-cac-bien-phap-phong-chong-dich-covid-19-ap-dung-doi-voi-cac-don-vi-cua-hoc-vien-tai-khu-vuc-ha-noi/",
  "des": "Thông báo về việc nghiêm túc, tăng cường triển khai các biện pháp phòng chống dịch COVID-19 (Áp dụng đối với các đơn vị của Học viện tại khu vực Hà Nội)",
  "type": "covid-19-report"
}
*/




/* p4:
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/cau-hoi1.jpg",
    "des": "Bộ Y Tế yêu cầu tăng cường truyền thông phòng, chống bệnh viêm đường hô hấp COVID -19 như sau: CV 643",
    "link": "https://portal.ptit.edu.vn/bo-y-te-yeu-cau-tang-cuong-truyen-thong-phong-chong-benh-viem-duong-ho-hap-covid-19/",
    "type": "covid-19-p4"
  }
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/cau-hoi1.jpg",
    "des": "Bộ Y Tế khuyến cáo phòng chống bệnh COVID-19 cho người điều khiển phương tiện giao thông công cộng và phương tiện sử dụng ứng dụng […]",
    "link": "https://portal.ptit.edu.vn/khuyen-cao-cua-bo-y-te-ve-hong-chong-benh-covid-19-cho-nguoi-dieu-khien-phuong-tien-giao-thong-cong-cong-va-phuong-tien-su-dung-ung-dung-ket-noi/",
    "type": "covid-19-p4"
  }
  {
    "img": "https://portal.ptit.edu.vn/wp-content/uploads/2020/03/user-guide-e1583739961133.jpg",
    "des": "Danh mục những việc cần làm để phòng chống dịch bệnh COVID-19 trong trường học",
    "link": "https://portal.ptit.edu.vn/danh-muc-nhung-viec-can-lam-de-phong-chong-dich-benh-covid-19-trong-truong-hoc/",
    "type": "covid-19-p4"
  }

*/ 