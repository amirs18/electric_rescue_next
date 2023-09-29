import GetLocationButton from "@components/GetLocationButton";
import Login from "@components/Login";
import { Metadata } from "next";
import { serverClient } from "@trpcProviders/serverClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export const metadata: Metadata = {
  title: "Electric Rescue",
  description: "Generated by create next app",
};
export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log("🚀 ~ file: page.tsx:14 ~ Home ~ session:", session)
  return (
    <main className=" mx-10 mt-5">
      <h1 className="prose text-center text-4xl">
        Welcome to{" "}
        <span className="prose text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          Electric Rescue
        </span>
      </h1>
      <div className="flex justify-center p-8">
      <GetLocationButton />
      </div>
      <Login />
    </main>
  );
}
