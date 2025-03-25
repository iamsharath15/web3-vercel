import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();


const nextConfig: NextConfig = {

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
