import { HTMLAttributes, ReactNode } from "react";

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({ children, className = "" }: CardSectionProps) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }: CardSectionProps) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const CardDescription = ({
  children,
  className = "",
}: CardSectionProps) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = "" }: CardSectionProps) => {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }: CardSectionProps) => {
  return (
    <div className={`px-4 py-3 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};
