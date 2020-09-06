/** @format */

import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input, Icon, Row, Col, Select, InputNumber } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function ProdcutAddPage() {
  const [ProductTitle, setProductTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);

  const changePriceHandler = (value) => {
    console.log(value);
    setPrice(value);
  };

  const changeQuantityHandler = (value) => {
    console.log(value);
    setQuantity(value);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Add Product</Title>
      </div>
      <Form onSubmit>
        <label htmlFor="">Title</label>
        <Input onChange value={ProductTitle} />
        <br />
        <br />
        <label htmlFor="">Description</label>
        <TextArea onChange value={Description} />
        <br />
        <br />
        <Row gutter={16}>
          <Col span={8}>
            <label htmlFor="productPrice">Price</label>
          </Col>
          <Col span={6}>
            <label htmlFor="productPrice">Quantity</label>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              id="productPrice"
              min={1000}
              step={1000}
              style={{ width: "80%" }}
              defaultValue={10000}
              formatter={(value) => `￦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\￦\s?|(,*)/g, "")}
              onChange={changePriceHandler}
            />
          </Col>
          <Col span={6}>
            <InputNumber id="productPrice" min={0} onChange={changeQuantityHandler} value={Quantity} />
          </Col>
        </Row>
        <br />
        <br />
        <Form.Item required label="Service cycle">
          <Select defaultValue="1w" style={{ width: 120 }} onChange name="serviceArea" required label="Service Area">
            <Option value="1">1 day</Option>
            <Option value="3">3 day</Option>
            <Option value="1w">1 week</Option>
            <Option value="10">10 day</Option>
            <Option value="hm">half month</Option>
            <Option value="1m">1 month</Option>
          </Select>
        </Form.Item>
        {/* <select onChange={onPrivateChange}>
                    {PrivateList.map((item, index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/><br/>
                <select onChange={onCategoryChange}>
                    {CategoryList.map((item, index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select> */}
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={10000000000}>
                        {({ getRootProps, getInputProps })=>(
                            <div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex', alignItems: 'center', justifyContent: 'center' }}{...getRootProps()}>
                                
                            <input {...getInputProps()}/>
                            <Icon type="plus" style={{ fontSize:'3rem'}}/>
                            </div>
                        )}
                    </Dropzone> */}
          {/* {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                        </div>
                    } */}
          이미지 등록
        </div>
        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProdcutAddPage;
