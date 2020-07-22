import React, { Fragment, Suspense } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

import TopBar from './TopBar';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = ({children}) => {

  const classes = useStyles();

  return (
    <Fragment>
      <TopBar />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          <TopBar />
          {children}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
