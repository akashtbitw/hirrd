import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="grid-background" />
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
