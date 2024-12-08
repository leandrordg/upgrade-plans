import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <UserProfile />
    </div>
  );
}
