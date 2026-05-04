import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { api } from "../api/client";

type ApiCoin = {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
};

type Tab = "All assets" | "Top gainers" | "New listings";

const TAB_ENDPOINTS: Record<Tab, string> = {
  "All assets": "/api/crypto",
  "Top gainers": "/api/crypto/gainers",
  "New listings": "/api/crypto/new",
};

function CoinRow({ coin }: { coin: ApiCoin }) {
  const up = coin.change24h >= 0;
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-slate-200 dark:border-slate-700 px-6 py-4 md:grid-cols-[2fr_1fr_1fr]">
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-10 w-10 rounded-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://via.placeholder.com/40?text=" + coin.symbol[0];
          }}
        />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{coin.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{coin.symbol}</p>
        </div>
      </div>
      <div className="flex items-center text-sm text-slate-700 dark:text-slate-200">
        ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
      </div>
      <div className={`flex items-center text-sm font-semibold ${up ? "text-emerald-500" : "text-rose-500"}`}>
        {up ? "+" : ""}{coin.change24h.toFixed(2)}%
      </div>
    </div>
  );
}

function Explore() {
  const [activeTab, setActiveTab] = useState<Tab>("All assets");
  const [coins, setCoins] = useState<ApiCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get<{ data: ApiCoin[] }>(TAB_ENDPOINTS[activeTab])
      .then(({ data }) => setCoins(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load data.");
        setCoins([]);
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  const tabs: Tab[] = ["All assets", "Top gainers", "New listings"];

  return (
    <div className="space-y-12 pb-20">
      <section className="bg-transparent">
        <Container className="space-y-6 pt-6">
          <SectionHeader
            eyebrow="Explore"
            title="Discover crypto assets"
            subtitle="Compare prices and 24-hour changes across cryptocurrencies."
          />
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeTab === tab
                    ? "border-[#0052ff] bg-[#0052ff] text-white"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0052ff]/30 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b0f19]">
            <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{activeTab}</h3>
            </div>
            <div className="hidden grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 md:grid">
              <span>Asset</span>
              <span>Price</span>
              <span>24h Change</span>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0052ff] border-t-transparent" />
              </div>
            ) : error ? (
              <p className="px-6 py-8 text-sm text-rose-500">{error}</p>
            ) : coins.length === 0 ? (
              <p className="px-6 py-8 text-sm text-slate-500 dark:text-slate-400">No cryptocurrencies found.</p>
            ) : (
              coins.map((coin) => <CoinRow key={coin._id} coin={coin} />)
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Explore;
