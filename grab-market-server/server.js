const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination : function(req, file, cb){
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        },
    })
});
const port = 8080;

app.use(express.json());    // json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors());    // 모든 브라우저에서 우리의 서버에 요청할 수 있음
app.use('/uploads', express.static('uploads'));     // 우리가 입력한 이미지 경로로 보여주도록 하는 명령

app.get('/banners', (req, res) => {
    models.Banner.findAll({
        limit: 2
    }).then((result) => {
        res.send({
            banners: result,
        });
    }).catch((error) => {
        console.error(error);
        res.status(500).send('에러가 발생했습니다.');
    })
})

app.get("/products", (req, res) => {
    models.Product.findAll({
        order : [['createdAt', 'DESC']],
        attributes : ['id', 'name', 'price', 'createdAt', 'seller', 'imageUrl', 'soldout']
    }).then((result)=>{
        console.log("PRODUCTS : ",result);
        res.send({
            products : result
        })
    }).catch((error)=>{
        console.error(error);
        res.status(400).send("에러 발생");
    })  
});

app.post("/products", (req, res) => {
    const body = req.body;
    const {name, description, price, seller, imageUrl} = body;
    if (!name || !description || !price || !seller || !imageUrl) {
        res.status(400).send("모든 필드를 입력해주세요");
    }
    models.Product.create({
        name,   // key와 value가 같으면 생략 가능 (원래는 name : name,)
        description,
        price,
        seller,
        imageUrl
    }).then((result)=>{
        console.log("상품 생성 결과 : ",result);
        res.send({
            result
        })
    }).catch((error)=>{
        console.error(error);
        res.status(400).send("상품 업로드에 문제가 발생했습니다");
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
        res.status(400).send("상품 조회에 에러가 발생했습니다.");
    })
})

// 파일을 하나만 보냈을 때 사용 single()
// 'image'는 상품 key
app.post('/image',upload.single('image'),(req, res) => {
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl : file.path
    })
})   

app.post("/purchase/:id",(req, res) => {
    const {id} = req.params;
    models.Product.update({
        soldout : 1
    },{
        where: {
            id
        }
    }).then((result) => {
        res.send({
            result : true,
        });
    }).catch((error) => {
        console.error(error);
        res.status(500).send("에러가 발생했습니다.");
    })
});

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