import React from 'react';

import { useFormContext } from '../../contexts/FormContext/FormContext';

export interface ValidatedFormInputProps {
  component: React.ElementType;
  name: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  children?: React.ReactChild;
  onBlur?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * Input that auto-validates itself within the form.
 *
 * Can be ovewritten with the "component" prop,
 * allowing you to render any type of component
 * while still maintaining all validation functionality.
 *
 * You need to pass in "name" (name of the field on the form)
 * in order to correctly render and use this component.
 * @param param0 Options.
 */
const ValidatedFormInput = ({
  component: Component,
  type = 'text',
  children,
  onChange,
  onBlur,
  name,
  ...props
}: ValidatedFormInputProps) => {
  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  const form = useFormContext();

  if (!form) {
    throw new Error('You need to provide a <Form /> component enclosing ValidatedFormInput.');
  }

  const { value, defaultValue } = props;

  const [
    formInputProps,
    inputMetadata,
  ] = form.getFieldProps(name, type);

  formInputProps.type = type;

  const isUntouched = (
    (value || defaultValue)
    && !inputMetadata.touch
    && !inputMetadata.initialValue
  );

  const inputProps = {
    ...props,
    ...formInputProps,
    danger: inputMetadata.touch && inputMetadata.error,
    onChange: (event: any) => {
      const {
        target: {
          value: newValue,
        },
      } = event;

      form.setFieldValue(name, newValue);
      form.setFieldTouched(name, true);

      if (onChange) {
        onChange(event);
      }
    },
    onBlur: (event: any) => {
      if (formInputProps.onBlur) {
        formInputProps.onBlur(event);
      }

      if (onBlur) {
        onBlur(event);
      }
    },
  };

  if (isUntouched) {
    form.setFieldValue(name, value || defaultValue);
    form.setFieldTouched(name, true);

    inputProps.defaultValue = undefined;
  }

  return (
    <Component {...inputProps}>
      {children}
    </Component>
  );
};

export default ValidatedFormInput;
