import { useState } from 'react';

const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);

    const onChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const clearForm = () => {
        setForm(initialValues);
    };

    return { form, onChange, clearForm };
};

export default useForm;