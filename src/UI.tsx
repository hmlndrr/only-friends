import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Button({
  href,
  variant,
  thin,
  className,
  loading,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  if (href) {
    return (
      <Link
        to={href}
        className={buttonStyles({ variant, thin }) + ' ' + className}
        {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={buttonStyles({ variant, thin, loading }) + ' ' + className}
      {...rest}
      disabled={loading || disabled}
    >
      {children}
      {loading && '...'}
    </button>
  )
}

const buttonStyles = cva(
  'box-border text-center px-6 h-10 grid place-content-center rounded-md capitalize duration-300',
  {
    variants: {
      variant: {
        normal:
          'bg-transparent text-primary-800 hover:text-primary-700 active:text-primary-900',
        primary:
          'bg-primary-800 hover:bg-primary-700 active:bg-primary-900 text-white',
        tertiary:
          'text-tertiary-500 border-2 border-tertiary-500 hover:border-tertiary-800 hover:text-tertiary-800 bg-transparent rounded-md',
      },
      thin: {
        true: 'font-medium',
        false: 'font-semibold',
      },
      loading: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'normal',
      thin: false,
      loading: false,
    },
  }
)

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  loading?: boolean
}

export function Input({ label, suffix, disabled, ...rest }: Props) {
  const id = label.toLowerCase().replace(' ', '-')
  return (
    <div className="py-2 flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-[3px] focus-within:ring-primary-800/50 duration-300 ${
          disabled ? 'cursor-not-allowed bg-gray-200' : ''
        }`}
      >
        <InputByType {...rest} suffix={suffix} disabled={disabled} />
        <div>{suffix}</div>
      </div>
    </div>
  )
}



export function Container({ className, ...rest }: ContainerProps) {
  return <div className={containerStyles() + ' ' + className} {...rest} />
}

const containerStyles = cva('px-4 md:px-20 xl:px-40 2xl:px-80')

interface ContainerProps
  extends VariantProps<typeof containerStyles>,
    React.HTMLAttributes<HTMLDivElement> {}

function InputByType({
  type,
  suffix,
  className,
  ...rest
}: Omit<Props, 'label'>) {
  if (type === 'textarea') {
    return (
      <textarea
        className={
          inputStyles({
            hasSuffix: !!suffix,
            kind: 'textarea',
            disabled: rest.disabled,
          }) +
          ' ' +
          className
        }
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    )
  }

  if (type === 'file') {
    return <FileUploadInput suffix={suffix} className={className} {...rest} />
  }

  return (
    <input
      className={
        inputStyles({ hasSuffix: !!suffix, disabled: rest.disabled }) +
        ' ' +
        className
      }
      type={type}
      {...rest}
    />
  )
}

function FileUploadInput({
  suffix,
  className,
  onChange,
  ...rest
}: Omit<Props, 'label'>) {
  const [filename, setFilename] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const name = file.name.split('.')[0]
      const extension = file.name.split('.')[1]

      if (name.length > 25) {
        setFilename(`${name.slice(0, 25)}...${extension}`)
      } else {
        setFilename(file.name)
      }
    }
    onChange?.(e)
  }

  return (
    <label
      className={
        inputStyles({ hasSuffix: !!suffix }) +
        ' ' +
        className +
        ' ' +
        'cursor-pointer'
      }
      htmlFor={rest.id}
    >
      <input type="file" className="hidden" {...rest} onChange={handleChange} />
      <span className="text-black">
        {filename ? filename : 'Choose a file'}
      </span>
    </label>
  )
}

const inputStyles = cva('focus:outline-none', {
  variants: {
    hasSuffix: {
      true: 'flex-1',
      false: 'w-full',
    },
    kind: {
      textarea: 'resize-none',
      input: '',
    },
    disabled: {
      true: 'cursor-not-allowed bg-gray-200',
      false: '',
    },
  },
  defaultVariants: {
    hasSuffix: false,
    kind: 'input',
    disabled: false,
  },
})

interface Props
  extends VariantProps<typeof inputStyles>,
    React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  suffix?: React.ReactNode
  disabled?: boolean | undefined
}