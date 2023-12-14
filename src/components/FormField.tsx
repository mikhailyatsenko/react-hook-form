import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  type: string;
  error?: string | undefined;
  value?: string;
  labelText: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  error,
  value,
  labelText,
}) => {
  const { register } = useFormContext();
  return (
    <div className="input-group">
      <label htmlFor={value ? value : name}>{labelText}</label>
      <input
        {...register(name)}
        type={type}
        name={name}
        value={value}
        id={value}
      />

      <div className="error-container">
        <p className={`error-message${error ? ' show-error' : ''}`}>
          {error && error}
        </p>
      </div>
    </div>
  );
};

export default FormField;
