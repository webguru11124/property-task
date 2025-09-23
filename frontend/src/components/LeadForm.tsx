import React from 'react';
import { TextInput, Button, Paper, Stack, Title, Textarea, Autocomplete, Group, Badge, Text, Divider } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@mantine/hooks';
import { useCities } from '../hooks/queries/useCities';
import { useCreateLead } from '../hooks/mutations/useCreateLead';
import { useAssignLead } from '../hooks/mutations/useAssignLead';

const schema = z.object({
    fullName: z.string().min(2),
    phone: z.string().min(5),
    email: z.string().email(),
    city: z.object({ id: z.string() }),
    comment: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const LeadForm: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { fullName: '', phone: '', email: '', city: undefined as any, comment: '' },
    });

    const [search, setSearch] = React.useState('');
    const [debounced] = useDebouncedValue(search, 300);
    const { data: cities = [], isLoading } = useCities(debounced);
    const createLead = useCreateLead();
    const assignLead = useAssignLead();
    const [results, setResults] = React.useState<any | null>(null);

    const onSubmit = async (values: FormValues) => {
        const payload = {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email,
            cityId: values.city.id,
            comment: values.comment,
        };
        const res = await createLead.mutateAsync(payload);
        setResults(res?.data ?? null);
    };

    return (
        <Paper shadow="sm" p="lg" radius="md" maw={600} mx="auto">
            <Title order={2} mb="lg">Find Your Perfect Broker</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <TextInput label="Full Name" {...register('fullName')} error={errors.fullName?.message} required />
                    <TextInput label="Phone" {...register('phone')} error={errors.phone?.message} required />
                    <TextInput label="Email" {...register('email')} error={errors.email?.message} required />
                    <Autocomplete
                        label="City"
                        placeholder="Search Norwegian cities"
                        data={cities.map(c => ({ value: c.id, label: `${c.name}, ${c.county}` }))}
                        onChange={(v) => setSearch(v)}
                        onOptionSubmit={(value: string) => {
                            const city = cities.find(c => c.id === value);
                            if (city) setValue('city', { id: city.id } as any);
                        }}
                        rightSection={isLoading ? <>…</> : undefined}
                        required
                    />
                    <Textarea label="Comment" {...register('comment')} minRows={3} />
                    <Button type="submit" loading={createLead.isPending}>Find Brokers</Button>
                </Stack>
            </form>

            {results && (
                <>
                    <Divider my="lg" />
                    <Title order={3} mb="sm">Recommended Brokers</Title>
                    <Text size="sm" mb="md">{results.message} ({results.brokerMatchType})</Text>
                    <Stack>
                        {(results.recommendedBrokers ?? []).map((b: any) => (
                            <Paper key={b.id} withBorder p="md" radius="md">
                                <Group justify="space-between" align="flex-start">
                                    <div>
                                        <Text fw={600}>{b.name}</Text>
                                        <Text size="sm" c="dimmed">{b.address}</Text>
                                        <Text size="sm" c="dimmed">{b.city?.name || b.city || ''}</Text>
                                        <Group gap="xs" mt={6}>
                                            {b.phone && <Badge variant="light">{b.phone}</Badge>}
                                            {b.email && <Badge variant="light">{b.email}</Badge>}
                                            {b.distance != null && <Badge color="blue" variant="light">{Number(b.distance).toFixed(1)} km</Badge>}
                                        </Group>
                                    </div>
                                    <Button size="xs" variant="light" loading={assignLead.isPending} onClick={() => assignLead.mutate({ leadId: results.id, brokerId: b.id })}>
                                        Assign
                                    </Button>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </>
            )}
        </Paper>
    );
};


