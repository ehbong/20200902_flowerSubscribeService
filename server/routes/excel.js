/** @format */

const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const xlsx = require("xlsx");

const { auth } = require("../middleware/auth");

//=================================
//            excel
//=================================

router.post("", (req, res) => {
  const resData = {};

  const form = new multiparty.Form({
    autoFiles: true,
  });

  form.on("file", (name, file) => {
    const workbook = xlsx.readFile(file.path);
    const sheetnames = Object.keys(workbook.Sheets);

    let i = sheetnames.length;

    while (i--) {
      const sheetname = sheetnames[i];
      resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
    }
  });

  form.on("close", () => {
    res.send(resData);
  });

  form.parse(req);
});

module.exports = router;
