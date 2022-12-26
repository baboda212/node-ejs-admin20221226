/* 클라이언트가 요청하는 것에 대한 응답기능만 하는 곳임. 여기에 개인 자바스크립트 넣지 마!!! */
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

let products = [];//db저장할 변수

//파일 불러오기
const readfile = fs.readFileSync('db.json', 'utf-8'); 
const jsonData = JSON.parse(readfile); // 코드변환
//console.log(jsonData); 확인용
products = [...jsonData];
console.log(jsonData);


//ejs 를  view엔진으로 설정하기
app.set('view engine', 'ejs');
//정적파일 경로 지정(외부css파일 불러오기)
//index.ejs가 html로 변환되어 구동되는 폴더는 public 폴더임
app.use(express.static("public"));

//home 라우팅
app.get('/', function(요청, 응답){
    응답.render('pages/index.ejs')
})

//about 라우팅
app.get('/about', function(req, res){
    res.render('pages/about.ejs');
})

//product라우팅
app.get('/product', function(req, res){
    res.render('pages/product.ejs', {products});
})

//admin 라우팅
app.get('/admin', function(req, res){
    res.render('pages/admin.ejs',{
        title:"관리자 페이지"
    });
})


const port = 3001;
app.listen(port,() =>{
    console.log(`sever running at ${port}`);
});