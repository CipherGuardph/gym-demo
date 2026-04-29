import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BadgeDollarSign,
  Bell,
  ChevronRight,
  Clock3,
  CreditCard,
  Dumbbell,
  Edit3,
  FileBarChart,
  Filter,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  ReceiptText,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { HashRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import "./styles.css";

type Stat = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
};

type Member = {
  name: string;
  plan: string;
  expires: string;
  status: string;
  role: string;
};

type Payment = {
  member: string;
  plan: string;
  amount: string;
  date: string;
  status: string;
};

type Equipment = {
  item: string;
  area: string;
  status: string;
  nextService: string;
};

type AlertItem = {
  title: string;
  body: string;
  type: string;
};

type Feedback = {
  member: string;
  score: string;
  note: string;
  time: string;
};

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/members", label: "Members", icon: Users },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/equipment", label: "Equipment", icon: Dumbbell },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/auth", label: "Authentication", icon: LockKeyhole },
  { to: "/portal", label: "Member Portal", icon: UserCheck },
];

const statsByRange: Record<string, Stat[]> = {
  Today: [
    { label: "Total Members", value: "1,248", trend: "+42 this month", icon: Users },
    { label: "Attendance", value: "286", trend: "78% capacity", icon: Activity },
    { label: "Income", value: "$8.4k", trend: "+18% vs yesterday", icon: BadgeDollarSign },
    { label: "Non-Members", value: "72", trend: "Walk-ins today", icon: BadgeCheck },
  ],
  Week: [
    { label: "Total Members", value: "1,248", trend: "+84 this week", icon: Users },
    { label: "Attendance", value: "1,924", trend: "Weekly visits", icon: Activity },
    { label: "Income", value: "$41.2k", trend: "+12% vs last week", icon: BadgeDollarSign },
    { label: "Non-Members", value: "214", trend: "Guest visits", icon: BadgeCheck },
  ],
  Month: [
    { label: "Total Members", value: "1,248", trend: "+140 this month", icon: Users },
    { label: "Attendance", value: "8,420", trend: "Monthly visits", icon: Activity },
    { label: "Income", value: "$168k", trend: "+20% vs last month", icon: BadgeDollarSign },
    { label: "Non-Members", value: "786", trend: "Guest visits", icon: BadgeCheck },
  ],
};

const members: Member[] = [
  { name: "Mika Reyes", plan: "Premium", expires: "May 24", status: "Active", role: "Member" },
  { name: "Aaron Lim", plan: "Monthly", expires: "May 02", status: "Renew", role: "Member" },
  { name: "Ava Lee", plan: "Yearly", expires: "Jul 18", status: "Active", role: "Member" },
  { name: "Guest 084", plan: "Walk-in", expires: "Today", status: "Non-member", role: "Guest" },
  { name: "Noah Tan", plan: "Premium", expires: "Expired", status: "Archived", role: "Member" },
];

const payments: Payment[] = [
  { member: "Mika Reyes", plan: "Yearly", amount: "$420", date: "Apr 28", status: "Paid" },
  { member: "Aaron Lim", plan: "Monthly", amount: "$45", date: "Apr 29", status: "Pending" },
  { member: "Jules Tan", plan: "Renewal", amount: "$120", date: "Apr 29", status: "Receipt sent" },
  { member: "Ava Lee", plan: "Yearly", amount: "$420", date: "Apr 30", status: "Paid" },
];

const equipment: Equipment[] = [
  { item: "Treadmill A3", area: "Cardio", status: "Working", nextService: "May 10" },
  { item: "Leg Press", area: "Strength", status: "Maintenance", nextService: "May 01" },
  { item: "Cable Row", area: "Strength", status: "Damaged", nextService: "Awaiting repair" },
  { item: "Rowing Machine", area: "Cardio", status: "Working", nextService: "Jun 02" },
];

const alerts: AlertItem[] = [
  { title: "12 memberships expire this week", body: "Send renewal reminders to Premium and Monthly members.", type: "Expiry" },
  { title: "Leg Press maintenance due", body: "Technician assigned and repair log opened.", type: "Maintenance" },
  { title: "New announcement sent", body: "Weekend schedule update published to member portal.", type: "Announcement" },
];

const feedback: Feedback[] = [
  { member: "Mika Reyes", score: "5.0", note: "Smooth check-in and fast support.", time: "2h ago" },
  { member: "Aaron Lim", score: "4.6", note: "Renewal flow is simple.", time: "5h ago" },
  { member: "Guest 084", score: "4.2", note: "Good equipment and helpful staff.", time: "Today" },
];

const attendanceBars = [54, 72, 63, 86, 78, 94, 68];
const incomeMix = [
  { label: "Memberships", value: "72%", color: "bg-blue-600" },
  { label: "Renewals", value: "20%", color: "bg-sky-400" },
  { label: "Walk-ins", value: "8%", color: "bg-slate-300" },
];

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

function AppShell() {
  const location = useLocation();
  const page = pageMeta(location.pathname);
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Sidebar />
        <div className="flex min-w-0 flex-col">
          <Topbar title={page.title} subtitle={page.subtitle} />
          <main className="min-w-0 flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/portal" element={<PortalPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="border-r border-slate-200 bg-white px-4 py-5 shadow-sm lg:min-h-screen">
      <div className="flex items-center gap-3 px-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-soft">
          <Dumbbell size={22} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-500">Cut & Curve</p>
          <p className="text-lg font-bold text-slate-950">Gym System</p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <ShieldCheck size={18} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-950">Admin Console</p>
            <p className="text-xs font-semibold text-slate-500">Live demo workspace</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
          <span className="font-semibold text-slate-600">Status</span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>
      </div>
      <nav className="mt-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold transition",
                isActive ? "bg-blue-600 text-white shadow-soft" : "text-slate-700 hover:bg-slate-100",
              ].join(" ")
            }
          >
            <span className="flex items-center gap-3">
              <Icon size={17} />
              {label}
            </span>
            <ChevronRight size={16} className="opacity-70" />
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-blue-700">
          <Sparkles size={16} />
          <p className="text-sm font-bold">Demo mode</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">Realistic admin pages with mock data, tables, filters, and route-based navigation.</p>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Real-world pages</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Search size={16} className="text-slate-400" />
              <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-64" placeholder="Search members, billing, equipment..." />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700">
              <Send size={16} />
              Quick action
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function DashboardPage() {
  const [range, setRange] = useState<"Today" | "Week" | "Month">("Today");
  const stats = statsByRange[range];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Operations at a glance"
        description="Track traffic, revenue, renewals, and the daily pulse of the gym from one admin view."
        actions={
          <SegmentedControl
            value={range}
            options={["Today", "Week", "Month"]}
            onChange={(next) => setRange(next as "Today" | "Week" | "Month")}
          />
        }
      />
      <section className="grid gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
        <Panel title="Attendance graph" subtitle="Check-in trend across the last seven days">
          <BarChart />
        </Panel>
        <Panel title="Income mix" subtitle="How revenue is distributed">
          <DonutChart />
          <div className="mt-4 space-y-2">
            {incomeMix.map((item) => (
              <Legend key={item.label} {...item} />
            ))}
          </div>
        </Panel>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Recent activity" subtitle="Latest events from the gym floor and admin desk">
          <ActivityList />
        </Panel>
        <Panel title="Upcoming renewals" subtitle="Members that need attention this week">
          <MiniTable
            headers={["Member", "Expires", "Status"]}
            rows={members.slice(0, 3).map((member) => [member.name, member.expires, <StatusBadge status={member.status} />])}
          />
        </Panel>
      </section>
    </div>
  );
}

function MembersPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? members : members.filter((member) => member.role === filter);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Members"
        title="Manage the full member lifecycle"
        description="Register, edit, renew, archive, and identify non-members from one operational screen."
        actions={<SegTabs value={filter} options={["All", "Member", "Guest"]} onChange={setFilter} />}
      />
      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Panel title="Member registry" subtitle="Searchable list with action controls">
          <MiniTable
            headers={["Member", "Plan", "Expires", "Status", "Actions"]}
            rows={filtered.map((member) => [
              <NameCell key={member.name} name={member.name} subtitle={member.role} />,
              member.plan,
              member.expires,
              <StatusBadge status={member.status} />,
              <ActionGroup />,
            ])}
          />
        </Panel>
        <div className="space-y-4">
          <Panel title="Quick profile" subtitle="Selected member snapshot">
            <div className="space-y-4">
              <ProfileCard />
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                <Edit3 size={16} />
                Edit profile
              </button>
            </div>
          </Panel>
          <Panel title="Recently deleted" subtitle="Soft-deleted records stay archived">
            <div className="space-y-2 text-sm text-slate-600">
              <ArchiveRow label="Noah Tan" meta="Archived yesterday" />
              <ArchiveRow label="Guest 021" meta="Removed from walk-in list" />
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Payments and renewals"
        description="Track receipts, payment status, and member renewals across monthly and yearly plans."
        actions={
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
            <ReceiptText size={16} />
            Generate receipt
          </button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-3">
        <MetricCard title="Monthly plans" value="$18.2k" hint="132 active" />
        <MetricCard title="Yearly plans" value="$94.8k" hint="224 active" />
        <MetricCard title="Renewals due" value="36" hint="12 due this week" />
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Payment ledger" subtitle="Current transactions and receipt status">
          <MiniTable
            headers={["Member", "Plan", "Amount", "Date", "Status"]}
            rows={payments.map((payment) => [
              <NameCell key={payment.member} name={payment.member} subtitle="Active account" />,
              payment.plan,
              payment.amount,
              payment.date,
              <StatusBadge status={payment.status} />,
            ])}
          />
        </Panel>
        <Panel title="Plan cards" subtitle="What the billing desk offers">
          <div className="grid gap-3">
            <PlanCard title="Monthly" price="$45" description="Flexible renewal cycle with auto reminders." />
            <PlanCard title="Yearly" price="$420" description="Best value for committed members." />
            <PlanCard title="Walk-in" price="$10" description="One-day guest access with receipt." />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function EquipmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Equipment"
        title="Inventory and maintenance"
        description="Watch condition tags, schedule service, and keep repair history visible to the admin team."
        actions={
          <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700">
            <Wrench size={16} />
            Add maintenance
          </button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Equipment list" subtitle="Status badges make issues obvious">
          <MiniTable
            headers={["Equipment", "Area", "Status", "Next service"]}
            rows={equipment.map((item) => [
              item.item,
              item.area,
              <StatusBadge key={item.item} status={item.status} />,
              item.nextService,
            ])}
          />
        </Panel>
        <Panel title="Maintenance queue" subtitle="Tasks that need attention">
          <div className="space-y-3">
            <QueueItem title="Lubricate treadmill belts" meta="Cardio area" />
            <QueueItem title="Replace cable row grip" meta="Repair log opened" />
            <QueueItem title="Inspect leg press hydraulics" meta="Awaiting technician" />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notifications"
        title="Alerts and announcements"
        description="Keep admins and members informed with expiry alerts, maintenance notices, and gym announcements."
        actions={
          <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700">
            <Send size={16} />
            Send announcement
          </button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Alert feed" subtitle="Prioritized messages">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.title} alert={alert} />
            ))}
          </div>
        </Panel>
        <Panel title="Notification center" subtitle="Bell dropdown style preview">
          <div className="space-y-3">
            <BellChip title="3 unread" />
            <BellChip title="12 expiry alerts" />
            <BellChip title="1 maintenance notice" />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports"
        title="Analytics and feedback"
        description="Review daily income, capacity, equipment condition, and satisfaction signals in one place."
        actions={
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
            <Filter size={16} />
            Filters
          </button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel title="Capacity and income" subtitle="Two core operational signals">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-700">Attendance graph</p>
              <div className="mt-4">
                <BarChart compact />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-700">Income percentage</p>
              <DonutChart small />
            </div>
          </div>
        </Panel>
        <Panel title="Feedback table" subtitle="What members are saying">
          <MiniTable
            headers={["Member", "Rating", "Feedback", "Time"]}
            rows={feedback.map((item) => [item.member, item.score, item.note, item.time])}
          />
        </Panel>
      </section>
    </div>
  );
}

function AuthPage() {
  const [role, setRole] = useState<"Admin" | "Member">("Admin");
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Authentication"
        title="Secure role-based access"
        description="Separate entry points for admins and members with protected routing and session handling."
        actions={<SegTabs value={role} options={["Admin", "Member"]} onChange={(value) => setRole(value as "Admin" | "Member")} />}
      />
      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title={`${role} login`} subtitle="Interactive login card">
          <div className="space-y-4">
            <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1 text-sm font-bold">
              <button className={`rounded-xl py-2 ${role === "Admin" ? "bg-blue-600 text-white" : "text-slate-600"}`} onClick={() => setRole("Admin")}>
                Admin
              </button>
              <button className={`rounded-xl py-2 ${role === "Member" ? "bg-blue-600 text-white" : "text-slate-600"}`} onClick={() => setRole("Member")}>
                Member
              </button>
            </div>
            <Field placeholder={`${role} email`} />
            <Field placeholder="Password" type="password" />
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700">
              <LogIn size={16} />
              Continue as {role}
            </button>
          </div>
        </Panel>
        <Panel title="Security controls" subtitle="What the auth layer handles">
          <div className="grid gap-3 md:grid-cols-2">
            <FeatureTile icon={ShieldCheck} title="Protected routes" body="Members and admins only see the screens meant for them." />
            <FeatureTile icon={BadgeCheck} title="Role checks" body="Access is granted based on account role and session state." />
            <FeatureTile icon={Clock3} title="Secure sessions" body="Sessions stay active across app pages until sign-out." />
            <FeatureTile icon={AlertTriangle} title="Audit trail" body="Logins and edits can be reviewed by administrators." />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function PortalPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Member portal"
        title="Self-service account management"
        description="Members can see their plan, renew online, and review transaction history without staff intervention."
      />
      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel title="Membership card" subtitle="Current plan and expiry">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-700">Premium plan</p>
            <p className="mt-2 text-3xl font-black text-slate-950">Expired</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">The member can renew online, update profile details, or review the latest transactions.</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700">
              Renew now
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MetricCard title="Plan expires" value="May 24" hint="Auto reminders on" />
            <MetricCard title="Saved card" value="Yes" hint="Safe checkout ready" />
          </div>
        </Panel>
        <Panel title="Transaction history" subtitle="Recent portal activity">
          <MiniTable
            headers={["Date", "Type", "Amount", "Status"]}
            rows={[
              ["Apr 28", "Renewal", "$120", <StatusBadge key="r1" status="Receipt sent" />],
              ["Mar 28", "Monthly", "$45", <StatusBadge key="r2" status="Paid" />],
              ["Feb 28", "Update profile", "Free", <StatusBadge key="r3" status="Paid" />],
            ]}
          />
        </Panel>
      </section>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-black text-slate-950">{stat.value}</p>
      <p className="mt-2 text-sm font-semibold text-emerald-600">{stat.trend}</p>
    </div>
  );
}

function MetricCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </div>
  );
}

function SegmentedControl({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option}
          className={[
            "rounded-xl px-4 py-2 text-sm font-bold transition",
            value === option ? "bg-blue-600 text-white shadow-soft" : "text-slate-600 hover:text-slate-950",
          ].join(" ")}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function SegTabs({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return <SegmentedControl value={value} options={options} onChange={onChange} />;
}

function BarChart({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-7 items-end gap-2 ${compact ? "h-44" : "h-60"}`}>
      {attendanceBars.map((value, index) => (
        <div className="flex h-full flex-col justify-end gap-2" key={index}>
          <div className="flex h-full items-end">
            <div className="w-full rounded-t-2xl bg-gradient-to-t from-blue-600 to-sky-300" style={{ height: `${value}%` }} />
          </div>
          <span className="text-center text-xs font-semibold text-slate-400">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ small = false }: { small?: boolean }) {
  return (
    <div className={`mx-auto mt-4 grid place-items-center rounded-full ${small ? "h-44 w-44" : "h-52 w-52"}`} style={{ background: "conic-gradient(#2563eb 0 68%, #38bdf8 68% 88%, #cbd5e1 88% 100%)" }}>
      <div className={`grid place-items-center rounded-full bg-white ${small ? "h-28 w-28" : "h-32 w-32"}`}>
        <span className="text-3xl font-black text-slate-950">72%</span>
      </div>
    </div>
  );
}

function Legend({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-slate-600">
        <i className={`h-2.5 w-2.5 rounded-full ${color}`} />
        {label}
      </span>
      <b className="text-slate-900">{value}</b>
    </div>
  );
}

function ActivityList() {
  return (
    <div className="space-y-3">
      <ActivityRow title="New member registered" meta="Mika Reyes completed full profile onboarding." icon={Users} />
      <ActivityRow title="Membership renewed" meta="Aaron Lim renewed for another month." icon={RefreshCw} />
      <ActivityRow title="Receipt generated" meta="Payment receipt sent to mobile inbox." icon={ReceiptText} />
      <ActivityRow title="Capacity threshold reached" meta="Front desk notified at 82% occupancy." icon={Gauge} />
    </div>
  );
}

function ActivityRow({ title, meta, icon: Icon }: { title: string; meta: string; icon: LucideIcon }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
        <Icon size={17} />
      </span>
      <div>
        <p className="text-sm font-bold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{meta}</p>
      </div>
    </div>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-blue-50 text-xs uppercase text-blue-800">
          <tr>
            {headers.map((header) => (
              <th className="px-3 py-3 font-bold" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, rowIndex) => (
            <tr className="border-t border-slate-100" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td className="px-3 py-3 align-middle text-slate-700" key={cellIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Renew: "bg-amber-50 text-amber-700",
    Archived: "bg-slate-100 text-slate-700",
    "Non-member": "bg-rose-50 text-rose-700",
    Working: "bg-emerald-50 text-emerald-700",
    Maintenance: "bg-amber-50 text-amber-700",
    Damaged: "bg-rose-50 text-rose-700",
    Paid: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "Receipt sent": "bg-blue-50 text-blue-700",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${map[status] ?? "bg-slate-100 text-slate-700"}`}>{status}</span>;
}

function NameCell({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <span className="block">
      <b className="block text-slate-950">{name}</b>
      <small className="block text-xs font-semibold text-slate-500">{subtitle}</small>
    </span>
  );
}

function ActionGroup() {
  return (
    <div className="flex gap-1">
      <ActionIcon icon={Edit3} label="Edit" />
      <ActionIcon icon={RefreshCw} label="Renew" />
      <ActionIcon icon={Trash2} label="Archive" danger />
    </div>
  );
}

function ActionIcon({ icon: Icon, label, danger }: { icon: LucideIcon; label: string; danger?: boolean }) {
  return (
    <button
      aria-label={label}
      type="button"
      className={[
        "rounded-xl p-2 transition",
        danger ? "text-rose-600 hover:bg-rose-50" : "text-blue-700 hover:bg-blue-50",
      ].join(" ")}
    >
      <Icon size={15} />
    </button>
  );
}

function ProfileCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <Users size={20} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-950">Mika Reyes</p>
          <p className="text-sm text-slate-500">Premium member</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
          <span>Plan</span>
          <b className="text-slate-950">Yearly</b>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
          <span>Expiry</span>
          <b className="text-slate-950">May 24</b>
        </div>
      </div>
    </div>
  );
}

function ArchiveRow({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <Trash2 className="mt-0.5 text-slate-400" size={16} />
      <div>
        <p className="font-bold text-slate-950">{label}</p>
        <p className="text-sm text-slate-500">{meta}</p>
      </div>
    </div>
  );
}

function PlanCard({ title, price, description }: { title: string; price: string; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-slate-950">{title}</p>
        <p className="text-lg font-black text-blue-700">{price}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function QueueItem({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <Clock3 className="mt-0.5 text-blue-700" size={16} />
        <div>
          <p className="text-sm font-bold text-slate-950">{title}</p>
          <p className="text-sm text-slate-500">{meta}</p>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: AlertItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
            <Bell size={16} />
          </span>
          <div>
            <p className="font-bold text-slate-950">{alert.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{alert.body}</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">{alert.type}</span>
      </div>
    </div>
  );
}

function BellChip({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="flex items-center gap-3 text-sm font-semibold text-slate-700">
        <Bell size={16} className="text-blue-700" />
        {title}
      </span>
      <ArrowUpRight size={16} className="text-slate-400" />
    </div>
  );
}

function FeatureTile({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
          <Icon size={17} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-950">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
        </div>
      </div>
    </div>
  );
}

function pageMeta(pathname: string) {
  const metaMap: Record<string, { title: string; subtitle: string }> = {
    "/": { title: "Dashboard", subtitle: "A clean operational view for the day" },
    "/members": { title: "Members", subtitle: "Registration, profiles, renewals, and archives" },
    "/billing": { title: "Billing", subtitle: "Plans, payments, and receipts" },
    "/equipment": { title: "Equipment", subtitle: "Inventory, maintenance, and repair logs" },
    "/notifications": { title: "Notifications", subtitle: "Alerts, reminders, and announcements" },
    "/reports": { title: "Reports", subtitle: "Capacity, income, and satisfaction analytics" },
    "/auth": { title: "Authentication", subtitle: "Role-based access and secure sessions" },
    "/portal": { title: "Member Portal", subtitle: "Self-service renewals and transaction history" },
  };
  return metaMap[pathname] ?? metaMap["/"];
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
