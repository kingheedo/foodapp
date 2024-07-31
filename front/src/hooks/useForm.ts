import React, {useEffect, useState} from 'react';

interface IUseFormProps<T> {
  initialValue: T;
  validate?: (value: T) => Record<keyof T, string>;
}

const useForm = <T>({initialValue, validate}: IUseFormProps<T>) => {
  const [inputValues, setInputValues] = useState(initialValue);
  const [blured, setBlured] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** input 핸들러 */
  const handleInput = (name: keyof T, text: string) => {
    setInputValues({
      ...inputValues,
      [name]: text,
    });
  };

  /** blur 핸들러 */
  const handleblured = (name: keyof T) => {
    setBlured({
      ...blured,
      [name]: true,
    });
  };

  const getFormInputProps = (name: keyof T) => {
    const value = inputValues[name];
    const onChangeText = (text: string) => handleInput(name, text);
    const onBlur = () => handleblured(name);

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    if (typeof validate === 'function') {
      const newErrors = validate(inputValues);
      setErrors(newErrors);
    }
  }, [inputValues, validate]);

  return {inputValues, errors, blured, getFormInputProps};
};

export default useForm;
