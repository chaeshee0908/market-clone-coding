import {Form, Divider, Input, InputNumber, Button} from "antd";
import './index.css';

function UploadPage(){
    // lambda함수 적용
    const onSubmit = (values) => {
        console.log(values);
    }
    return (
        <div id="upload-container">
            <Form name="상품 업로드" onFinish={onSubmit}>
                <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="/images/icons/camera.png" />
                        <span>이미지를 업로드해주세요.</span>
                    </div>
                </Form.Item>
                {/* 선으로 나눠주는 용도 */}
                <Divider />
                <Form.Item
                    name="seller"
                    label={<div className="upload-label">판매자 명</div>}
                    // required : true -> 아래의 입력이 꼭 들어가야하는가
                    // message -> 입력을 안 했을 때 뜨는 메세지
                    rules={[{required: true, message: '판매자 이름을 입력해주세요'}]}
                >
                    <Input 
                        className="upload-name" 
                        size="large" 
                        placeholder="이름을 입력해주세요." 
                    />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="name"
                    label={<div className="upload-label">상품 이름</div>}
                    rules={[{required: true, message: '상품 이름을 입력해주세요'}]}
                >
                    <Input className="upload-name" size="large" placeholder="상품 정보를 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="price"
                    label={<div className="upload-label">상품 가격</div>}
                    rules={[{required: true, message: '상품 가격을 입력해 주세요.'}]}
                >
                    <InputNumber 
                        defaultValue={0}
                        className="upload-price" 
                        size="large" 
                    />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="description"
                    label={<div className="upload-label">상품 소개</div>}
                    rules={[{required: true, message: '상품 소개를 입력해주세요'}]}
                >
                    <Input.TextArea 
                        size="large" 
                        id="product-description" 
                        showCount 
                        maxLength={300}
                        placeholder="상품 소개를 적어주세요." 
                    />
                </Form.Item>
                <Form.Item>
                    {/* htmlType="submit"으로 제출 버튼이라는 것을 해줘야함 */}
                    <Button id="submit-button" size="large" htmlType="submit">
                        상품 등록
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UploadPage;