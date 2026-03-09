import { Link } from "react-router-dom";
import Container from "../common/Container";

const columns = [
  {
    title: "Products",
    links: ["Exchange", "Wallet", "NFT", "Prime", "Commerce"],
  },
  {
    title: "Resources",
    links: ["Learn", "Blog", "Developers", "Help center", "Fees"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Legal", "Privacy"],
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b0f19] py-14">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <div className="space-y-4">
          <Link to="/" className="text-lg font-semibold text-[#0052ff]">
            coinbase
          </Link>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The trusted platform for buying, selling, and managing crypto.
          </p>
          <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>English (US)</span>
            <span>•</span>
            <span>$ USD</span>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{column.title}</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {column.links.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="mt-10 flex flex-col gap-3 border-t border-slate-200 dark:border-slate-700 pt-6 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Coinbase clone. All rights reserved.</span>
        <span>Built for learning with React & Tailwind CSS.</span>
      </Container>
    </footer>
  );
}

export default Footer;
