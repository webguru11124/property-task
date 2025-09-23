import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextInput,
    Button,
    Paper,
    Stack,
    Title,
    Text,
    Textarea,
    Autocomplete,
    Group,
    Container,
    Box,
    Transition,
    LoadingOverlay,
    Alert,
    Loader,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
    IconUser,
    IconMail,
    IconMapPin,
    IconMessage,
    IconSend,
    IconCheck,
    IconAlertCircle,
    IconSparkles,
} from '@tabler/icons-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { PhoneInput } from '../../../components/common/PhoneInput';
import { useCreateLead } from '../../../hooks/mutations/useCreateLead';
import { useCities } from '../../../hooks/queries/useCities';
import { leadFormSchema } from '../schemas/leadForm.schema';
import type { LeadFormValues } from '../schemas/leadForm.schema';

 type SubmitResult = { data?: unknown } | unknown;

 type FormValues = LeadFormValues;

 interface LeadCaptureFormProps {
     onSuccess?: (result: SubmitResult) => void;
 }

 export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSuccess }) => {
     const {
         register,
         handleSubmit,
         setValue,
         watch,
         formState: { errors, isSubmitting },
         reset
     } = useForm<FormValues>({
         resolver: zodResolver(leadFormSchema),
         defaultValues: {
             fullName: '',
             phone: '',
             email: '',
             city: undefined as unknown as { id: string; name: string },
             comment: ''
         },
     });

     const [search, setSearch] = React.useState('');
     const [debounced] = useDebouncedValue(search, 300);
     const { data: cities = [], isLoading: citiesLoading } = useCities(debounced);
     const createLead = useCreateLead();
     const [showSuccess, setShowSuccess] = React.useState(false);

     const selectedCity = watch('city');

     const onSubmit = async (values: FormValues) => {
         try {
             const payload = {
                 fullName: values.fullName,
                 phone: values.phone,
                 email: values.email,
                 cityId: values.city.id,
                 comment: values.comment,
             };

             const result = await createLead.mutateAsync(payload);

             notifications.show({
                 title: 'Success! 🎉',
                 message: 'Your information has been submitted. We\'ll match you with the best brokers!',
                 color: 'green',
                 icon: <IconCheck />,
             });

            setShowSuccess(true);
            reset();
            setTimeout(() => setShowSuccess(false), 5000);
            const unwrapped =
                typeof result === 'object' && result !== null && 'data' in (result as Record<string, unknown>)
                    ? (result as Record<string, unknown>).data
                    : result;
            if (onSuccess) onSuccess(unwrapped);
         } catch {
             notifications.show({
                 title: 'Oops! Something went wrong',
                 message: 'Failed to submit your information. Please try again.',
                 color: 'red',
                 icon: <IconAlertCircle />,
             });
         }
     };

     return (
         <Container size="sm" className="py-12">
             <Box className="text-center mb-10 animate-fade-in">
                 <Group justify="center" mb="md">
                     <Box className="p-3 rounded-xl gradient-brand inline-block">
                         <IconSparkles size={32} className="text-white" />
                     </Box>
                 </Group>
                 <Title order={1} className="text-4xl md:text-5xl font-bold mb-4">
                     <span className="gradient-text">Find Your Perfect Broker</span>
                 </Title>
                 <Text size="lg" c="dimmed" className="max-w-2xl mx-auto">
                     Connect with top-rated property brokers in Norway.
                     Get personalized matches based on your location and needs.
                 </Text>
             </Box>

             <Paper
                 shadow="xl"
                 radius="xl"
                 className="relative overflow-hidden card-hover"
                 style={{
                     background: 'rgba(255, 255, 255, 0.95)',
                     backdropFilter: 'blur(10px)',
                     border: '1px solid rgba(139, 92, 246, 0.1)',
                 }}
             >
                 <Box
                     className="absolute top-0 left-0 right-0 h-1 gradient-primary"
                 />

                 <LoadingOverlay
                     visible={createLead.isPending}
                     overlayProps={{ blur: 2 }}
                     loaderProps={{ color: 'brand', size: 'lg' }}
                 />

                 <Box p="xl">
                     <form onSubmit={handleSubmit(onSubmit)}>
                         <Stack gap="lg">
                             <TextInput
                                 label="Full Name"
                                 placeholder="Enter your full name"
                                 leftSection={<IconUser size={18} />}
                                 error={errors.fullName?.message}
                                 required
                                 size="md"
                                 classNames={{
                                     input: 'focus:border-brand-500',
                                 }}
                                 {...register('fullName')}
                             />

                             <Group grow>
                                 <div>
                                     <PhoneInput
                                         value={watch('phone') || ''}
                                         onChange={(val) => setValue('phone', val, { shouldValidate: true })}
                                         error={errors.phone?.message}
                                         label="Phone Number"
                                         required
                                     />
                                 </div>

                                 <TextInput
                                     label="Email Address"
                                     placeholder="your@email.com"
                                     leftSection={<IconMail size={18} />}
                                     error={errors.email?.message}
                                     required
                                     size="md"
                                     {...register('email')}
                                 />
                             </Group>

                             <Autocomplete
                                 label="City"
                                 leftSection={<IconMapPin size={18} />}
                                 data={cities.map(c => ({
                                     value: c.id,
                                     label: `${c.name}, ${c.county}`,
                                 }))}
                                 onChange={(value) => setSearch(value)}
                                 onOptionSubmit={(value: string) => {
                                     const city = cities.find(c => c.id === value);
                                     if (city) {
                                         setValue('city', { id: city.id, name: city.name });
                                     }
                                 }}
                                 rightSection={citiesLoading ? <Loader size="xs" /> : undefined}
                                 error={errors.city?.message}
                                 required
                                 size="md"
                                 limit={10}
                                 maxDropdownHeight={300}
                                 classNames={{
                                     dropdown: 'shadow-xl',
                                 }}
                             />

                             <Transition mounted={!!selectedCity} transition="fade-up" duration={300}>
                                 {(styles) => (
                                     <Alert
                                         style={styles}
                                         variant="light"
                                         color="brand"
                                         icon={<IconMapPin />}
                                         title="Selected Location"
                                     >
                                         {selectedCity?.name}
                                     </Alert>
                                 )}
                             </Transition>

                             <Textarea
                                 label="Additional Information"
                                 placeholder="Tell us more about what you're looking for..."
                                 leftSection={<IconMessage size={18} />}
                                 minRows={3}
                                 maxRows={5}
                                 size="md"
                                 {...register('comment')}
                             />

                             <Button
                                 type="submit"
                                 size="lg"
                                 loading={isSubmitting}
                                 disabled={createLead.isPending}
                                 leftSection={!isSubmitting && <IconSend size={20} />}
                                 className="hover-lift"
                                 style={{
                                     background: 'linear-gradient(135deg, rgb(139, 92, 246), rgb(14, 165, 233))',
                                 }}
                                 fullWidth
                             >
                                 {isSubmitting ? 'Finding Brokers...' : 'Find My Broker'}
                             </Button>
                         </Stack>
                     </form>

                     <Transition mounted={showSuccess} transition="slide-up" duration={400}>
                         {(styles) => (
                             <Alert
                                 style={styles}
                                 variant="filled"
                                 color="green"
                                 icon={<IconCheck />}
                                 title="Success!"
                                 mt="lg"
                             >
                                 We've received your information and will match you with the best brokers shortly!
                             </Alert>
                         )}
                     </Transition>
                 </Box>
             </Paper>

             <Group justify="center" mt="xl" gap="xl">
                 <Group gap="xs">
                     <IconCheck size={20} className="text-green-500" />
                     <Text size="sm" c="dimmed">Free Service</Text>
                 </Group>
                 <Group gap="xs">
                     <IconCheck size={20} className="text-green-500" />
                     <Text size="sm" c="dimmed">Verified Brokers</Text>
                 </Group>
                 <Group gap="xs">
                     <IconCheck size={20} className="text-green-500" />
                     <Text size="sm" c="dimmed">No Obligations</Text>
                 </Group>
             </Group>
         </Container>
     );
 };


