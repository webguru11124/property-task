import React from 'react';
import { Container, Group, Text, Stack, Anchor, Box, SimpleGrid } from '@mantine/core';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

export const Footer: React.FC = () => {
    return (
        <Box component="footer" className="mt-auto bg-gray-900 text-white pt-16 pb-8">
            <Container size="xl">
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" className="mb-12">
                    {/* Company Info */}
                    <Stack gap="sm">
                        <Text size="lg" fw={700} className="gradient-text mb-2">
                            Plyo Property
                        </Text>
                        <Text size="sm" className="text-gray-400">
                            Connecting Norwegian home buyers with the perfect brokers.
                            Your trusted partner in finding your dream property.
                        </Text>
                        <Group gap="sm" className="mt-2">
                            <Anchor href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IconBrandTwitter size={20} />
                            </Anchor>
                            <Anchor href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IconBrandLinkedin size={20} />
                            </Anchor>
                            <Anchor href="#" className="text-gray-400 hover:text-white transition-colors">
                                <IconBrandGithub size={20} />
                            </Anchor>
                        </Group>
                    </Stack>

                    {/* Quick Links */}
                    <Stack gap="xs">
                        <Text size="sm" fw={600} className="text-gray-200 mb-2">
                            Quick Links
                        </Text>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            About Us
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            How It Works
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            For Brokers
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            Testimonials
                        </Anchor>
                    </Stack>

                    {/* Services */}
                    <Stack gap="xs">
                        <Text size="sm" fw={600} className="text-gray-200 mb-2">
                            Services
                        </Text>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            Find Brokers
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            Property Valuation
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            Market Analysis
                        </Anchor>
                        <Anchor href="#" size="sm" className="text-gray-400 hover:text-white transition-colors">
                            Consultation
                        </Anchor>
                    </Stack>

                    {/* Contact */}
                    <Stack gap="xs">
                        <Text size="sm" fw={600} className="text-gray-200 mb-2">
                            Contact Us
                        </Text>
                        <Group gap="xs">
                            <IconMapPin size={16} className="text-gray-400" />
                            <Text size="sm" className="text-gray-400">
                                Oslo, Norway
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <IconPhone size={16} className="text-gray-400" />
                            <Text size="sm" className="text-gray-400">
                                +47 123 456 789
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <IconMail size={16} className="text-gray-400" />
                            <Text size="sm" className="text-gray-400">
                                hello@plyoproperty.no
                            </Text>
                        </Group>
                    </Stack>
                </SimpleGrid>

                {/* Bottom Bar */}
                <Box className="pt-8 border-t border-gray-800">
                    <Group justify="space-between">
                        <Text size="xs" className="text-gray-500">
                            © 2025 Plyo Property. All rights reserved.
                        </Text>
                        <Group gap="lg">
                            <Anchor href="#" size="xs" className="text-gray-500 hover:text-white transition-colors">
                                Privacy Policy
                            </Anchor>
                            <Anchor href="#" size="xs" className="text-gray-500 hover:text-white transition-colors">
                                Terms of Service
                            </Anchor>
                            <Anchor href="#" size="xs" className="text-gray-500 hover:text-white transition-colors">
                                Cookie Policy
                            </Anchor>
                        </Group>
                    </Group>
                </Box>
            </Container>
        </Box>
    );
};