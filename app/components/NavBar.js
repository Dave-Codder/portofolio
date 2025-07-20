'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NavBar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9 9v-7h7m-4 7v-6a3 3 0 013-3h2a3 3 0 013 3v6a3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>, label: 'My Home' },
    { href: '/projects', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4" /></svg>, label: 'My Projects' },
    { href: '/skills', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: 'My Skills' },
    { href: '/books', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, label: 'My Books' },
    { href: '/contact', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: 'My Contact' },
  ]

  return (
    <nav className="bg-primary p-4 sticky top-0 z-50 shadow-lg md:static">
      <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, color: '#f59e0b' }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter cursor-pointer hidden md:block"
          >
            Daveo Dava Putra
          </motion.div>
        </Link>
        <div className="hidden md:flex space-x-8 text-text text-lg font-semibold">
          {navLinks.map((link) => (
            <li key={link.href} className="flex flex-col items-center">
              <Link 
                href={link.href} 
                className={`transition ${pathname === link.href ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                {link.icon}
              </Link>
              <span className="text-xs text-text mt-1">{link.label}</span>
            </li>
          ))}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-primary flex justify-around items-center p-4 text-text text-lg font-semibold shadow-lg">
        {navLinks.map((link) => (
          <li key={link.href} className="flex flex-col items-center">
            <Link 
              href={link.href} 
              className={`transition ${pathname === link.href ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              {link.icon}
            </Link>
            <span className="text-xs text-text mt-1 hidden">{link.label}</span>
          </li>
        ))}
      </div>
    </nav>
  )
}