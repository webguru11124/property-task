import React from 'react';
import {
    Container,
    Title,
    Text,
    SimpleGrid,
    Box,
    Group,
    Badge,
    Skeleton,
    Alert,
    Stack,
    Transition,
} from '@mantine/core';
import { IconInfoCircle, IconMapPin } from '@tabler/icons-react';
import { BrokerCard } from './BrokerCard';
import type { BrokerListProps } from '../types/broker.types';

export const BrokerList: React.FC<BrokerListProps> = ({
    brokers,
    loading = false,
    matchType = 'all',
    message,
    onAssignBroker,
    assigningBrokerId,
    leadId,
}) => {
    const [showList, setShowList] = React.useState(false);

    React.useEffect(() => {
        if (brokers.length > 0) {
            setTimeout(() => setShowList(true), 100);
        }
    }, [brokers.length]);

    const getMatchTypeColor = () => {
        switch (matchType) {
            case 'local':
                return 'green';
            case 'nearby':
                return 'blue';
            default:
                return 'brand';
        }
    };

    const getMatchTypeIcon = () => {
        switch (matchType) {
            case 'local':
                return <IconMapPin size={16} />;
            case 'nearby':
                return <IconInfoCircle size={16} />;
            default:
                return <IconInfoCircle size={16} />;
        }
    };

    if (loading) {
        return (
            <Container size="lg" className="py-8">
                <Skeleton height={40} width="40%" mb="lg" />
                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height={250} radius="lg" />
                    ))}
                </SimpleGrid>
            </Container>
        );
    }

    if (brokers.length === 0) {
        return (
            <Container size="lg" className="py-8">
                <Alert variant="light" color="gray" title="No brokers found" icon={<IconInfoCircle />}>
                    We couldn't find any broker offices for your search. Try another city.
                </Alert>
            </Container>
        );
    }

    return (
        <Container size="lg" className="py-8">
            <Transition mounted={showList} transition="fade-up" duration={500}>
                {(styles) => (
                    <Box style={styles}>
                        {/* Header Section */}
                        <Box className="text-center mb-8">
                            <Badge
                                leftSection={getMatchTypeIcon()}
                                size="lg"
                                variant="light"
                                color={getMatchTypeColor()}
                                className="mb-4"
                            >
                                {matchType === 'local'
                                    ? 'Local Brokers'
                                    : matchType === 'nearby'
                                        ? 'Nearby Brokers'
                                        : 'Recommended Brokers'}
                            </Badge>

                            <Title order={2} className="mb-2">
                                We Found{' '}
                                <span className="gradient-text">{brokers.length} Brokers</span> for You
                            </Title>

                            {message && (
                                <Text size="lg" c="dimmed" className="max-w-2xl mx-auto">
                                    {message}
                                </Text>
                            )}
                        </Box>

                        {/* Info Alert */}
                        {matchType === 'nearby' && (
                            <Alert
                                variant="light"
                                color="blue"
                                title="Expanded Search Results"
                                icon={<IconInfoCircle />}
                                mb="lg"
                            >
                                We couldn't find brokers in your exact location, but these nearby offices
                                can serve your area effectively.
                            </Alert>
                        )}

                        {/* Broker Cards Grid */}
                        <SimpleGrid
                            cols={{ base: 1, md: 2, lg: 3 }}
                            spacing="lg"
                            className="animate-fade-in"
                        >
                            {brokers.map((broker) => (
                                <Transition
                                    key={broker.id}
                                    mounted={showList}
                                    transition="slide-up"
                                    duration={400}
                                    timingFunction="ease"
                                    exitDuration={200}
                                >
                                    {(styles) => (
                                        <div style={styles}>
                                            <BrokerCard
                                                broker={broker}
                                                matchType={
                                                    matchType === 'local'
                                                        ? 'local'
                                                        : broker.distance && broker.distance < 50
                                                            ? 'nearby'
                                                            : 'recommended'
                                                }
                                                onAssign={
                                                    onAssignBroker && leadId
                                                        ? (brokerId: string) => onAssignBroker(leadId, brokerId)
                                                        : undefined
                                                }
                                                isAssigning={assigningBrokerId === broker.id}
                                            />
                                        </div>
                                    )}
                                </Transition>
                            ))}
                        </SimpleGrid>

                        {/* Statistics Bar */}
                        <Group justify="center" mt="xl" gap="xl" className="text-center">
                            <Stack gap={4}>
                                <Text size="xl" fw={700} className="gradient-text">
                                    {brokers.length}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Available Brokers
                                </Text>
                            </Stack>
                            {matchType === 'nearby' && (
                                <Stack gap={4}>
                                    <Text size="xl" fw={700} className="gradient-text">
                                        {brokers[0]?.distance
                                            ? `${brokers[0].distance.toFixed(1)} km`
                                            : 'N/A'}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Nearest Office
                                    </Text>
                                </Stack>
                            )}
                            <Stack gap={4}>
                                <Text size="xl" fw={700} className="gradient-text">
                                    100%
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Verified
                                </Text>
                            </Stack>
                        </Group>
                    </Box>
                )}
            </Transition>
        </Container>
    );
};



