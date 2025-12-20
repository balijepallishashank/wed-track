"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useRef } from "react";

function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || hasRun.current) return;

    hasRun.current = true;
    createNewUser();
  }, [user, isLoaded]);

  const createNewUser = async () => {
    try {
      await axios.post("/api/user");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return <>{children}</>;
}

export default Provider;
