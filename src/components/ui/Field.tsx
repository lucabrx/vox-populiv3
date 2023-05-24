
import { type FC } from 'react';
import { type FieldError } from 'react-hook-form';
import ErrorMessage from '../helpers/ErrorMessage';

interface FieldProps {
    children: React.ReactNode;
    error?: FieldError;
}

const Field: FC<FieldProps> = ({error, children}) => {
  return (
    <div className="w-full flex flex-col gap-2">
    <ErrorMessage error={error} />
    {children}
  </div>
)
}

export default Field