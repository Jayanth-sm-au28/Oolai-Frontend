import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  TextInput,
  DropdownSingle,
  CheckboxList,
  RadioList,
  DatePicker
} from 'oolib';

const componentMap = {
  TextInput,
  DropdownSingle,
  CheckboxList,
  RadioList,
  DatePicker
};

const Form = () => {
  const { data, error, isLoading } = useQuery('formConfig', async () => {
    const response = await axios.get('http://localhost:5000/api/form-config');
    return response.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading form</div>;

  return (
    <form>
      {data.map((field, index) => {
        const Component = componentMap[field.comp];
        return <Component key={index} {...field.props} />;
      })}
    </form>
  );
};

export default Form;
