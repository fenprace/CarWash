import { useState, useRef } from 'react';

const useFields = (initialFields, constraints) => {
  const ref = useRef(null);

  if (ref.current === null) {
    const fieldList = Object.keys(initialFields);
    const constraintFieldList = Object.keys(constraints);
    const initialErrors = Object.fromEntries(fieldList.map(key => [key, false]));

    ref.current = { fieldList, constraintFieldList, initialErrors };
  }

  const { constraintFieldList, initialErrors } = ref.current;

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState(initialErrors);

  const updateField = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  const validateField = (field, instantValue) => {
    const constraint = constraints[field];
    if (!constraint) return;

    const value = instantValue === undefined
      ? fields[field]
      : instantValue;
  
    if (Array.isArray(constraint)) {
      const results = !constraint.map(c => c(value));
      if (results.some(r => r !== true)) return results;
      return true;
    } else {
      return constraint(value);
    }
  };

  const synchronizeError = (field, instantValue) => {
    setErrors({ ...errors, [field]: !validateField(field, instantValue) });
  };

  const validateAll = () => {
    const results = constraintFieldList.reduce((o, field) => {
      o[field] = !validateField(field);
      return o;
    }, {});

    setErrors(results);
  };

  const updateAndValidate = (field, value) => {
    updateField(field, value);
    synchronizeError(field, value);
  };

  const checkAll = () => !Object.values(errors).some(e => e);

  return {
    fields,
    errors,
    checkAll,
    updateField,
    updateAndValidate,
    validateField,
    synchronizeError,
    validateAll,
  };
};

export default useFields;