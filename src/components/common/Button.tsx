import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
    ghost: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseClasses = "inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    
    return (
        <button className={clsx(baseClasses, variantClasses[variant], className)}  {...props}>
           {children}
        </button>
    )
}