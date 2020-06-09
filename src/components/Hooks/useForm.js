import { useState } from 'react';

const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);

    const onChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    return { form, onChange };
};

export default useForm;