'use client'

import { useState, useEffect } from 'react'
import prettier from 'prettier/standalone'
import flow from 'prettier/plugins/flow'
import esTree from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import ts from 'prettier/plugins/typescript'
import domtoimage from 'dom-to-image'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import { AppIcon } from '@/components/icons'
import { ArrowSwitchIcon, DownloadIcon, KebabHorizontalIcon, TrashIcon } from '@primer/octicons-react'
import { CodeEditor } from '@/components/shared/CodeEditor'

const SAMPLE_CODE = `import React, { useState } from 'react'

export function EasterEgg() {
    const [isClicked, setIsClicked] = useState(false)

    function handleButtonClick() {
    setIsClicked(!isClicked)
    }

    return (
    <div className="text-center p-12">
        <p className="text-2xl my-5 text-green-600">{isClicked ? 'Secret mode!' : 'Click to unlock the secret.'}</p>
        <button onClick={handleButtonClick} className="px-6 py-3 text-lg bg-steelblue text-white rounded">
        {isClicked ? 'Deactivate' : 'Activate'}
        </button>
    </div>
    )
}`

const THEMES = [
    {
        id: 'tide',
        label: 'Tide',
        className: 'bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400'
    },
    {
        id: 'ember',
        label: 'Ember',
        className: 'bg-gradient-to-br from-orange-300 via-amber-300 to-rose-300'
    },
    {
        id: 'moss',
        label: 'Moss',
        className: 'bg-gradient-to-br from-lime-300 via-emerald-300 to-teal-400'
    },
    {
        id: 'ink',
        label: 'Ink',
        className: 'bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-900'
    },
    {
        id: 'dawn',
        label: 'Dawn',
        className: 'bg-gradient-to-br from-rose-200 via-orange-200 to-amber-200'
    }
] as const

type ThemeId = (typeof THEMES)[number]['id']

export default function Home() {
    const [code, setCode] = useState(SAMPLE_CODE)
    const [compareCode, setCompareCode] = useState('')
    const [compareMode, setCompareMode] = useState(false)
    const [themeId, setThemeId] = useState<ThemeId>('tide')
    const [isFormatting, setIsFormatting] = useState(false)

    const activeTheme = THEMES.find((theme) => theme.id === themeId) ?? THEMES[0]

    useEffect(() => {
        handleFormat()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormat = async () => {
        setIsFormatting(true)
        try {
            const formatCode = async (source: string) => {
                if (!source.trim()) return source

                let formattedCode
                try {
                    formattedCode = await prettier.format(source, {
                        parser: 'flow',
                        plugins: [flow, esTree, html, ts],
                        trailingComma: 'none',
                        printWidth: 120,
                        tabWidth: 2,
                        singleQuote: true,
                        bracketSameLine: true,
                        semi: false
                    })
                } catch {
                    formattedCode = await prettier.format(source, {
                        parser: 'typescript',
                        plugins: [ts, esTree],
                        trailingComma: 'none',
                        printWidth: 120,
                        tabWidth: 2,
                        singleQuote: true,
                        bracketSameLine: true,
                        semi: false
                    })
                }
                return formattedCode
            }

            const formattedCode = await formatCode(code)
            const formattedCompareCode = await formatCode(compareCode)

            setCode(formattedCode)
            setCompareCode(formattedCompareCode)
        } catch (error) {
            alert(`Error formatting code: ${error}`)
            console.error('Error formatting code:', error)
        } finally {
            setIsFormatting(false)
        }
    }

    const handleExport = async () => {
        const screenshotDiv = document.querySelector('.screenshot') as HTMLElement
        if (screenshotDiv) {
            domtoimage
                .toPng(screenshotDiv)
                .then((dataUrl: string) => {
                    const link = document.createElement('a')
                    link.href = dataUrl
                    link.download = 'code_screenshot.png'
                    link.click()
                })
                .catch((error: Error) => {
                    console.error('Error capturing screenshot:', error)
                })
        }
    }

    return (
        <div className='page-atmosphere min-h-screen'>
            <div className='mx-auto max-w-5xl px-4 sm:px-6 md:px-10 pt-10 sm:pt-16 lg:pt-20 pb-8'>
                <header className='flex flex-col items-center text-center gap-y-4 mb-10 sm:mb-12'>
                    <Typography variant='brand' className='animate-rise text-ink'>
                        CodeTidyup
                    </Typography>
                    <h1 className='animate-rise-delay font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink/90'>
                        Format. Frame. Share.
                    </h1>
                    <p className='animate-rise-delay-2 text-base sm:text-lg max-w-md text-textSecondary text-balance'>
                        Paste messy code, tidy it instantly, and export a share-ready image.
                    </p>
                </header>

                <div className='animate-canvas flex flex-col gap-y-4'>
                    <div className='flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <Button
                                variant='accent'
                                className='items-center flex'
                                onClick={handleFormat}
                                disabled={isFormatting}>
                                {isFormatting ? 'Formatting…' : 'Format Code'}
                            </Button>
                            <Popover
                                anchor='bottom start'
                                buttonElement={
                                    <div className='p-1.5 border border-ink/15 bg-white/50 hover:bg-white transition flex items-center justify-center h-9 w-9 rounded-lg'>
                                        <KebabHorizontalIcon className='w-4 h-4 fill-ink' />
                                    </div>
                                }
                                options={[
                                    {
                                        icon: <ArrowSwitchIcon className='size-4' />,
                                        text: `${compareMode ? 'Switch to standard mode' : 'Switch to compare mode'}`,
                                        onClick: () => {
                                            setCompareMode(!compareMode)
                                        }
                                    },
                                    {
                                        icon: <TrashIcon className='size-4' />,
                                        text: 'Clear code',
                                        onClick: () => {
                                            setCode('')
                                            setCompareCode('')
                                        }
                                    }
                                ]}
                            />
                            <div
                                className='flex items-center gap-1.5 pl-1 sm:pl-2'
                                role='radiogroup'
                                aria-label='Background theme'>
                                {THEMES.map((theme) => {
                                    const selected = theme.id === themeId
                                    return (
                                        <button
                                            key={theme.id}
                                            type='button'
                                            role='radio'
                                            aria-checked={selected}
                                            aria-label={theme.label}
                                            title={theme.label}
                                            onClick={() => setThemeId(theme.id)}
                                            className={`theme-swatch size-7 rounded-md ${theme.className} transition duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                                                selected
                                                    ? 'ring-2 ring-ink ring-offset-2 ring-offset-mist scale-110'
                                                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                                            }`}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <Button className='items-center flex gap-x-2 self-start sm:self-auto' onClick={handleExport}>
                            <DownloadIcon className='w-4 h-4 fill-white' />
                            Export
                        </Button>
                    </div>

                    <div className={`screenshot code-frame p-6 sm:p-10 rounded-2xl ${activeTheme.className}`}>
                        <div className='code-chrome flex flex-col pb-3 bg-[#0d1117] rounded-xl min-h-24 overflow-hidden'>
                            <div className='flex items-center justify-between px-4 py-3'>
                                <div className='flex gap-x-1.5'>
                                    <div className='size-3 rounded-full bg-[#ff5f57]' />
                                    <div className='size-3 rounded-full bg-[#febc2e]' />
                                    <div className='size-3 rounded-full bg-[#28c840]' />
                                </div>
                                <input
                                    className='text-white/45 bg-transparent text-sm focus:outline-none text-center placeholder:text-white/30 w-40 sm:w-56'
                                    type='text'
                                    placeholder='untitled.tsx'
                                    aria-label='Snippet title'
                                />
                                <div className='w-12' />
                            </div>
                            <div className='flex gap-x-2 px-3'>
                                <CodeEditor code={code} setCode={setCode} />
                                {compareMode && <CodeEditor code={compareCode} setCode={setCompareCode} />}
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-x-2.5 pt-2 pb-16'>
                        <AppIcon className='w-auto h-3 fill-ink/70' />
                        <Typography variant='body2' color='textSecondary'>
                            Created by{' '}
                            <a
                                href='https://x.com/jackstevensdev'
                                target='_blank'
                                rel='noreferrer'
                                className='text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-accent'>
                                Jack Stevens
                            </a>{' '}
                            and open sourced on{' '}
                            <a
                                href='https://github.com/JStevens127/CodeTidyup'
                                target='_blank'
                                rel='noreferrer'
                                className='text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-accent'>
                                Github
                            </a>
                            {'.'}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
