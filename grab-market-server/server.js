const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models');
const port = 8080;

app.use(express.json());    // json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors());    // 모든 브라우저에서 우리의 서버에 요청할 수 있음

app.get("/products", (req, res) => {
    models.Product.findAll({
        order : [['createdAt', 'DESC']],
        attributes : ['id', 'name', 'price', 'createdAt', 'seller']
    }).then((result)=>{
        console.log("PRODUCTS : ",result);
        res.send({
            products : result
        })
    }).catch((error)=>{
        console.error(error);
        res.send("에러 발생");
    })  
});

app.post("/products", (req, res) => {
    const body = req.body;
    const {name, description, price, seller} = body;
    models.Product.create({
        name,   // key와 value가 같으면 생략 가능 (원래는 name : name,)
        description,
        price,
        seller
    }).then((result)=>{
        console.log("상품 생성 결과 : ",result);
        res.send({
            result
        })
    }).catch((error)=>{
        console.error(error);
        res.send("상품 업로드에 문제가 발생했습니다");
    })
});

app.get("/products/:id", (req, res) => {
    const params = req.params;
    const {id} = params;    // ES6 Destructuring
    models.Product.findOne({
        where :{
            id : id
        }
    }).then((result)=>{
        console.log("PRODUCT : ",result);
        res.send({
            product : result
        })
    }).catch((error)=>{
        console.error(error);
        res.send("상품 조회에 에러가 발생했습니다.");
    })
})

app.listen(port, () => {
    console.log('그랩의 쇼핑몰 서버가 돌아가고 있습니다');
    models.sequelize.sync().then(()=>{
        console.log('DB 연결 성공!');
    }).catch((err)=>{
        console.error(err);
        console.log('DB 연결 에러ㅠ');
        process.exit();
    })
})