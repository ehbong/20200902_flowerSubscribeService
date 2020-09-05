/** @format */

import React from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

function ProdcutAddPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Add Product</Title>
      </div>
      <Form onSubmit>
        <label htmlFor="">Title</label>
        <Input onChange value />
        <br />
        <br />
        <label htmlFor="">Description</label>
        <TextArea onChange value />
        <br />
        <br />
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
