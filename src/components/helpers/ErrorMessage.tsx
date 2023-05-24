import { type FC } from 'react';
import { type FieldError } from 'react-hook-form';
import ShouldRender from './ShouldRender';

interface ErrorMessageProps {
    error?: FieldError;

}

const ErrorMessage: FC<ErrorMessageProps> = ({error}) => {
  return (
<ShouldRender if={error}>
<p className="dark:text-rose-500 text-rose-600 text-sm">{error?.message}</p>
</ShouldRender>
)
}

export default ErrorMessage