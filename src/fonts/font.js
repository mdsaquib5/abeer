import localFont from 'next/font/local'

export const cinzel = localFont({
  src: [
    {
      path: './cinzel/cinzel-v26-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './cinzel/cinzel-v26-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './cinzel/cinzel-v26-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './cinzel/cinzel-v26-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './cinzel/cinzel-v26-latin-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './cinzel/cinzel-v26-latin-900.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-cinzel',
  display: 'swap',
})

export const libreBodoni = localFont({
  src: [
    {
      path: './libre-bodoni/libre-bodoni-v9-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './libre-bodoni/libre-bodoni-v9-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './libre-bodoni/libre-bodoni-v9-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './libre-bodoni/libre-bodoni-v9-latin-700.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-libre-bodoni',
  display: 'swap',
})
