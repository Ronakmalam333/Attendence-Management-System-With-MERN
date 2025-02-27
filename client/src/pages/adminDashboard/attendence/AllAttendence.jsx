import React, { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import './allattendence.css';

const EditableTable = ({ data, onDataUpdate }) => {
  const handleCellEdit = (rowIndex, column, value) => {
    const newData = data.map((row, index) => 
      index === rowIndex ? { ...row, [column]: value } : row
    );
    onDataUpdate(newData);
  };

  return (
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
          <tr key={`${row.RollNo}-${rowIndex}`}>
            {Object.entries(row).map(([col, val]) => (
              <td key={col}>
                {col === 'Status' ? (
                  <select
                    value={val}
                    onChange={(e) => 
                      handleCellEdit(rowIndex, col, e.target.value)
                    }
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                ) : (
                  val
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AttendanceChart = ({ data }) => {
  const chartData = useMemo(() => {
    const summary = data.reduce((acc, row) => {
      const status = row.Status?.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return ['present', 'absent', 'late'].map(status => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: summary[status] || 0,
      color: status === 'present' ? '#4CAF50' : 
             status === 'absent' ? '#FF5733' : '#FFC300'
    }));
  }, [data]);

  return (
    <PieChart width={500} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, percent }) => 
          `${name}: ${(percent * 100).toFixed(1)}%`
        }
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        formatter={(value, entry) => (
          <span style={{ color: entry.color }}>{value}</span>
        )}
      />
    </PieChart>
  );
};

const AllAttendence = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleData = useMemo(() => [
    { Name: "Alice", RollNo: 101, Status: "Present" },
    { Name: "Bob", RollNo: 102, Status: "Absent" },
    { Name: "Charlie", RollNo: 103, Status: "Present" },
    { Name: "David", RollNo: 104, Status: "Late" },
    { Name: "Eva", RollNo: 105, Status: "Present" },
  ], []);

  useEffect(() => {
    setData(sampleData);
  }, [sampleData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        
        if (!workbook.SheetNames.length) {
          throw new Error('No sheets found in the file');
        }
        
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        
        const requiredColumns = ['Name', 'RollNo', 'Status'];
        if (!parsedData.length || !requiredColumns.every(col => parsedData[0][col])) {
          throw new Error('File must contain Name, RollNo, and Status columns');
        }

        setData(parsedData);
      } catch (error) {
        console.error('Error processing file:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "attendance.xlsx");
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>Student Attendance Tracker</h1>
        
        <div className="file-controls">
          <label className={`upload-btn ${loading ? 'loading' : ''}`}>
            {loading ? 'Processing...' : 'Upload Excel'}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              disabled={loading}
              hidden
            />
          </label>
          <button 
            onClick={handleExport}
            disabled={data.length === 0}
            className="export-btn"
          >
            Export to Excel
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="data-section">
        <div className="attendance-table">
          <h2>Attendance Records</h2>
          {data.length > 0 ? (
            <EditableTable data={data} onDataUpdate={setData} />
          ) : (
            <p className="no-data">No attendance data available</p>
          )}
        </div>

        <div className="attendance-chart">
          <h2>Attendance Distribution</h2>
          <AttendanceChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default AllAttendence;