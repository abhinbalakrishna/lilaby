import './globals.css';

export const metadata = {
  title: 'Map of Wonder',
  description: 'Discover extraordinary places around the world with our interactive travel guide.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}