import React, { useState } from "react";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import './Attendence.css'

const Attendance = () => {
  const sampleData = [
    { Name: "Alice", RollNo: 101, Status: "Present" },
    { Name: "Bob", RollNo: 102, Status: "Absent" },
    { Name: "Charlie", RollNo: 103, Status: "Present" },
    { Name: "David", RollNo: 104, Status: "Absent" },
    { Name: "Eva", RollNo: 105, Status: "Present" },
  ];

  const [data, setData] = useState(sampleData);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const formatChartData = () => {
    const attendanceSummary = data.reduce(
      (acc, row) => {
        acc.present += row.Status?.toLowerCase() === "present" ? 1 : 0;
        acc.absent += row.Status?.toLowerCase() === "absent" ? 1 : 0;
        return acc;
      },
      { present: 0, absent: 0 }
    );

    return [
      { name: "Present", value: attendanceSummary.present },
      { name: "Absent", value: attendanceSummary.absent },
    ];
  };

  const COLORS = ["#4CAF50", "#FF5733"];

  return (
    <div className="attendance-container">
      {/* Title and Upload Button */}
      <div className="attendance-header">
        <h1>Student Attendance Tracker</h1>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="upload-btn"
        />
      </div>

      {/* Attendance Table */}
      <div className="attendance-table">
        <h2>Attendance Data</h2>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No data uploaded. Please upload an Excel file.</p>
        )}
      </div>

      {/* Attendance Pie Chart */}
      <div className="attendance-chart">
        <h2>Attendance Summary</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={formatChartData()}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {formatChartData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Attendance;
