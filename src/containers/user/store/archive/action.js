import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

import { RestoreRounded } from '@material-ui/icons';


export const useStyles = makeStyles(theme => ({
  float: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

function Action(props) {
  const classes = useStyles();
  return <div className={classes.float}>
    <Grid container spacing={2}>
      <Grid item>
        <Zoom in>
          <Fab
            color="primary"
            size="medium"
            onClick={props.onRestore}
          >
            <RestoreRounded />
          </Fab>
        </Zoom>
      </Grid>
    </Grid>
  </div>;
}

Action.defaultProps = {
  onRestore: () => { },
}

Action.propTypes = {
  onRestore: PropTypes.func,
}

export default Action;