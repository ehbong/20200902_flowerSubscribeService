/** @format */

import Axios from "axios";
/** @format */

import React, { useEffect, useState } from "react";
import { Row, Col, Image, Typography, Descriptions, Button } from "antd";
const { Title } = Typography;

function ProductDetailPage(props) {
  const productId = props.match.params.productId;
  console.log(productId);
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    Axios.get(`/api/product/${productId}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setProduct(res.data.product[0]);
      } else {
        alert("상품상세정보 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  return (
    Product && (
      <React.Fragment>
        <div style={{ display: "block", maxWidth: "1200px", padding: "0 10px", margin: "20px auto 120px" }}>
          <div style={{ display: "inline-block", width: "50%", position: "relative", height: "auto", verticalAlign: "top" }}>
            <Image width={500} src={`http://localhost:5000/${Product.thumbnail}`} />
          </div>
          <div style={{ display: "inline-block", width: "calc(50% - 20px)", height: "auto", verticalAlign: "top", marginLeft: "20px" }}>
            <Title level={1}>{Product.title}</Title>
            <br />
            <Title level={3}>{`₩ ${Product.price}`}</Title>
            <br />
            <Title level={3}>{`Remaining inventory ${Product.quantity}`}</Title>
            <br />
            <Button type="primary" size={"large"}>
              SubScribe
            </Button>
          </div>
        </div>
        <div style={{ display: "block", maxWidth: "1200px", padding: "0 10px", margin: "20px auto 120px" }}>
          <Descriptions title="Product Info" bordered>
            <Descriptions.Item label="Title">{Product.title}</Descriptions.Item>
            <Descriptions.Item label="price">{Product.price}</Descriptions.Item>
            <Descriptions.Item label="delivery cycle">{`${Product.cycle} day`}</Descriptions.Item>
            <Descriptions.Item label="discription">{Product.discription}</Descriptions.Item>
          </Descriptions>
        </div>
      </React.Fragment>
    )
  );
}

export default ProductDetailPage;
