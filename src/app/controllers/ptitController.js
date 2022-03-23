const cheerio = require("cheerio");   //~jquery . phan tich DOM
const req_promise= require("request-promise");

class PtitController {
  //:id
  async news(req, res) {
    let ptitDataArr = [];
    await req_promise(
      "https://portal.ptit.edu.vn/category/tin-tuc/",
      (err, response, html) => {
        console.log(response.statusCode);
        if (response.statusCode == 200 && !err) {
          const $ = cheerio.load(html);
          $(".post-item.isotope-item.clearfix.category-tin-tuc").each(
            (idx, val) => {
              const tmp = {
                title: $(val).find(".entry-title").text(),
                img: $(val).find("img").attr("src"),
                description: $(val).find(".entry-title").text(),
              };
              ptitDataArr = [...ptitDataArr, tmp];
            }
          );
        }
      }
    );
    console.log(ptitDataArr);
    res.render("ptit/news",{
        ptitDataArr: ptitDataArr,
    });
  }
}

module.exports = new PtitController();
