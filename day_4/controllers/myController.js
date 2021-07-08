const http = require("http");

const notFound = (request, response) => {
  response.render("notFound", { title: "404 NOT FOUND" });
};

const getApiData = (url, callback) => {
  const request = http.request(url, (response) => {
    let result = "";
    response.on("data", (chunk) => {
      result += chunk.toString();
    });
    response.on("end", () => {
      const all = JSON.parse(result);
      callback(all, false);
    });
  });
  request.on("error", (err) => {
    console.log(err);
    callback(false, "error");
  });
  request.end();
};

const getAll = (request, response) => {
  url = `http://medical.mind-techs.com/api/blog/${request.params.langId}/0/11`;
  getApiData(url, (res, err) => {
    if (err) response.send(err);
    response.render("blog", {
      port: process.env.PORT,
      langId: 1,
      data: res.data,
      title: "BLOG",
    });
  });
};
const getOne = (request, response) => {
  url = `http://medical.mind-techs.com/api/SingleBlog/${request.params.articalId}/${request.params.langId}`;
  getApiData(url, (res, err) => {
    if (err) response.send(err);
    response.render("singleBlog", {
      port: process.env.PORT,
      langId: 1,
      data: res.data[0],
      title: "SINGLE BLOG",
    });
  });
};
module.exports = {
  getAll,
  getOne,
  notFound,
};
