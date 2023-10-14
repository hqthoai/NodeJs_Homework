import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [formData, setFormData] = useState({
    comment: "",
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

    // Gửi dữ liệu lên máy chủ Node.js
    axios
      .post(`http://localhost:5000/posts/${id}/comment`, formData)
      .then((data) => {
        console.log(data.data);
        setPost(data.data);
        setFormData({ ...formData, comment: "" });
        // Thực hiện chuyển hướng sau khi gửi thành công, nếu cần
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Sử dụng Axios để gửi yêu cầu GET đến máy chủ Node.js
    axios
      .get(`http://localhost:5000/posts/${id}`) // Thay đổi URL theo địa chỉ của máy chủ Node.js của bạn
      .then((response) => {
        // Xử lý dữ liệu trả về từ máy chủ
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="blog-detail">
      <Card sx={{ maxWidth: 800, margin: "20px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
        />
        <CardMedia
          component="img"
          height="194"
          image="https://d2mk45aasx86xg.cloudfront.net/Best_React_Native_tools_206b76b4b7.webp"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.content}</Typography>
          </CardContent>
        </Collapse>
      </Card>

      <Box sx={{ marginLeft:10  }}>
        <Typography variant="h4" component="p">
          Comments
        </Typography>
        {post.comments ? (post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <StyledPaper key={index}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar>W</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography>{comment}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          ))
        ) : (
          <Typography>No comment here!</Typography>
        )):""}
      </Box>

      <div className="leave-comment">
        <form onSubmit={handleSubmit}>
          <TextField
            name="comment"
            label="Comment điiiiiiii"
            variant="filled"
            fullWidth
            multiline
            value={formData.comment}
            onChange={handleInputChange}
            margin="normal"
            sx={{ maxWidth: 625, marginLeft: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              margin: 4,
            }}
          >
            Send Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Detail;
