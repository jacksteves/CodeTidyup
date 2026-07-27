import { type PropsWithChildren } from 'react'

interface TypographyProps {
    color?: 'textPrimary' | 'textSecondary' | 'textDisabled'
    className?: string
    variant?: 'h1' | 'h2' | 'caption' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'button' | 'brand'
}

export const Typography = ({
    color = 'textPrimary',
    variant = 'body1',
    children,
    className
}: PropsWithChildren<TypographyProps>) => {
    const colors = {
        textPrimary: 'text-textPrimary',
        textSecondary: 'text-textSecondary',
        textDisabled: 'text-textDisabled'
    }

    const variants = {
        brand: 'font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight',
        h1: 'font-display text-5xl lg:text-7xl font-extrabold tracking-tight',
        h2: 'font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
        subtitle1: 'text-base font-semibold',
        subtitle2: 'text-sm font-semibold',
        body1: 'text-base',
        body2: 'text-sm',
        caption: 'text-xs text-textSecondary',
        button: 'text-sm font-semibold'
    }

    switch (variant) {
        case 'brand':
            return <p className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</p>
        case 'h1':
            return <h1 className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</h1>
        case 'h2':
            return <h1 className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</h1>
        case 'subtitle1':
            return <h3 className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</h3>
        case 'subtitle2':
            return <p className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</p>
        case 'body2':
            return <p className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</p>
        case 'caption':
            return <span className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</span>
        default:
            return <p className={`${colors[color]} ${variants[variant]} ${className}`}>{children}</p>
    }
}
