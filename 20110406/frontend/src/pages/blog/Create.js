import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create () {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      const navigate = useNavigate ()
      const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý dữ liệu của blog ở đây, ví dụ: gửi lên máy chủ
        console.log(formData);

        // Gửi dữ liệu lên máy chủ Node.js
        axios.post("http://localhost:5000/posts/add", formData)
        .then((data) => {
          console.log(data);
          // Thực hiện chuyển hướng sau khi gửi thành công, nếu cần
          navigate('/');
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
            Create Blog
          </Button>
        </form>
      );
}

export default Create;