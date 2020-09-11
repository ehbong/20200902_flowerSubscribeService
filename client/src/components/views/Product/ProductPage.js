/** @format */

import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Empty, Button } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

function ProductPage(props) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    let variable = { seller: localStorage.getItem("userId") };
    axios.get("/api/product/list", variable).then((res) => {
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
        pageSize: 3,
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
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
        >
          <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={<a href={item.href}>{item.title}</a>} description={item.description} />
          {item.content}
        </List.Item>
      )}
    />
  );
}

export default ProductPage;
