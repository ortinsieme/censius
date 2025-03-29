import React, { useState } from 'react';
    import Input from './Input';
    import SelectInput from './SelectInput';

    function CensimentoForm() {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [tipoResidenza, setTipoResidenza] = useState('residenza'); // Valore predefinito

    const residenzaOptions = [
    { value: 'residenza', label: 'Residenza' },
    { value: 'domicilio', label: 'Domicilio' },
    ];

    return (
    <form>
    <Input
    label="Nome"
    id="nome"
    type="text"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
    />
    <Input
    label="Cognome"
    id="cognome"
    type="text"
    value={cognome}
    onChange={(e) => setCognome(e.target.value)}
    />
    <SelectInput
    label="Tipo Residenza"
    id="tipoResidenza"
    value={tipoResidenza}
    onChange={(e) => setTipoResidenza(e.target.value)}
    options={residenzaOptions}
    />
    {/* Aggiungi altri campi qui */}
    </form>
    );
    }

    export default CensimentoForm;