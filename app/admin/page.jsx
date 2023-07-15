'use client'
import { useRouter } from "next/navigation";
import { useAuthContext } from "../components/context/AuthContext";
import { useEffect } from "react";

import './admin.scss'

import InitialiseSite from "./components/InitialiseSite";

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
      <div className="admin-container">
        <InitialiseSite />
      </div>
    );
  }

  return null;
}
