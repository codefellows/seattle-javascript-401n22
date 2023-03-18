import { useState, useEffect, ChangeEventHandler } from "react";

const useForm = <T>(
  callback: (values: T) => void,
  defaultValues: Record<string, string | number> = {}
) => {
  const [values, setValues] = useState<Record<string, string | number>>({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({ ...values } as T);
  };

  const handleChange = (event: ChangeEventHandler<HTMLInputElement>) => {
    let name: string;
    let value: string | number;
    if (typeof event === "string") {
      console.log("event from slider", event);
      // hard coded for Mantine slider functionality
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = "difficulty";
      value = event;
    } else {
      name = event.target.name;
      value = event.target.value;
    }

    if (parseInt(value as string)) {
      value = parseInt(value as string);
    }

    setValues((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
