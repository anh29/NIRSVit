const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Simulate a server response after uploading the file
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulated response data
    const responseData = {
      success: true,
      message: "File uploaded successfully",
    };

    return responseData;
  } catch (error) {
    throw error;
  }
};

export { uploadFile };
