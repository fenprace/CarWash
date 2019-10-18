import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import BookStep1 from './Steps/BookStep1';
import BookStep2 from './Steps/BookStep2';
import BookStep3 from './Steps/BookStep3';

const Book = props => {
  const { id } = props;

  const [currentStep, setCurrentStep] = useState(0);
  const [appointment, setAppointment] = useState({});

  const handleBack = () => {
    setCurrentStep(step => step - 1);
  };

  const handleNext = parameters => {
    setAppointment(a => ({ ...a, ...parameters }));
    setCurrentStep(step => step + 1);
  };

  const handleConfirm = () => {};

  const stepList = useMemo(() => [
    <BookStep1 key={0} id={id} onNext={handleNext} />,
    <BookStep2 key={1} id={id} onBack={handleBack} onNext={handleNext} />,
    <BookStep3
      key={2}
      id={id}
      onBack={handleBack}
      onConfirm={handleConfirm}
      appointment={appointment}
    />,
  ], [id, appointment]);

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
    
  </Container>;
};

Book.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.number,
};

export default connect(({ id }) => ({ id }))(Book);