const cheerio = require("cheerio");   //~jquery . phan tich DOM
const req_promise= require("request-promise");
const Ptit = require("../models/Ptit");
const converter = require("../../utils/convertObject");
class PtitController {
  //:id
  async news(req, res) {
    Ptit.find({}).
      then(data=>{
        return converter.multipleToObject(data)
      })
    .then(ptitDataArr=>{
    console.log(ptitDataArr);
    res.render("ptit/news",{
        ptitDataArr: ptitDataArr,
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