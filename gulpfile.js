const { series, src, dest } = require("gulp");
const cheerio = require("cheerio");
const rimraf = require("rimraf");
const fs = require("fs");
const { exec } = require("child_process");

function build(cb) {
  exec("npm run build", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function dist(done) {
  //remove old dist files from laravel public folder
  //gulp.src('./../server/public/client', {read: false}).pipe(clean({force: true}));
  rimraf.sync("./../quickloan/public/client");

  //copy dist folder into laravel public folder
  src(["./build/**/*", "!./build/index.html"]).pipe(
    dest("./../quickloan/public/client")
  );

  const $ = cheerio.load(fs.readFileSync("./build/index.html", "utf8"));

  $("head")
    .children()
    .map((i, el) => {
      console.log()
      if ($(el).attr("src")?.includes("static/js")) {
        return $(el).attr("src", `client${$(el).attr("src")}`);
      } else if($(el).attr("href")?.includes("static/css") || $(el).attr("rel") === "icon" || $(el).attr("rel") === "manifest") {
        return $(el).attr("href", `client${$(el).attr("href")}`)
      }
      return $(el);
    });


  const laravelViewPath = './../quickloan/resources/views/welcome.blade.php';

  fs.writeFileSync(laravelViewPath, $.html(), 'utf8');
  done();
}

exports.dist = dist;
exports.default = series(build, dist);
