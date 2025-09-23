import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';
import { type ErrorInfo, type ReactNode, Component } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <Container size="sm" className="py-20 text-center">
                    <Box className="mb-8">
                        <Box className="inline-flex p-4 rounded-full bg-red-50 mb-4">
                            <IconAlertTriangle size={48} className="text-red-500" />
                        </Box>
                        <Title order={1} className="text-3xl mb-4">
                            Oops! Something went wrong
                        </Title>
                        <Text size="lg" c="dimmed" className="mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </Text>
                        {this.state.error && (
                            <Box className="p-4 rounded-lg bg-gray-50 text-left mb-6">
                                <Text size="sm" c="dimmed" className="font-mono">
                                    {this.state.error.message}
                                </Text>
                            </Box>
                        )}
                        <Group justify="center">
                            <Button
                                size="lg"
                                leftSection={<IconRefresh size={20} />}
                                onClick={this.handleReset}
                                className="hover-lift"
                            >
                                Refresh Page
                            </Button>
                        </Group>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}