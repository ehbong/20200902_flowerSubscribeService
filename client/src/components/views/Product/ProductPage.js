/** @format */

import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Empty, Button, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

function ProductPage(props) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // let variable = { seller: localStorage.getItem("userId") };
    axios.get(`/api/product/seller/${userId}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setProducts(res.data.product);
      } else {
        alert("상품목록 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const noData = { emptyText: <Empty /> };
  return (
    <List
      style={{ padding: "30px" }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      locale={noData}
      dataSource={Products}
      footer={
        <div>
          <Button type="primary" size={"large"}>
            <a href="/product/add">Add Prodcut</a>
          </Button>
        </div>
      }
      renderItem={(item) => (
        <React.Fragment>
          <a href={`/product/${item._id}`}>
            <Title level={3}>{item.title}</Title>
          </a>
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={<img width={272} alt="logo" src={`http://localhost:5000/${item.thumbnail}`} />}
          >
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={<a href={`http://localhost:5000/${item.href}`}>{item.seller.email}</a>} description={item.description} />
            {item.discription}
          </List.Item>
        </React.Fragment>
      )}
    />
  );
}

export default ProductPage;
