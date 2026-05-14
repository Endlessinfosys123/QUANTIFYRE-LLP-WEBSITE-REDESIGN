"use client";

import React from "react";
import { Toaster } from "sonner";

export const AdminProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster 
        theme="dark" 
        position="top-right" 
        expand={false} 
        richColors 
        toastOptions={{
          style: {
            background: '#13131F',
            border: '1px solid #1E1E2E',
            color: 'white',
          },
        }}
      />
      {children}
    </>
  );
};
