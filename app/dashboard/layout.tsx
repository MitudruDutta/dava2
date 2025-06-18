import { AppShell } from '@/components/app-shell';
import { Providers } from '@/providers/providers';
import { ThemeProvider } from 'next-themes';
import React, { Children } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Providers>
       <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
     </Providers>
    </div>
  )
}

export default layout;