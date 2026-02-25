export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui', background: '#0B1020', color: '#F4F7FB' }}>
        {children}
      </body>
    </html>
  );
}
