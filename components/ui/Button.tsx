import React, { type PropsWithChildren } from 'react'

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    fullWidth?: boolean
    variant?: 'default' | 'outlined' | 'text' | 'accent'
    size?: 'none' | 'small' | 'medium' | 'large'
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const Button = ({
    fullWidth = false,
    children,
    variant = 'default',
    size = 'medium',
    className = '',
    onClick,
    disabled,
    ...other
}: PropsWithChildren<ButtonProps>) => {
    const baseClasses =
        'font-medium focus:outline-none transition duration-200 ease-out whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none'
    const variantClasses = {
        default: 'bg-ink text-white hover:bg-ink/85 rounded-lg',
        accent: 'bg-accent text-white hover:bg-accent-deep rounded-lg',
        outlined: 'rounded-lg border border-ink/20 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-ink/35',
        text: 'rounded-lg text-textPrimary hover:bg-hover'
    }
    const sizeClasses = {
        none: 'text-xs',
        small: 'text-xs px-3 py-1',
        medium: 'text-sm px-3.5 py-2',
        large: 'text-base px-5 py-2.5'
    }

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
    } ${className}`

    return (
        <button type='button' className={buttonClasses} onClick={onClick} disabled={disabled} {...other}>
            {children}
        </button>
    )
}
