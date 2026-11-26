"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  Monitor,
  RefreshCw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Copy,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

type Preferences = {
  messageAlerts: boolean;
  contentAlerts: boolean;
  compactLayout: boolean;
  reducedMotion: boolean;
};

const DEFAULT_PREFERENCES: Preferences = {
  messageAlerts: true,
  contentAlerts: true,
  compactLayout: false,
  reducedMotion: false,
};

const PREFERENCE_KEY = "odi-admin-preferences";

function SettingToggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-100">{label}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#080b18] ${checked ? "border-purple-500 bg-purple-600" : "border-white/10 bg-zinc-800"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-2.5 text-purple-300">
        <Icon size={18} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PREFERENCE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Preferences>;
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch {
      toast.error("Saved preferences could not be read.");
    }
    setPreferencesReady(true);

    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        toast.error("Could not load account details.");
        return;
      }
      setEmail(data.user?.email ?? "");
    });
    return () => {
      active = false;
    };
  }, []);

  function updatePreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function savePreferences() {
    try {
      window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences));
      toast.success("Admin preferences saved on this device.");
    } catch {
      toast.error("Could not save preferences in this browser.");
    }
  }

  function resetPreferences() {
    setPreferences(DEFAULT_PREFERENCES);
    try {
      window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      toast.success("Preferences restored to defaults.");
    } catch {
      toast.error("Could not reset browser preferences.");
    }
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Use a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("The passwords do not match.");
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSavingPassword(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setPassword("");
    setConfirmPassword("");
    toast.success("Password updated successfully.");
  }

  async function updateEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidate = newEmail.trim();
    if (!candidate || candidate.toLowerCase() === email.toLowerCase()) {
      toast.error("Enter a different email address.");
      return;
    }
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: candidate });
    setSavingEmail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setNewEmail("");
    toast.success("Confirmation sent. Verify the new address to complete the change.");
  }

  async function signOut() {
    setSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setSigningOut(false);
      toast.error(error.message);
      return;
    }
    router.replace("/login");
    router.refresh();
  }

  async function copyPortfolioLink() {
    try {
      await navigator.clipboard.writeText("https://odiportfolio.vercel.app");
      toast.success("Portfolio link copied.");
    } catch {
      toast.error("Clipboard access is unavailable in this browser.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pb-12">
      <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400">
            <SlidersHorizontal size={13} /> Workspace control
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Settings</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            Manage your admin experience, account access and security.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-purple-500/30 hover:text-white"
        >
          View portfolio <ExternalLink size={14} />
        </a>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <SectionHeading
              icon={UserRound}
              title="Account"
              description="Your administrator identity and sign-in email."
            />
            <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300">
                  <UserRound size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">Odi Administrator</p>
                  <p className="truncate text-xs text-zinc-500">{email || "Loading account…"}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                  <ShieldCheck size={12} /> Signed in
                </span>
              </div>
            </div>
            <form onSubmit={updateEmail} className="mt-5 space-y-3">
              <label htmlFor="new-email" className="block text-xs font-medium text-zinc-300">
                Change sign-in email
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 focus-within:border-purple-500/50">
                  <Mail size={16} className="shrink-0 text-zinc-500" />
                  <input
                    id="new-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                    placeholder="New email address"
                    className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingEmail || !newEmail.trim()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingEmail ? "Sending…" : "Send confirmation"}
                </button>
              </div>
              <p className="text-[11px] leading-5 text-zinc-600">
                Supabase sends a confirmation link. Your email changes only after you verify it.
              </p>
            </form>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <SectionHeading
              icon={LockKeyhole}
              title="Security"
              description="Keep your administrator account protected."
            />
            <form onSubmit={updatePassword} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="mb-2 block text-xs font-medium text-zinc-300">
                  New password
                </label>
                <div className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 focus-within:border-purple-500/50">
                  <KeyRound size={16} className="text-zinc-500" />
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="rounded-lg p-1.5 text-zinc-500 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="mb-2 block text-xs font-medium text-zinc-300">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Enter the password again"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-zinc-600">Use a unique password you do not use elsewhere.</p>
                <button
                  type="submit"
                  disabled={savingPassword || !password || !confirmPassword}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={14} /> {savingPassword ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <SectionHeading
              icon={Bell}
              title="Notifications"
              description="Choose which admin activity reminders this browser should display."
            />
            <div className="divide-y divide-white/[0.06]">
              <SettingToggle
                checked={preferences.messageAlerts}
                onChange={(value) => updatePreference("messageAlerts", value)}
                label="New message reminders"
                description="Keep message-related reminders enabled in your admin preferences."
              />
              <SettingToggle
                checked={preferences.contentAlerts}
                onChange={(value) => updatePreference("contentAlerts", value)}
                label="Content activity reminders"
                description="Keep project, blog and testimonial reminders enabled."
              />
            </div>
            <p className="mt-3 rounded-lg border border-amber-500/10 bg-amber-500/[0.04] px-3 py-2 text-[11px] leading-5 text-amber-200/70">
              These preferences are saved in this browser. They do not change email delivery or server-side notifications.
            </p>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <SectionHeading
              icon={Monitor}
              title="Workspace"
              description="Adjust how the admin interface feels on this device."
            />
            <div className="divide-y divide-white/[0.06]">
              <SettingToggle
                checked={preferences.compactLayout}
                onChange={(value) => updatePreference("compactLayout", value)}
                label="Compact layout preference"
                description="Remember that you prefer denser spacing in the admin workspace."
              />
              <SettingToggle
                checked={preferences.reducedMotion}
                onChange={(value) => updatePreference("reducedMotion", value)}
                label="Reduced motion preference"
                description="Remember your preference for fewer interface animations."
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-zinc-600">Preferences are stored locally on this device.</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={resetPreferences}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3.5 text-xs text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  <RefreshCw size={13} /> Reset
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  disabled={!preferencesReady}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-purple-600 px-4 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
                >
                  <Save size={13} /> Save preferences
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
              <Sparkles size={18} />
            </div>
            <h2 className="text-sm font-semibold text-white">Your portfolio</h2>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Preview the public-facing site or copy its address to share it.
            </p>
            <button
              type="button"
              onClick={copyPortfolioLink}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-purple-400/30 hover:text-white"
            >
              <Copy size={14} /> Copy portfolio link
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500"
            >
              Open live portfolio <ExternalLink size={13} />
            </a>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck size={16} className="text-emerald-400" />
              <h2 className="text-sm font-semibold">Account protection</h2>
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-500">
              Admin pages require an authenticated Supabase session. Sign out when using a shared device.
            </p>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-xs font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              <LogOut size={14} /> {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </section>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <CircleHelp size={14} className="text-purple-400" /> Need help?
            </div>
            <p className="mt-2 text-[11px] leading-5 text-zinc-500">
              If you cannot access your account, use the password recovery flow on the sign-in page.
            </p>
            <a href="/login" className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-purple-300 hover:text-purple-200">
              Go to sign in <ChevronRight size={13} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
