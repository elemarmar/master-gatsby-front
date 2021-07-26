import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if it's a number and convert it
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
