import React from 'react';
    import styles from './Input.module.css'; // Importa gli stili CSS (creeremo questo file in seguito)

    function Input({
    label,
    id,
    type,
    value,
    onChange,
    placeholder,
    ...props // Altre proprietà (es. name, required)
    }) {
    return (
    <div className={styles.inputContainer}>
    <label htmlFor={id}>{label}</label>
    <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
    />
    </div>
    );
    }

    export default Input;