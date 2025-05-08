import { useSession } from "next-auth/react";

export default function ProtectedComponent() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome {session.user.name}</div>;
}
