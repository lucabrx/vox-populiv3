"use client"
import { type FC } from 'react';

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }: ThemeProviderProps) => {
return <NextThemesProvider {...props}>{children}</NextThemesProvider>

}

export default ThemeProvider