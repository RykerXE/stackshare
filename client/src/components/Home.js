import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';

import ShareList from './ShareList';
import UserShareList from './UserShareList';
import RealTimeShare from './RealtimeShare';
import { logout } from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: theme.spacing(3)
  },
}));

const Header = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = props;
  const session = useSelector(state => state.user);

  const handleLogout = () => {
    history.push('/login');
    dispatch(logout());
  };

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
            Welcome {session.name}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleLogout}
          >
            LOG OUT
          </Button>
        </Grid>
      </Grid>
      <Grid
          className={classes.container}
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            sm={12}
            xs={12}
          >
            <Typography
            component="h3"
            gutterBottom
            variant="h4"
          >
            List of Shares
          </Typography>
            <ShareList/>
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            xs={12}
          >
            <Typography
            component="h3"
            gutterBottom
            variant="h4"
          >
            Your Shares
          </Typography>
            <UserShareList/>
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            xs={12}
          >
            <Typography
            component="h3"
            gutterBottom
            variant="h4"
          >
            Realtime Share Values
          </Typography>
            <RealTimeShare/>
          </Grid>
        </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default withRouter(Header);
