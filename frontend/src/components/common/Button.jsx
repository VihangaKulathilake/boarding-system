import React from 'react';
import { Button as ShadcnButton } from "@/components/ui/button";

const Button = ({ children, variant = 'default', className = '', ...props }) => {
    // Map Bootstrap variants to shadcn/ui variants if necessary
    const variantMap = {
        'primary': 'default',
        'success': 'default', // shadcn doesn't have success out of box, could use custom
        'danger': 'destructive',
        'outline-primary': 'outline',
    };

    const mappedVariant = variantMap[variant] || variant;

    return (
        <ShadcnButton variant={mappedVariant} className={className} {...props}>
            {children}
        </ShadcnButton>
    );
};

export default Button;
