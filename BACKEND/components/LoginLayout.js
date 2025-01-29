import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading</div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return <>{children}</>;
}
