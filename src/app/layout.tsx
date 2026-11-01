import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "나의 비즈니스 대시보드",
  description: "가상 데이터로 살펴보는 매출, 고객, 프로젝트 현황",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
