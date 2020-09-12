/** @format */

import Axios from "axios";
/** @format */

import React, { useEffect, useState } from "react";

function ProductDetailPage(props) {
  const productId = props.match.params.productId;
  console.log(productId);
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    Axios.get(`/api/product/${productId}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setProduct(res.data.product);
      } else {
        alert("상품상세정보 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  return <div>ProductDetailPage</div>;
}

export default ProductDetailPage;
