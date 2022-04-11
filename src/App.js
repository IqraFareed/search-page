import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  FormControl,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import data from "./data.json";
const useStyles = makeStyles({
  root: {
    padding: "0 10px",
  },
  nav: {
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: "10px",
    borderColor: "#D3D3D3",
  },

  button: {
    color: "#D3D3D3",
    border: "1px solid #D3D3D3",
  },
  judgmentContainer: {
    padding: "20px",
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  const [openDetail, setOpenDetail] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const open = Boolean(anchorEl);
  const handleDetail = (m, index) => {
    setCurrentIndex(index);

    setOpenDetail(!openDetail);
  };
  const handleOpen = () => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleAscend = () => {
    const asc = data.sort(function (a, b) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
    setSortedData(asc);
  };
  const handleDesc = () => {
    const desc = data.reverse();
    setSortedData(desc);
  };
  useEffect(() => {
    setSortedData(data);
  });
  return (
    <Box className={classes.root}>
      <Box className={classes.nav}>
        <MenuIcon />
      </Box>
      <Box display={"flex"} mt="10px">
        <FormControl fullWidth>
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box className={classes.judgmentContainer}>
        <Typography>JUDGEMENTS</Typography>
      </Box>
      <Box display={"flex"} width={"100%"}>
        <Box mr={10} width={"20%"}>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpen}
          >
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              horizontal: "left",
            }}
            transformOrigin={{
              horizontal: "left",
            }}
            style={{ top: "200px" }}
          >
            <MenuItem onClick={handleAscend}>Ascend</MenuItem>
            <MenuItem onClick={handleDesc}>Descend</MenuItem>
          </Menu>
        </Box>

        <Box width={"100%"}>
          {sortedData
            .filter((val) => {
              if (searchItem === "") {
                return val;
              } else if (
                val.caseAuthor
                  .toLowerCase()
                  .includes(searchItem.toLowerCase()) ||
                val.caseTitle
                  .toLowerCase()
                  .includes(searchItem.toLowerCase()) ||
                val.id.toString().includes(searchItem)
              ) {
                return val;
              }
            })

            .map((m, index) => (
              <Box display={"flex"} justifyContent="space-between" pb={"10px"}>
                <Box display={"grid"}>
                  {openDetail && index === currentIndex && (
                    <Box>
                      <Typography>{m.caseTitle}</Typography>
                    </Box>
                  )}
                  <Typography>{`Id :${m.id}`}</Typography>
                  <Typography>{m.caseAuthor}</Typography>
                </Box>

                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleDetail(m, index)}
                >
                  Detail
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
