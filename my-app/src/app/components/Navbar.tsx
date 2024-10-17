'use client';

import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Link from 'next/link'; // Use Link to navigate

declare global {
  interface Window {
    ethereum?: any; // Declare the ethereum object
  }
}

const Navbar: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0 QF'); // Set initial balance to '0 MQ'
  const router = useRouter(); // Initialize the router
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]); // Store the first account address
        console.log('Connected account:', accounts[0]);

        // Set a sample balance (You can replace this with actual balance fetching logic)
        setBalance('10 QF');

        // Redirect to home page after successful connection
        router.push('/home'); // Automatically redirect to the home page
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div 
        ref={logoRef} 
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <Link href="/home">Quest Flow</Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-white font-semibold">
          Balance: {balance}
        </div>

        <Link href={`/profile?account=${account}&balance=${balance}`}>
          <button 
            className="text-white bg-blue-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105"
          >
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </button>
        </Link>

        <button 
          onClick={isConnected ? undefined : connectWallet} 
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
          {isConnected ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect MetaMask"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;