"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const sales = [
  { month: "6월", revenue: 1680 }, { month: "7월", revenue: 2150 },
  { month: "8월", revenue: 1920 }, { month: "9월", revenue: 2780 },
  { month: "10월", revenue: 2540 }, { month: "11월", revenue: 3240 },
];
const metrics = [
  { label: "총 매출", value: "32,400,000", unit: "원", change: "+12%", icon: "₩", color: "purple" },
  { label: "신규 고객 수", value: "128", unit: "명", change: "+8%", icon: "◉", color: "blue" },
  { label: "진행 중 프로젝트", value: "24", unit: "개", change: "+20%", icon: "▤", color: "orange" },
  { label: "완료율", value: "92", unit: "%", change: "+5%", icon: "✓", color: "green" },
];
const orders = [
  { id: "ORD-008", name: "가상고객 햇살", amount: 450000, status: "완료", date: "2026-11-01" },
  { id: "ORD-007", name: "가상고객 바다", amount: 128000, status: "진행중", date: "2026-11-01" },
  { id: "ORD-006", name: "가상고객 구름", amount: 890000, status: "완료", date: "2026-10-31" },
  { id: "ORD-005", name: "가상고객 나무", amount: 245000, status: "완료", date: "2026-10-30" },
  { id: "ORD-004", name: "가상고객 별빛", amount: 67000, status: "취소", date: "2026-10-29" },
  { id: "ORD-003", name: "가상고객 노을", amount: 520000, status: "진행중", date: "2026-10-28" },
  { id: "ORD-002", name: "가상고객 달빛", amount: 320000, status: "완료", date: "2026-10-27" },
  { id: "ORD-001", name: "가상고객 봄봄", amount: 175000, status: "완료", date: "2026-10-26" },
];
const won = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function Dashboard() {
  const [today, setToday] = useState("");
  useEffect(() => {
    const update = () => setToday(new Intl.DateTimeFormat("ko-KR", {
      year: "numeric", month: "long", day: "numeric", weekday: "long",
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    window.addEventListener("focus", update);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="topbar" aria-label="서비스 안내">
        <div className="brand"><span className="brand-icon" aria-hidden="true">▦</span> 나의 비즈니스</div>
        <span className="demo-label"><span /> 연습용 대시보드</span>
      </nav>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <header className="page-header">
          <div><p className="eyebrow">한눈에 보는 우리 비즈니스</p><h1>비즈니스 대시보드</h1><p className="subtitle">오늘의 성과와 비즈니스의 흐름을 확인하세요.</p></div>
          <time className="today">{today || "오늘 날짜 확인 중…"}</time>
        </header>
        <section aria-label="핵심 요약" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => <article key={metric.label} className="panel metric">
            <div className="metric-top"><h2>{metric.label}</h2><span className={`metric-icon ${metric.color}`} aria-hidden="true">{metric.icon}</span></div>
            <p className="metric-value">{metric.value}<span>{metric.unit}</span></p>
            <p className="metric-change"><strong>{metric.change}</strong><span>전월 대비</span></p>
          </article>)}
        </section>
        <section className="panel chart-panel" aria-labelledby="sales-heading">
          <div className="section-header"><div><h2 id="sales-heading">월별 매출 추이</h2><p>최근 6개월의 성장 기록</p></div><span className="period">2026년 6월 ~ 11월 · 가상 데이터</span></div>
          <div className="chart" role="img" aria-label="6월 1680만원, 7월 2150만원, 8월 1920만원, 9월 2780만원, 10월 2540만원, 11월 3240만원의 월별 매출 추이">
            {today ? <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={sales} margin={{ top: 20, right: 12, left: 0, bottom: 0 }}>
                <defs><linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7762df" stopOpacity={0.24} /><stop offset="100%" stopColor="#7762df" stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="#eeedf4" strokeDasharray="4 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#77758a", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#77758a", fontSize: 11 }} width={62} tickFormatter={(value: number) => `${won(value)}만`} />
                <Tooltip formatter={(value) => [`${won(Number(value))}만 원`, "매출"]} contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
                <Area type="monotone" dataKey="revenue" name="매출" stroke="#7762df" strokeWidth={3} fill="url(#sales-fill)" dot={{ r: 4, fill: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer> : <p className="chart-loading">매출 차트를 준비하고 있어요…</p>}
          </div>
        </section>
        <section className="panel orders-panel" aria-labelledby="orders-heading">
          <div className="section-header"><div><h2 id="orders-heading">최근 주문</h2><p>최근 접수된 주문 현황을 확인하세요.</p></div><span className="order-count">총 8건</span></div>
          <div className="table-scroll" tabIndex={0} role="region" aria-label="최근 주문 표. 작은 화면에서는 좌우로 움직여 확인하세요.">
            <table><thead><tr><th scope="col">주문번호</th><th scope="col">고객명</th><th scope="col" className="amount">금액</th><th scope="col">상태</th><th scope="col">날짜</th></tr></thead>
              <tbody>{orders.map((order) => <tr key={order.id}><td className="order-id">{order.id}</td><td>{order.name}</td><td className="amount">{won(order.amount)}원</td><td><span className={`badge ${order.status === "완료" ? "complete" : order.status === "진행중" ? "progress" : "cancelled"}`}>{order.status}</span></td><td className="order-date">{order.date}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
        <footer>연습을 위해 만든 대시보드입니다. 모든 수치와 주문은 가상의 데이터입니다.</footer>
      </main>
    </div>
  );
}
