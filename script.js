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

for (let i = 0; i < excelData.length; i++) {
  if (excelData[i].hasOwnProperty("Folder")) {
    excelData[i].tags = [excelData[i].Folder];
    delete excelData[i].Folder;
  }

  if (excelData[i].hasOwnProperty("Interval (min)")) {
    excelData[i].Interval = excelData[i]["Interval (min)"];
    delete excelData[i]["Interval (min)"];
  }
}

finalData["client"] = { local: 1 };
finalData["data"] = excelData;

watchData = JSON.stringify(finalData, null, 2);

// Write the JSON data to the file
fs.writeFile("data.json", watchData, "utf-8", (err) => {
  if (err) {
    console.error("Error writing to the file:", err);
  } else {
    console.log("JSON data has been written");
  }
});
