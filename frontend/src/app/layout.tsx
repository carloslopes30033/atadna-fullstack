import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "عتادنا | Atadna - منصة B2B للتجارة بالجملة",
  description: "منصة التجارة الإلكترونية بالجملة للشرق الأوسط - B2B Wholesale Marketplace for Middle East",
  keywords: ['b2b', 'wholesale', 'عتادنا', 'تجارة بالجملة', 'شرق أوسط'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
