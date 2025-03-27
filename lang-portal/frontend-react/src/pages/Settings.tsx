import { useTheme } from '../lib/theme';
import { useResetHistory, useFullReset } from '../api/settings';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const resetHistory = useResetHistory();
  const fullReset = useFullReset();

  const confirmReset = (action: () => void, message: string) => {
    if (confirm(message)) {
      action();
    }
  };

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Theme */}
      <div>
        <label className="block mb-1 font-medium">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Reset Buttons */}
      <div className="space-y-3">
        <button
          onClick={() =>
            confirmReset(() => resetHistory.mutate(), 'Are you sure you want to reset your history? This cannot be undone.')
          }
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Reset Study History
        </button>
        <button
          onClick={() =>
            confirmReset(() => fullReset.mutate(), '⚠️ Are you sure you want to FULL RESET all data? This action will delete everything and seed again.')
          }
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Full Reset (Danger Zone)
        </button>
      </div>
    </div>
  );
}
