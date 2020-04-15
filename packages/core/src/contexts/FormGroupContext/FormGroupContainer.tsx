import * as React from 'react';
import update from 'immutability-helper';

import checkFormInputError from '../../utils/checkFormInputError';
import extractEventValue from '../../utils/extractEventValue';
import { useFormContext } from '../FormContext/FormContext';
import { FormGroupContextValue } from '../../interfaces';

import { FormGroupProvider } from './FormGroupContext';

export interface FormGroupContainerProps extends React.Props<any> {
  children?: React.ReactChild;
  initialValue: any;
  multi?: boolean;
  name: string;
}

/**
 * Container for FormGroup context API.
 */
const FormGroupContainer = ({
  initialValue,
  children,
  multi,
  name,
}: FormGroupContainerProps) => {
  const form = useFormContext();

  const { value: formGroupValue } = form.getFieldProps(name);
  const formInputMeta = form.getFieldMeta(name);

  const setFormGroupValue = React.useCallback((newValue) => {
    if (form) {
      form.setFieldValue(name, newValue);
    }
  }, [
    form,
    name,
  ]);

  React.useEffect(() => {
    if (initialValue) {
      setFormGroupValue(initialValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetFormGroupValue = React.useCallback((event: any) => {
    const newValue = extractEventValue(event);

    if (!multi) {
      setFormGroupValue(newValue);
      return;
    }

    if (!Array.isArray(formGroupValue)) {
      setFormGroupValue([
        newValue,
      ]);

      return;
    }

    const valueIndex = formGroupValue.findIndex((item) => item === newValue);

    if (valueIndex !== -1) {
      setFormGroupValue(update(formGroupValue, {
        $splice: [[valueIndex, 1]],
      }));
    } else {
      setFormGroupValue(update(formGroupValue, {
        $push: [newValue],
      }));
    }
  }, [
    setFormGroupValue,
    formGroupValue,
    multi,
  ]);

  const value: FormGroupContextValue = React.useMemo(() => [
    formGroupValue,
    handleSetFormGroupValue,
    {
      error: checkFormInputError(formInputMeta),
      multi,
      name,
    },
  ], [
    handleSetFormGroupValue,
    formGroupValue,
    formInputMeta,
    multi,
    name,
  ]);

  return (
    <FormGroupProvider value={value}>
      {children}
    </FormGroupProvider>
  );
};

export default FormGroupContainer;