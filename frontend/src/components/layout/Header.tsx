import React from 'react';
import { Button, Burger, Text, ThemeIcon } from '@mantine/core';
import { IconHome, IconBuilding, IconPhone } from '@tabler/icons-react';

export const Header: React.FC = () => {
    const [opened, setOpened] = React.useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-light border-b border-gray-200/20 h-[72px]">
            <div className="responsive-container h-full flex items-center justify-between">
                {/* Logo - Tailwind layout */}
                <div className="flex items-center gap-3">
                    <ThemeIcon
                        size="lg"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: 'brand', to: 'blue', deg: 135 }}
                    >
                        <IconBuilding size={24} />
                    </ThemeIcon>
                    <div>
                        <Text size="lg" fw={700} className="gradient-text">
                            Plyo Property
                        </Text>
                        <Text size="xs" c="dimmed" className="leading-none">
                            Find Your Perfect Broker
                        </Text>
                    </div>
                </div>

                {/* Desktop Navigation - Tailwind layout with Mantine components */}
                <nav className="hidden md:flex items-center gap-4">
                    <Button
                        variant="subtle"
                        leftSection={<IconHome size={18} />}
                        className="hover-lift"
                    >
                        Home
                    </Button>
                    <Button
                        variant="subtle"
                        leftSection={<IconBuilding size={18} />}
                        className="hover-lift"
                    >
                        Brokers
                    </Button>
                    <Button
                        variant="subtle"
                        leftSection={<IconPhone size={18} />}
                        className="hover-lift"
                    >
                        Contact
                    </Button>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'brand', to: 'blue', deg: 135 }}
                        className="hover-lift"
                    >
                        Get Started
                    </Button>
                </nav>

                {/* Mobile Navigation Toggle */}
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    className="md:hidden"
                    size="sm"
                />
            </div>
        </header>
    );
};