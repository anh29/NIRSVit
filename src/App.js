import React, { useState } from "react";
import { Upload, Button, message, Spin, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./App.css";
import { uploadFile } from "./uploadFile";

const { Option } = Select;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  const beforeUpload = (file) => {
    const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");

    if (!isCSV) {
      message.error("Please upload a valid CSV file.");
    }

    return isCSV;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }

    if (info.file.status === "done") {
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      await uploadFile(file);
      onSuccess();
    } catch (error) {
      onError(error);
      console.error("Error uploading file:", error);
    }
  };

  const simulateModelRun = async () => {
    if (selectedModel) {
      // Simulate a model run
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        message.success(`Model "${selectedModel}" run successful.`);
      }, 2000);
    } else {
      message.error("Please select a model before running.");
    }
  };

  return (
    <div className="App">
      <h1>CSV File Upload</h1>
      <Upload
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onChange={handleChange}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          Upload CSV
        </Button>
      </Upload>

      {loading && <Spin />}

      <div style={{ marginTop: "20px" }}>
        <Select
          placeholder="Select a model"
          style={{ width: 200 }}
          onChange={handleModelChange}
        >
          <Option id="0" value="0">
            CNN
          </Option>
          <Option id="1" value="1">
            Resnet
          </Option>
          <Option id="2" value="2">
            MLP
          </Option>
          <Option id="3" value="3">
            NIRSVit
          </Option>
        </Select>

        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={simulateModelRun}
        >
          Run Model
        </Button>
      </div>
    </div>
  );
};

export default App;
