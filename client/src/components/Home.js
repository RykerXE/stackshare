import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, Hidden, InputLabel, MenuItem, FormControl, Select, Divider } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import { startCase, get, split } from 'lodash';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Header = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={classes.root}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Home
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h2"
          >
            Welcome Rajnish
          </Typography>
          <Typography
            component="h3"
            gutterBottom
            variant="h5"
          >
            List of Shares
          </Typography>
        </Grid>

      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
