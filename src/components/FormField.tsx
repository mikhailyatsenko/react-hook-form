import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  type: string;
  error?: string | undefined;
  value?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, type, error, value }) => {
  const { register } = useFormContext();
  return (
    <>
      <label htmlFor={name}>{value ? value : name}</label>
      <input {...register(name)} type={type} name={name} value={value} />
      <p>{error}</p>
    </>
  );
};

export default FormField;
