import React from 'react';
    import styles from './Input.module.css';

    function SelectInput({
    label,
    id,
    value,
    onChange,
    options,
    ...props // Altre proprietà (es. name, required)
    }) {
    return (
    <div className={styles.inputContainer}>
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={onChange} {...props}>
    {options.map((option) => (
    <option key={option.value} value={option.value}>
    {option.label}
    </option>
    ))}
    </select>
    </div>
    );
    }

    export default SelectInput;