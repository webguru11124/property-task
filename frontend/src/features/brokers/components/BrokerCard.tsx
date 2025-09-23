import React from 'react';
import {
    Card,
    Group,
    Text,
    Badge,
    Button,
    Stack,
    ThemeIcon,
    ActionIcon,
    Tooltip,
    Avatar,
} from '@mantine/core';
import {
    IconPhone,
    IconMail,
    IconMapPin,
    IconBuilding,
    IconRoute,
    IconStar,
    IconExternalLink,
    IconUserCheck,
    IconSparkles,
} from '@tabler/icons-react';

import type { Broker } from '../types/broker.types';
interface BrokerCardProps {
    broker: Broker;
    matchType?: 'local' | 'nearby' | 'recommended';
    onAssign?: (brokerId: string) => void;
    isAssigning?: boolean;
}

export const BrokerCard: React.FC<BrokerCardProps> = ({
    broker,
    matchType = 'recommended',
    onAssign,
    isAssigning = false,
}) => {
    const cityName = typeof broker.city === 'string' ? broker.city : broker.city?.name || '';

    const getMatchBadge = () => {
        switch (matchType) {
            case 'local':
                return (
                    <Badge
                        leftSection={<IconMapPin size={14} />}
                        variant="light"
                        color="green"
                        size="sm"
                    >
                        Local Office
                    </Badge>
                );
            case 'nearby':
                return (
                    <Badge
                        leftSection={<IconRoute size={14} />}
                        variant="light"
                        color="blue"
                        size="sm"
                    >
                        Nearby
                    </Badge>
                );
            default:
                return (
                    <Badge
                        leftSection={<IconSparkles size={14} />}
                        variant="light"
                        color="brand"
                        size="sm"
                    >
                        Recommended
                    </Badge>
                );
        }
    };

    return (
        <Card
            shadow="md"
            radius="lg"
            withBorder
            className="hover-lift transition-all duration-300 border-gray-200 hover:border-brand-200"
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Group justify="space-between" align="flex-start" mb="md">
                <Group>
                    <Avatar
                        size="lg"
                        radius="md"
                        className="gradient-brand"
                    >
                        <IconBuilding size={24} className="text-white" />
                    </Avatar>
                    <div>
                        <Text fw={600} size="lg" className="mb-1">
                            {broker.name}
                        </Text>
                        <Group gap="xs">
                            {getMatchBadge()}
                            {broker.distance != null && (
                                <Badge variant="outline" color="gray" size="sm">
                                    {broker.distance.toFixed(1)} km
                                </Badge>
                            )}
                            {broker.rating && (
                                <Badge
                                    leftSection={<IconStar size={14} />}
                                    variant="dot"
                                    color="yellow"
                                    size="sm"
                                >
                                    {broker.rating}
                                </Badge>
                            )}
                        </Group>
                    </div>
                </Group>

                {broker.website && (
                    <Tooltip label="Visit Website">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="lg"
                            radius="md"
                            component="a"
                            href={broker.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit website of ${broker.name}`}
                        >
                            <IconExternalLink size={18} />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Group>

            <Stack gap="sm" mb="md">
                <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="gray" radius="md">
                        <IconMapPin size={14} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                        {broker.address}
                    </Text>
                </Group>

                <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="gray" radius="md">
                        <IconBuilding size={14} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">
                        {cityName}
                    </Text>
                </Group>

                {broker.phone && (
                    <Group gap="xs">
                        <ThemeIcon size="sm" variant="light" color="blue" radius="md">
                            <IconPhone size={14} />
                        </ThemeIcon>
                        <Text
                            size="sm"
                            component="a"
                            href={`tel:${broker.phone}`}
                            className="text-blue-600 hover:underline"
                        >
                            {broker.phone}
                        </Text>
                    </Group>
                )}

                {broker.email && (
                    <Group gap="xs">
                        <ThemeIcon size="sm" variant="light" color="brand" radius="md">
                            <IconMail size={14} />
                        </ThemeIcon>
                        <Text
                            size="sm"
                            component="a"
                            href={`mailto:${broker.email}`}
                            className="text-brand-600 hover:underline"
                        >
                            {broker.email}
                        </Text>
                    </Group>
                )}
            </Stack>

            <Group gap="sm">
                <Button
                    variant="light"
                    leftSection={<IconPhone size={16} />}
                    size="sm"
                    className="flex-1"
                    disabled={!broker.phone}
                    aria-label={broker.phone ? `Call ${broker.name}` : 'Phone not available'}
                >
                    Call Now
                </Button>

                {onAssign && (
                    <Button
                        variant="filled"
                        leftSection={!isAssigning && <IconUserCheck size={16} />}
                        size="sm"
                        loading={isAssigning}
                        onClick={() => onAssign(broker.id)}
                        className="flex-1"
                        style={{
                            background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(14, 165, 233))',
                        }}
                        aria-label={`Choose broker ${broker.name}`}
                    >
                        {isAssigning ? 'Assigning...' : 'Choose Broker'}
                    </Button>
                )}
            </Group>
        </Card>
    );
};




