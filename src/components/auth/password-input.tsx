'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { AuthInput } from './auth-input'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [show, setShow] = useState(false)

    return (
      <AuthInput
        ref={ref}
        type={show ? 'text' : 'password'}
        icon={<Lock className="h-4 w-4" />}
        rightSlot={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
