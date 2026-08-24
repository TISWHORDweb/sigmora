import '../src/styles/global.css';
import '../src/styles/landing-tokens.css';
import Providers from '../src/components/Providers';

export const metadata = {
  title: 'Sigmora — Trade Signal Platform for Academy Creators',
  description:
    'Sigmora helps forex and trading educators run their academy — create and broadcast trade signals, manage packages, and grow a paid subscriber base.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
