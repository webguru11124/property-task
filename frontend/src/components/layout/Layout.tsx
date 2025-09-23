import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-[72px] bg-gradient-to-br from-gray-50 to-brand-50/30">
                {children}
            </main>
            <Footer />
        </div>
    );
};