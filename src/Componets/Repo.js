import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Avatar,
  Box,
  ButtonBase,
  Chip,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TotalCommitChart from "./Chart/TotalCommitChart";
import AdditionDeletionChart from "./Chart/AdditionDeletionChart";
import ContributorsChart from "./Chart/ContributorsChart";
import DeletionChart from "./Chart/DetetionsChart";

const MenuOptions = ({ handleSelectChange, handleClose, open, anchorEl }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={() => {
          handleSelectChange("Commit");
          handleClose();
        }}
      >
        Commit
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleSelectChange("Aditions");
          handleClose();
        }}
      >
        Aditions
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleSelectChange("Deletions");
          handleClose();
        }}
      >
        Deletions
      </MenuItem>
    </Menu>
  );
};

const Repo = ({
  avatar_url,
  name,
  html_url,
  owner,
  description,
  stargazers_count,
  open_issues_count,
  full_name,
  created_at,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setSelectedValue("");
    setIsopen(!isOpen);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Paper
        elevation={1}
        sx={{
          marginTop: 4,
          p: 3,
          borderRadius: 5,
          ":hover": {
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          },
        }}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            <ButtonBase>
              <a
                href={` https://github.com/${owner} `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar
                  src={` ${avatar_url} `}
                  alt="Remy Sharp"
                  sx={{ width: 200, height: 200 }}
                  variant="square"
                />
              </a>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2} mt={3}>
              <Typography gutterBottom variant="h3">
                <Link
                  href={html_url}
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  {name}
                </Link>
              </Typography>
              <Typography gutterBottom variant="headline">
                {description}
              </Typography>
              <Box component="div">
                <Chip
                  label={` Stars: ${stargazers_count} `}
                  href="#chip"
                  clickable
                  variant="outlined"
                />
                <Chip
                  sx={{ ml: 2 }}
                  label={` Issues: ${open_issues_count} `}
                  clickable
                  variant="outlined"
                />
              </Box>
              <Typography color="primary" inline>
                Submitted {moment(created_at).fromNow()} By {owner}
              </Typography>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={1}
            display="flex"
            alignItems="center"
            justifyItems="flex-end"
          >
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            <MenuOptions
              handleSelectChange={handleSelectChange}
              handleClose={handleClose}
              open={open}
              anchorEl={anchorEl}
            />
          </Grid>
        </Grid>
        {selectedValue === "Commit" && (
          <TotalCommitChart fullName={full_name} />
        )}
        {selectedValue === "Aditions" && (
          <AdditionDeletionChart fullName={full_name} />
        )}
        {selectedValue === "Deletions" && (
          <DeletionChart fullName={full_name} />
        )}
        {selectedValue && <ContributorsChart fullName={full_name} />}
      </Paper>
    </div>
  );
};

Repo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Repo;
