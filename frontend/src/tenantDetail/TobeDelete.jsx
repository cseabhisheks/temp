export default function TobeDeleted() {
    // ---------- Dummy Data ----------

// ---------- TENANT ----------
const tenant = {
    name: "Rahul Sharma",
    property: "Galaxy Apartment",
    room: "Room 101",
    monthlyRent: 10000,
    monthlyEB: 1000,
    totalPaid: 66000, // sum of advance + all payments
    arrear: 0,         // final balance
    status: "PAID"
};

// ---------- MONTH-WISE STATUS ----------
const months = [
    { month: "Jan 2025", rent: 10000, eb: 1000, paid: 0, due: 0, status: "PAID" },       // advance covers
    { month: "Feb 2025", rent: 10000, eb: 1000, paid: 0, due: 11000, status: "DUE" },
    { month: "Mar 2025", rent: 10000, eb: 1000, paid: 0, due: 22000, status: "DUE" },
    { month: "Apr 2025", rent: 10000, eb: 1000, paid: 15000, due: 9000, status: "PARTIAL" },
    { month: "May 2025", rent: 10000, eb: 1000, paid: 20000, due: 0, status: "PAID" },
    { month: "Jun 2025", rent: 10000, eb: 1000, paid: 11000, due: 0, status: "PAID" }
];

// ---------- LEDGER ----------
const ledger = [
    // ---------- ADVANCE ----------
    { date: "2025-01-01", type: "Advance", debit: 0, credit: 20000, balance: -20000 },

    // ---------- JAN ----------
    { date: "2025-01-01", type: "Rent", debit: 10000, credit: 0, balance: -10000 },
    { date: "2025-01-01", type: "EB", debit: 1000, credit: 0, balance: -9000 },

    // ---------- FEB (NO PAYMENT) ----------
    { date: "2025-02-01", type: "Rent", debit: 10000, credit: 0, balance: 1000 },
    { date: "2025-02-01", type: "EB", debit: 1000, credit: 0, balance: 2000 },

    // ---------- MAR (NO PAYMENT) ----------
    { date: "2025-03-01", type: "Rent", debit: 10000, credit: 0, balance: 12000 },
    { date: "2025-03-01", type: "EB", debit: 1000, credit: 0, balance: 13000 },

    // ---------- APR (PART PAYMENT) ----------
    { date: "2025-04-01", type: "Rent", debit: 10000, credit: 0, balance: 23000 },
    { date: "2025-04-01", type: "EB", debit: 1000, credit: 0, balance: 24000 },
    { date: "2025-04-10", type: "Payment", debit: 0, credit: 15000, balance: 9000 },

    // ---------- MAY ----------
    { date: "2025-05-01", type: "Rent", debit: 10000, credit: 0, balance: 19000 },
    { date: "2025-05-01", type: "EB", debit: 1000, credit: 0, balance: 20000 },
    { date: "2025-05-15", type: "Payment", debit: 0, credit: 20000, balance: 0 },

    // ---------- JUN ----------
    { date: "2025-06-01", type: "Rent", debit: 10000, credit: 0, balance: 10000 },
    { date: "2025-06-01", type: "EB", debit: 1000, credit: 0, balance: 11000 },
    { date: "2025-06-20", type: "Payment", debit: 0, credit: 11000, balance: 0 }
];




    const statusColor = {
        PAID: "bg-green-100 text-green-700",
        PARTIAL: "bg-yellow-100 text-yellow-700",
        DUE: "bg-red-100 text-red-700"
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* ---------- SUMMARY ---------- */}
            <div className="bg-white rounded-xl shadow p-6 relative">
                <h2 className="text-2xl font-semibold">{tenant.name}</h2>
                <p className="text-sm text-gray-500">
                    {tenant.property} • {tenant.room}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <SummaryItem label="Monthly Rent" value={`₹${tenant.monthlyRent}`} />
                    <SummaryItem label="Monthly EB" value={`₹${tenant.monthlyEB}`} />
                    <SummaryItem label="Total Paid" value={`₹${tenant.totalPaid}`} valueClass="text-green-600" />
                    <SummaryItem label="Arrear" value={`₹${tenant.arrear}`} valueClass="text-red-600" />
                </div>

                <span
                    className={`absolute top-6 right-6 px-3 py-1 text-sm rounded-full font-medium ${statusColor[tenant.status]}`}
                >
                    {tenant.status}
                </span>
            </div>

            {/* ---------- MONTH-WISE ---------- */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Month-wise Status</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left bg-gray-100">
                                <TableHead>Month</TableHead>
                                <TableHead>Rent</TableHead>
                                <TableHead>EB</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Due</TableHead>
                                <TableHead>Status</TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            {months.map(m => (
                                <tr key={m.month} className="border-b last:border-none">
                                    <TableCell>{m.month}</TableCell>
                                    <TableCell>₹{m.rent}</TableCell>
                                    <TableCell>₹{m.eb}</TableCell>
                                    <TableCell className="text-green-600">₹{m.paid}</TableCell>
                                    <TableCell className="text-red-600">₹{m.due}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${statusColor[m.status]}`}>
                                            {m.status}
                                        </span>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ---------- LEDGER ---------- */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Ledger</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left bg-gray-100">
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Debit</TableHead>
                                <TableHead>Credit</TableHead>
                                <TableHead>Balance</TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            {ledger.map((l, i) => (
                                <tr key={i} className="border-b last:border-none">
                                    <TableCell>{l.date}</TableCell>
                                    <TableCell>{l.type}</TableCell>
                                    <TableCell>{l.debit ? `₹${l.debit}` : "-"}</TableCell>
                                    <TableCell>{l.credit ? `₹${l.credit}` : "-"}</TableCell>
                                    <TableCell className="font-semibold">₹{l.balance}</TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

function SummaryItem({ label, value, valueClass = "" }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-lg font-semibold ${valueClass}`}>{value}</p>
        </div>
    );
}

function TableHead({ children }) {
    return <th className="px-3 py-2 font-medium">{children}</th>;
}

function TableCell({ children, className = "" }) {
    return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}