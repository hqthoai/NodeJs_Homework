import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Button, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import axios from "axios";
import ToastMessage from "../components/ToastMessage/ToastMessage";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));




function Home() {
  const [posts, setPost] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Sử dụng Axios để gửi yêu cầu GET đến máy chủ Node.js
    axios
      .get("http://localhost:5000/posts/all") // Thay đổi URL theo địa chỉ của máy chủ Node.js của bạn
      .then((response) => {
        // Xử lý dữ liệu trả về từ máy chủ
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRemove = (id) => {
    axios
      .post(`http://localhost:5000/posts/${id}/delete?_method=DELETE`) // Thay đổi URL theo địa chỉ của máy chủ Node.js của bạn
      .then((response) => {
        // Xử lý dữ liệu trả về từ máy chủ
        setPost(response.data);
        console.log(response.data);
        setMessage("Delete successfully!");
      })
      .catch((error) => {
        console.error(error);
      });

  }
  return (
    <>
    <ToastMessage message={message}/>
      <Link to="new-blog">
        <Button
          variant="contained"
          color="success"
          sx={{
            color: "black",
          }}
        >
          <AddCircleOutlineIcon />
          NEW BLOG
        </Button>
      </Link>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={8} columns={16} >
          { 
          posts.length > 0 ? ( posts.map((post, index) => (
            <Grid key={index} item xs={8} >
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="image" src="https://d2mk45aasx86xg.cloudfront.net/Best_React_Native_tools_206b76b4b7.webp" />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={8} sm container>
                    <Grid item xs container direction="column" spacing={1}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <Link to={`/detail/${post.id}`}>{post.title}</Link>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {post.description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Stack direction="row" spacing={2}>
                          <Button
                            sx={{ cursor: "pointer" }}
                            variant="contained"
                            color="error"
                            onClick={()=>handleRemove(post.id)}
                          >
                            Remove
                          </Button>
                          <Link to={`/edit/${post.id}`}>
                          <Button
                            sx={{ cursor: "pointer" }}
                            variant="contained"
                            color="info"
                          >
                            Edit
                          </Button>
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))) : (
            <Typography variant="h3" sx={{ 
              margin:"100px",
              textAlign:"center"
             }}>
              Nothing to show
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
