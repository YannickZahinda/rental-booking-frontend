import { Input } from "../ui/input";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type = "text", placeholder, value, onChange, min }) => (
  <div>
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} min={min} />
  </div>
);

export default InputField;
