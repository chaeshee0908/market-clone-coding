import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import './index.css';

function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    useEffect(function(){
        axios
        .get(`https://73bea3fc-0da7-4ca2-9b82-784464fba05d.mock.pstmn.io/products/${id}`)
        .then(function(result){
            setProduct(result.data);
        })
        .catch(function(error){
            console.error(error);
        });
    },[]); 

    //  비동기 호출로 인한 오류(product에 값이 아닌 null로 존재할 때)를 막기 위함
    if(product === null){
        return <h1>상품 정보를 받고 있습니다...</h1>
    }

    return (
        <div>
            <div id="image-box">
                <img src={"/"+product.imageUrl} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createAt">2021년 8월 18일</div>
                <div id="description">{product.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;