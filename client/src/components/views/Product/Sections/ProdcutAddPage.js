/** @format */

import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input, Icon, Row, Col, Select, InputNumber, Upload, Modal } from "antd";
import { UserOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function ProdcutAddPage() {
  const [ProductTitle, setProductTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [FileList, setFileList] = useState([]);
  const [PreviewImage, setPreviewImage] = useState("");
  const [PreviewVisible, setPreviewVisible] = useState(false);
  const [PreviewTitle, setPreviewTitle] = useState("");

  const changePriceHandler = (value) => {
    console.log(value);
    setPrice(value);
  };

  const changeQuantityHandler = (value) => {
    console.log(value);
    setQuantity(value);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    return setFileList(fileList);
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFileupload = function (file) {
    console.log(file);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", file);

    Axios.post("/api/product/uploadfiles", formData, config).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res);
        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };
      } else {
        alert("사진 업로드를 실패했습니다.");
      }
    });
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
            <InputNumber id="productQuantity" min={0} onChange={changeQuantityHandler} value={Quantity} />
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
          <Upload action="/api/product/uploadfiles" listType="picture-card" fileList={FileList} onPreview={handlePreview} onChange={handleChange}>
            {FileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={PreviewVisible} title={PreviewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: "100%" }} src={PreviewImage} />
          </Modal>
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
