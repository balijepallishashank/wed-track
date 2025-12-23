"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useRef } from "react";

// Track users globally to prevent duplicate API calls across remounts
const processedUsers = new Set<string>();

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    
    // Skip if we've already processed this user
    if (processedUsers.has(user.id)) return;

    const createNewUser = async () => {
      try {
        processedUsers.add(user.id);
        await axios.post("/api/user");
      } catch (error) {
        console.error("Failed to create user:", error);
        // Remove from set on error so it can be retried
        processedUsers.delete(user.id);
      }
    };

    createNewUser();
  }, [user?.id, isLoaded]);

  return <>{children}</>;
}

export default Provider;
