import { useAnnouncement } from "../content";

export function AnnouncementBar() {
  const announcement = useAnnouncement();

  return (
    <div className="bg-ink py-2 text-center text-xs font-medium uppercase tracking-wide text-off sm:text-sm">
      {announcement}
    </div>
  );
}
