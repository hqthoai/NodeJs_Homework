import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/posts/${id}`)
    .then((response)=>{
        console.log(response.data)
        setFormData({
            id:response.data.id,
            title: response.data.title,
            description: response.data.description,
            content: response.data.content,
          });
    })
    .catch((err)=>{
        console.log(err);
    })
  },[id])

  const [formData, setFormData] = useState({
    id:"",
    title: "",
    description:"",
    content:"",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý dữ liệu của blog ở đây, ví dụ: gửi lên máy chủ
    console.log(formData);
    //
    axios
      .post(`http://localhost:5000/posts/${id}/update?_method=PUT`, formData)
      .then((data) => {
        console.log(data);
        // Thực hiện chuyển hướng sau khi gửi thành công, nếu cần
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        variant="filled"
        fullWidth
        value={formData.title}
        onChange={handleInputChange}
        margin="normal"
        focused
      />
      <TextField
        name="description"
        label="Description"
        variant="filled"
        fullWidth
        value={formData.description}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="content"
        label="Content"
        variant="filled"
        fullWidth
        multiline
        rows={4}
        value={formData.content}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update Blog
      </Button>
    </form>
  );
}

export default Update;
