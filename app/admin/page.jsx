'use client'
import { useRouter } from "next/navigation";
import { useAuthContext } from "../components/context/AuthContext";
import { useEffect } from "react";


export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    }
  }, []);

  if (user) {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  }

  return null;
}
