/** @format */

import Axios from "axios";
/** @format */

import React, { useEffect, useState } from "react";
import GridCards from "./../commons/GridCards";
import { BASE_URL } from "./../../Config";
import MainImage from "./../commons/MainImage";
import { Row } from "antd";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [MainProduct, setMainProduct] = useState(null);

  useEffect(() => {
    Axios.get("/api/product").then((res) => {
      if (res.data.success) {
        setProducts(res.data.product);
        setMainProduct(res.data.product[0]);
      } else {
        alert("상품 리스트 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  const gridcards = Products.map((obj, idx) => {
    return <GridCards key={idx} productId={obj._id} productName={obj.title} image={obj.thumbnail ? `${BASE_URL}${obj.thumbnail}` : null} />;
  });

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main image */}
      {MainProduct && <MainImage image={`${BASE_URL}${MainProduct.thumbnail}`} title={MainProduct.title} text={MainProduct.discription} />}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Product List</h2>
        <hr />
        {Products && <Row gutter={[16, 16]}>{gridcards}</Row>}
        {/* Movie Grid Cards */}
      </div>

      {/* <div style={{ display: "none", justifyContent: "center" }}>
        <button ref={buttonRef} onClick={loadMoreItems}>
          Load More
        </button>
      </div> */}
    </div>
  );
}

export default LandingPage;
