import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import BookStep1 from './Steps/BookStep1';
import BookStep2 from './Steps/BookStep2';

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

const Book = props => {
  const { id } = props;
  const classes = useStyles();

  const [currentStep, setCurrentStep] = useState(0);

  const stepList = useMemo(() => [
    <BookStep1 key={0} id={id} />,
    <BookStep2 key={1} id={id} />,
  ], [id]);

  return <Container maxWidth='md'>
    <Paper>
      <Stepper activeStep={currentStep}>
        <Step key={0}>
          <StepLabel>Select a Service</StepLabel>
        </Step>

        <Step key={1}>
          <StepLabel>Book an Appointment</StepLabel>
        </Step>

        <Step key={2}>
          <StepLabel>Drive your cleaned car</StepLabel>
        </Step>
      </Stepper>
    </Paper>

    { stepList[currentStep] }
    
    <div className={classes.buttonSet}>
      {
        currentStep > 0 && <Button
          variant='contained'
          className={classes.button}
          onClick={() => setCurrentStep(step => step - 1)}>
          Back
        </Button>
      }
      {
        currentStep < 2 && <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={() => setCurrentStep(step => step + 1)}>
          Next
        </Button>
      }
      
    </div>
    
  </Container>;
};

Book.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
};

export default connect(({ id }) => ({ id }))(Book);