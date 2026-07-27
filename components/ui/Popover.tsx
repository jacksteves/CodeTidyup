import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react'
import DefaultTransition from '../shared/DefaultTransition'

type PopoverOptionProps = {
    sectionTitle?: string
    icon?: JSX.Element
    text: string
    onClick: (() => void) | (() => Promise<void>)
    divider?: boolean
    className?: string
}

function PopoverOption({ icon, text, onClick, className }: PopoverOptionProps) {
    return (
        <PopoverButton
            type='button'
            className={`text-left flex items-center text-textSecondary fill-textSecondary text-sm font-medium outline-none hover:text-textPrimary hover:bg-black/5 px-3 py-2 rounded-md ${
                className ? className : ''
            }`}
            onClick={onClick}>
            {icon && <span className='mr-2'>{icon}</span>}
            {text}
        </PopoverButton>
    )
}

type PopoverProps = {
    options: PopoverOptionProps[]
    buttonElement: JSX.Element
    section?: React.ReactNode
    anchor?:
        | 'left'
        | 'right'
        | 'top'
        | 'bottom'
        | 'top start'
        | 'top end'
        | 'bottom start'
        | 'bottom end'
        | 'left start'
        | 'left end'
        | 'right start'
        | 'right end'
}

export const Popover = ({ anchor, options, buttonElement }: PopoverProps) => {
    return (
        <HeadlessPopover className='relative'>
            <PopoverButton className='focus:outline-none flex'>{buttonElement}</PopoverButton>
            <DefaultTransition>
                <PopoverPanel
                    anchor={anchor}
                    className='bg-white/95 backdrop-blur-sm w-60 absolute z-10 p-1 border border-ink/10 shadow-lg shadow-ink/5 rounded-lg mt-2'>
                    <div className='flex flex-col text-left'>
                        {options.map((option, index) => (
                            <PopoverOption key={index} {...option} />
                        ))}
                    </div>
                </PopoverPanel>
            </DefaultTransition>
        </HeadlessPopover>
    )
}
