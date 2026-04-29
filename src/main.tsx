import React from "react";
import ReactDOM from "react-dom/client";
import {
  Activity,
  BadgeDollarSign,
  Bell,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Dumbbell,
  Edit3,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import "./styles.css";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  bullets: string[];
  preview: React.ReactNode;
};

const members = [
  { name: "Mika Reyes", plan: "Premium", expires: "May 24", status: "Active" },
  { name: "Aaron Lim", plan: "Monthly", expires: "May 02", status: "Renew" },
  { name: "Guest 084", plan: "Walk-in", expires: "Today", status: "Non-member" },
];

const equipment = [
  { item: "Treadmill A3", area: "Cardio", status: "Working" },
  { item: "Leg Press", area: "Strength", status: "Maintenance" },
  { item: "Cable Row", area: "Strength", status: "Damaged" },
];

const payments = [
  { member: "Mika Reyes", type: "Yearly", amount: "$420", status: "Paid" },
  { member: "Aaron Lim", type: "Monthly", amount: "$45", status: "Pending" },
  { member: "Jules Tan", type: "Renewal", amount: "$120", status: "Receipt sent" },
];

const featureSections: Feature[] = [
  {
    title: "Admin Management",
    description: "Handles the full lifecycle of gym members.",
    icon: Users,
    bullets: [
      "Member registration with full profile",
      "Update and edit member info",
      "Soft delete with archive",
      "Membership renewal processing",
      "Identify and flag non-members",
    ],
    preview: <MembersTable />,
  },
  {
    title: "Gym Capacity Monitoring",
    description: "Real-time tracking of daily gym occupancy.",
    icon: Gauge,
    bullets: ["Daily total headcount", "Member vs non-member tracking", "Visual dashboard cards and stats"],
    preview: <CapacityPreview />,
  },
  {
    title: "User Authentication",
    description: "Secure and role-based access system.",
    icon: LockKeyhole,
    bullets: ["Separate Admin and Member login", "Role-based access control", "Protected routes", "Secure session handling"],
    preview: <LoginPreview />,
  },
  {
    title: "Member Self-Service Portal",
    description: "Allows members to manage their own accounts.",
    icon: UserCheck,
    bullets: ["Update profile", "View transaction history", "Renew membership online", "View plan and expiry"],
    preview: <PortalPreview />,
  },
  {
    title: "Gym Equipment Inventory",
    description: "Tracks equipment condition and maintenance.",
    icon: Dumbbell,
    bullets: ["Equipment list with status", "Working, damaged, maintenance tags", "Maintenance schedule", "Repair history logs"],
    preview: <EquipmentPreview />,
  },
  {
    title: "Billing & Payment",
    description: "Handles all payments and receipts.",
    icon: CreditCard,
    bullets: ["Monthly and yearly plans", "Receipt generation", "Payment tracking", "Renewal payments"],
    preview: <PaymentPreview />,
  },
  {
    title: "Notification System",
    description: "Keeps users informed.",
    icon: Bell,
    bullets: ["Expiry alerts", "Admin notifications", "Announcements"],
    preview: <NotificationPreview />,
  },
  {
    title: "Feedback & Reports",
    description: "Analytics and feedback system.",
    icon: FileBarChart,
    bullets: ["Member ratings and feedback", "Daily income reports", "Capacity reports", "Equipment reports", "Satisfaction analytics"],
    preview: <ReportsPreview />,
  },
];

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <Hero />
      <FeatureGrid />
      <DashboardPreview />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-soft">
            <Dumbbell size={21} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-500">Cut & Curve</p>
            <p className="font-bold">Gym Management System</p>
          </div>
        </div>
        <a className="hidden rounded-full border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 md:block" href="#features">
          Explore modules
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24 lg:pt-14">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            <ShieldCheck size={16} />
            Built for modern gyms
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            All-in-One Gym Management System
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Manage members, track capacity, monitor equipment, and automate billing - all in one powerful platform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-700" href="#features">
              View Demo
              <ChevronRight size={18} />
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700" href="#dashboard">
              <LayoutDashboard size={18} />
              Admin Dashboard Preview
            </a>
          </div>
        </div>

        <MockDashboard />
      </div>
    </section>
  );
}

function MockDashboard() {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3 shadow-soft">
      <div className="rounded-[1.35rem] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Admin overview</p>
            <h2 className="text-xl font-bold text-slate-950">Today at Cut & Curve</h2>
          </div>
          <div className="rounded-full bg-blue-50 p-3 text-blue-700">
            <Bell size={20} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Members" value="1,248" trend="+12%" icon={Users} />
          <StatCard label="Attendance" value="286" trend="+8%" icon={Activity} />
          <StatCard label="Income" value="$8.4k" trend="+18%" icon={BadgeDollarSign} />
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-semibold">Attendance flow</p>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Live</span>
            </div>
            <BarChart />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="font-semibold">Plan mix</p>
            <DonutChart />
            <div className="mt-3 space-y-2 text-sm">
              <Legend label="Premium" color="bg-blue-600" value="64%" />
              <Legend label="Monthly" color="bg-sky-400" value="27%" />
              <Legend label="Walk-in" color="bg-slate-300" value="9%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="System modules"
        title="Core workflows in one clean demo"
        description="Every section below mirrors a real operational flow: registration, capacity, authentication, member tools, inventory, billing, alerts, and reports."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {featureSections.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="flex-1">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon size={22} />
          </div>
          <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
          <ul className="mt-4 space-y-2">
            {feature.bullets.map((item) => (
              <li className="flex gap-2 text-sm text-slate-700" key={item}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3">{feature.preview}</div>
      </div>
    </article>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Dashboard preview"
          title="A clear command center for daily operations"
          description="Live-style cards, attendance trends, income progress, and quick operational signals keep admins focused on what needs attention."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Total Members" value="1,248" trend="+42 this month" icon={Users} />
              <StatCard label="Non-Members" value="72" trend="Walk-ins today" icon={ClipboardList} />
              <StatCard label="Attendance" value="286" trend="78% capacity" icon={Activity} />
            </div>
            <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-bold">Attendance graph</h3>
                <span className="text-sm font-semibold text-slate-500">Last 7 days</span>
              </div>
              <BarChart tall />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Income percentage</h3>
                <DonutChart large />
                <div className="mt-3 grid gap-2 text-sm">
                  <Legend label="Memberships" color="bg-blue-600" value="72%" />
                  <Legend label="Renewals" color="bg-sky-400" value="20%" />
                  <Legend label="Walk-ins" color="bg-slate-300" value="8%" />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Quick actions</h3>
                <div className="mt-4 grid gap-3">
                  {["Register member", "Process renewal", "Schedule repair"].map((item) => (
                    <button className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" key={item}>
                      {item}
                      <ChevronRight size={17} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function StatCard({ label, value, trend, icon: Icon }: { label: string; value: string; trend: string; icon: React.ElementType }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">{label}</span>
        <Icon className="text-blue-600" size={18} />
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-semibold text-emerald-600">{trend}</p>
    </div>
  );
}

function MembersTable() {
  return (
    <MiniTable
      headers={["Member", "Plan", "Action"]}
      rows={members.map((member) => [
        <span>
          <b>{member.name}</b>
          <small>{member.status}</small>
        </span>,
        member.plan,
        <div className="flex gap-1">
          <IconButton icon={Edit3} label="Edit" />
          <IconButton icon={RefreshCw} label="Renew" />
          <IconButton icon={Trash2} label="Delete" danger />
        </div>,
      ])}
    />
  );
}

function CapacityPreview() {
  return (
    <div className="grid gap-3">
      <StatCard label="Total Members" value="214" trend="Checked in" icon={Users} />
      <StatCard label="Total Non-Members" value="32" trend="Walk-ins" icon={ClipboardList} />
      <StatCard label="Overall Total" value="246" trend="82% capacity" icon={Gauge} />
    </div>
  );
}

function LoginPreview() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold">
        <button className="rounded-lg bg-blue-600 py-2 text-white">Admin</button>
        <button className="py-2 text-slate-600">Member</button>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
        <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white">
          <ShieldCheck size={16} />
          Secure login
        </button>
      </div>
    </div>
  );
}

function PortalPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Premium plan</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold">Expired</p>
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white">Renew</button>
        </div>
      </div>
      <MiniTable headers={["Date", "Type", "Amount"]} rows={[["Apr 28", "Renewal", "$120"], ["Mar 28", "Monthly", "$45"]]} />
    </div>
  );
}

function EquipmentPreview() {
  return (
    <MiniTable
      headers={["Equipment", "Area", "Status"]}
      rows={equipment.map((item) => [item.item, item.area, <StatusBadge status={item.status} />])}
    />
  );
}

function PaymentPreview() {
  return (
    <MiniTable
      headers={["Member", "Plan", "Status"]}
      rows={payments.map((payment) => [
        <span>
          <b>{payment.member}</b>
          <small>{payment.amount}</small>
        </span>,
        payment.type,
        <StatusBadge status={payment.status} />,
      ])}
    />
  );
}

function NotificationPreview() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold">Notifications</p>
        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">3</span>
      </div>
      {["12 memberships expire this week", "Leg Press maintenance due", "New announcement sent"].map((item) => (
        <div className="mb-2 flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm" key={item}>
          <Bell className="shrink-0 text-blue-600" size={16} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ReportsPreview() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 items-end gap-2 rounded-xl bg-white p-4 shadow-sm">
        {[44, 68, 55, 82, 74].map((height, index) => (
          <div className="rounded-t-lg bg-blue-500" style={{ height }} key={index} />
        ))}
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <MessageSquareText className="text-blue-600" size={18} />
          <div>
            <p className="font-semibold">4.8 average rating</p>
            <p className="text-sm text-slate-500">Great trainers and smooth renewal flow.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-blue-50 text-xs uppercase text-blue-800">
          <tr>
            {headers.map((header) => (
              <th className="px-3 py-3 font-bold" key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className="border-t border-slate-100" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td className="px-3 py-3 align-middle text-slate-700" key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IconButton({ icon: Icon, label, danger }: { icon: React.ElementType; label: string; danger?: boolean }) {
  return (
    <button aria-label={label} className={`rounded-lg p-2 transition ${danger ? "text-rose-600 hover:bg-rose-50" : "text-blue-700 hover:bg-blue-50"}`}>
      <Icon size={15} />
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Working: "bg-emerald-50 text-emerald-700",
    Maintenance: "bg-amber-50 text-amber-700",
    Damaged: "bg-rose-50 text-rose-700",
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "Receipt sent": "bg-blue-50 text-blue-700",
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[status] ?? "bg-slate-100 text-slate-700"}`}>{status}</span>;
}

function BarChart({ tall = false }: { tall?: boolean }) {
  const values = [54, 72, 63, 86, 78, 94, 68];
  return (
    <div className={`grid grid-cols-7 items-end gap-2 ${tall ? "h-64" : "h-40"}`}>
      {values.map((value, index) => (
        <div className="flex h-full flex-col justify-end gap-2" key={index}>
          <div className="rounded-t-xl bg-gradient-to-t from-blue-600 to-sky-300 transition group-hover:from-blue-700" style={{ height: `${value}%` }} />
          <span className="text-center text-xs font-semibold text-slate-400">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ large = false }: { large?: boolean }) {
  return (
    <div className={`mx-auto mt-5 grid place-items-center rounded-full ${large ? "h-52 w-52" : "h-36 w-36"}`} style={{ background: "conic-gradient(#2563eb 0 68%, #38bdf8 68% 88%, #cbd5e1 88% 100%)" }}>
      <div className={`grid place-items-center rounded-full bg-white ${large ? "h-32 w-32" : "h-20 w-20"}`}>
        <span className="text-2xl font-bold text-slate-950">72%</span>
      </div>
    </div>
  );
}

function Legend({ label, color, value }: { label: string; color: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-slate-600">
        <i className={`h-2.5 w-2.5 rounded-full ${color}`} />
        {label}
      </span>
      <b className="text-slate-900">{value}</b>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-slate-950">Cut & Curve Gym Management System</p>
          <p>Manage smarter, serve members faster.</p>
        </div>
        <p className="font-semibold text-blue-700">Built for modern gyms</p>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
