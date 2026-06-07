'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isAuth } from '@/lib/authAction';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(isAuth()));
  }, []);

  return (
    <header className="bg-white text-slate-900 border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-extrabold">
          <span className="text-slate-900">Instant Keto Meal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center md:flex items-center gap-8 text-sm">
          <Link href="/" className="nav-link text-slate-700 hover:text-slate-900">
            Home
          </Link>
          <Link href="/recipes" className="nav-link text-slate-700 hover:text-slate-900">
            Recipes
          </Link>
          <Link href="/about" className="nav-link text-slate-700 hover:text-slate-900">
            About
          </Link>
          {loggedIn && (
            <Link href="/profile/favorites" className="nav-link text-slate-700 hover:text-slate-900">
              Saved
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm ml-auto">
          <Link href="/register" className="border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:border-[#4A2518] hover:text-[#4A2518]">
            Register
          </Link>
          <Link href="/login" className="border border-[#2b170f] bg-[#4A2518] px-3 py-1.5 text-white transition hover:bg-[#3A1C12]">
            Login
          </Link>
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="ml-auto flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 border-t border-slate-100">
          <nav className="flex flex-col gap-3 text-sm text-slate-700 mb-4">
            <Link
              href="/"
              className="nav-link hover:text-slate-900 block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="nav-link hover:text-slate-900 block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className="nav-link hover:text-slate-900 block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {loggedIn && (
              <Link
                href="/profile/favorites"
                className="nav-link hover:text-slate-900 block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Saved
              </Link>
            )}
          </nav>

          <div className="flex flex-col gap-2 text-sm border-t border-slate-100 pt-4">
            <Link
              href="/register"
              className="border border-slate-300 px-4 py-2 text-center text-slate-700 transition hover:border-[#4A2518] hover:text-[#4A2518]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/login"
              className="border border-[#2b170f] bg-[#4A2518] px-4 py-2 text-center text-white transition hover:bg-[#3A1C12]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
