/** @format */

import React from "react";

function ExcelUpload() {
  return (
    <div>
      Excel to Json Test Page
      <form action="/api/excel" method="POST" enctype="multipart/form-data">
        <input type="file" name="xlsx" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ExcelUpload;
