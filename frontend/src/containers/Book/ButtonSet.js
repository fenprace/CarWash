import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  buttonSet: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    float: 'right',
  },
  button: {
    marginRight: theme.spacing(1),
  }
}));


const StepButtonSet = props => {
  const { onClear, onConfirm } = props;
  const classes = useStyles();

  return <div className={classes.buttonSet}>
    {
      onClear && <Button
        variant='text'
        className={classes.button}
        onClick={onClear}>
        Clear
      </Button>
    }

    {
      onConfirm && <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={onConfirm}>
        Confrim
      </Button> 
    }
  </div>;
};

StepButtonSet.propTypes = {
  onClear: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default StepButtonSet;