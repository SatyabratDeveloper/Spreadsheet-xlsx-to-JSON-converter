// xlsx File to JSON File Converter

const XLSX = require("xlsx");
const fs = require("fs");

// Path to your XLSX file
const filePath = "wachete.xlsx";

// Read the XLSX file
const workbook = XLSX.readFile(filePath);

// Read the first sheet of the workbook
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Parse the data from the worksheet
const excelData = XLSX.utils.sheet_to_json(worksheet);

const finalData = {};

const finalExcelData = [];

for (let i = 0; i < excelData.length; i++) {
  let config = {
    selections: [
      {
        delay: 0,
        dynamic: true,
        frames: [
          {
            excludes: [],
            includes: [
              {
                expr: "",
                fields: [
                  {
                    name: "text",
                    type: "builtin"
                  }
                ],
                type: "xpath"
              },
              {
                expr: "",
                fields: [
                  {
                    name: "text",
                    type: "builtin"
                  }
                ],
                type: "xpath"
              }
            ],
            index:0
          }
        ]
      }
    ],
    ignoreEmptyText: true,
    includeStyle: false,
    dataAttr: 'text',
    regexp: {
      expr: '',
      flags: 'gim'
    }
  }

  config['selections'][0]['frames'][0]['includes'][0]['expr'] = excelData[i].XPath

  const data = {
    name: excelData[i].Name,
    uri: excelData[i].Url,
    config: JSON.stringify(config)
  }

  finalExcelData.push(data);
}

finalData["client"] = { local: 1 };
finalData["data"] = finalExcelData;

watchData = JSON.stringify(finalData, null, 2);

// Write the JSON data to the file
fs.writeFile("data.json", watchData, "utf-8", (err) => {
  if (err) {
    console.error("Error writing to the file:", err);
  } else {
    console.log("JSON data has been written");
  }
});
