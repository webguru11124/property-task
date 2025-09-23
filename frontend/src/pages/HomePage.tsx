import { Box, Container, Title, Text, Group, ThemeIcon, SimpleGrid, Card, Badge, Button, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch, IconUserCheck, IconPhone } from '@tabler/icons-react';
import React from 'react';

import { Layout } from '../components/layout/Layout';
import { BrokerList } from '../features/brokers/components/BrokerList';
import type { BrokerMatchType, Broker } from '../features/brokers/types/broker.types';
import { LeadCaptureForm } from '../features/leads/components/LeadCaptureForm';
import { useAssignLead } from '../hooks/mutations/useAssignLead';
import { mapLeadResponseToUI } from '../utils';

 type BrokerResult = {
   id: string;
  brokerMatchType: BrokerMatchType;
   message: string;
   recommendedBrokers: Array<{
     id: string;
     name: string;
     address?: string;
     city?: string;
     phone?: string;
     email?: string;
     website?: string;
     distance?: number;
   }>;
 } | null;

 export default function HomePage() {
     const [brokerResults, setBrokerResults] = React.useState<BrokerResult>(null);
     const [assignedBrokerId, setAssignedBrokerId] = React.useState<string | null>(null);
     const assignLead = useAssignLead();

     const handleAssignBroker = async (leadId: string, brokerId: string) => {
         try {
             await assignLead.mutateAsync({ leadId, brokerId });
            setAssignedBrokerId(brokerId);
            notifications.show({
                title: 'Broker assigned',
                message: 'We\'ve shared your details with the selected broker. They\'ll contact you shortly.',
                color: 'green',
            });
         } catch (error) {
             console.error('Failed to assign broker:', error);
         }
     };

     return (
         <Layout>
             <Container size="lg" className="py-16">
                 <Box className="text-center mb-12">
                     <Title order={2} className="text-3xl mb-4">
                         How It Works
                     </Title>
                     <Text size="lg" c="dimmed">
                         Three simple steps to find your perfect broker
                     </Text>
                 </Box>

                 <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                     <Card
                         shadow="sm"
                         radius="lg"
                         className="text-center hover-lift"
                         style={{
                             background: 'rgba(255, 255, 255, 0.8)',
                             backdropFilter: 'blur(10px)',
                         }}
                     >
                         <Group justify="center" mb="md">
                             <ThemeIcon
                                 size="xl"
                                 radius="xl"
                                 variant="light"
                                 color="brand"
                             >
                                 <IconSearch size={24} />
                             </ThemeIcon>
                         </Group>
                         <Title order={4} mb="xs">
                             1. Submit Your Details
                         </Title>
                         <Text size="sm" c="dimmed">
                             Tell us about your location and property needs
                         </Text>
                     </Card>

                     <Card
                         shadow="sm"
                         radius="lg"
                         className="text-center hover-lift"
                         style={{
                             background: 'rgba(255, 255, 255, 0.8)',
                             backdropFilter: 'blur(10px)',
                         }}
                     >
                         <Group justify="center" mb="md">
                             <ThemeIcon
                                 size="xl"
                                 radius="xl"
                                 variant="light"
                                 color="blue"
                             >
                                 <IconUserCheck size={24} />
                             </ThemeIcon>
                         </Group>
                         <Title order={4} mb="xs">
                             2. Get Matched
                         </Title>
                         <Text size="sm" c="dimmed">
                             We find the best brokers in your area
                         </Text>
                     </Card>

                     <Card
                         shadow="sm"
                         radius="lg"
                         className="text-center hover-lift"
                         style={{
                             background: 'rgba(255, 255, 255, 0.8)',
                             backdropFilter: 'blur(10px)',
                         }}
                     >
                         <Group justify="center" mb="md">
                             <ThemeIcon
                                 size="xl"
                                 radius="xl"
                                 variant="light"
                                 color="green"
                             >
                                 <IconPhone size={24} />
                             </ThemeIcon>
                         </Group>
                         <Title order={4} mb="xs">
                             3. Connect
                         </Title>
                         <Text size="sm" c="dimmed">
                             Choose your broker and get in touch directly
                         </Text>
                     </Card>
                 </SimpleGrid>
             </Container>

            <LeadCaptureForm onSuccess={(data) => {
                setBrokerResults(mapLeadResponseToUI(data));
                setAssignedBrokerId(null);
            }} />

            {brokerResults && (
                assignedBrokerId ? (
                    (() => {
                        const selected = brokerResults.recommendedBrokers.find(b => b.id === assignedBrokerId);
                        if (!selected) return null;
                        return (
                            <Container size="lg" className="py-8">
                                <Card shadow="md" radius="lg" withBorder>
                                    <Stack gap="sm">
                                        <Title order={3}>You are connected with {selected.name}</Title>
                                        <Group gap="xs">
                                            <Badge variant="light" color="green">Assigned</Badge>
                                            {selected.city && <Badge variant="light" color="gray">{selected.city}</Badge>}
                                        </Group>
                                        {selected.address && (
                                            <Text size="sm" c="dimmed">{selected.address}</Text>
                                        )}
                                        <Group>
                                            {selected.phone && (
                                                <Button component="a" href={`tel:${selected.phone}`} variant="light" size="sm">Call</Button>
                                            )}
                                            {selected.email && (
                                                <Button component="a" href={`mailto:${selected.email}`} variant="light" size="sm">Email</Button>
                                            )}
                                        </Group>
                                        <Button variant="outline" size="sm" onClick={() => setAssignedBrokerId(null)}>Choose a different broker</Button>
                                    </Stack>
                                </Card>
                            </Container>
                        );
                    })()
                ) : (
                    <BrokerList
                        brokers={(brokerResults.recommendedBrokers || []).map((b) => ({
                            id: b.id,
                            name: b.name,
                            address: b.address,
                            city: b.city ?? '',
                            phone: b.phone,
                            email: b.email,
                            website: b.website,
                            distance: b.distance,
                        })) as Broker[]}
                        matchType={brokerResults.brokerMatchType}
                        message={brokerResults.message}
                        leadId={brokerResults.id}
                        onAssignBroker={handleAssignBroker}
                        assigningBrokerId={assignLead.isPending ? assignLead.variables?.brokerId : undefined}
                    />
                )
            )}

             <Container size="lg" className="py-16">
                 <Box className="text-center mb-12">
                     <Title order={2} className="text-3xl mb-4">
                         Why Choose Us
                     </Title>
                     <Text size="lg" c="dimmed">
                         The smartest way to find property brokers in Norway
                     </Text>
                 </Box>

                 <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                     <Box>
                         <Title order={3} mb="md">
                             Local Expertise
                         </Title>
                         <Text c="dimmed">
                             Our brokers have deep knowledge of Norwegian property markets,
                             regulations, and local neighborhoods.
                         </Text>
                     </Box>

                     <Box>
                         <Title order={3} mb="md">
                             Verified Professionals
                         </Title>
                         <Text c="dimmed">
                             All brokers are thoroughly vetted and licensed,
                             ensuring you work with trusted professionals.
                         </Text>
                     </Box>

                     <Box>
                         <Title order={3} mb="md">
                             Smart Matching
                         </Title>
                         <Text c="dimmed">
                             Our algorithm finds brokers based on your location,
                             preferences, and specific requirements.
                         </Text>
                     </Box>

                     <Box>
                         <Title order={3} mb="md">
                             Free Service
                         </Title>
                         <Text c="dimmed">
                             No fees, no obligations. Connect with brokers
                             at no cost and choose who you want to work with.
                         </Text>
                     </Box>
                 </SimpleGrid>
             </Container>
         </Layout>
     );
 }