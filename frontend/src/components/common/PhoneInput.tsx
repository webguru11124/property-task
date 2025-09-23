import { Text } from '@mantine/core';
import React from 'react';
import { PhoneInput as IntlPhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
}

export const PhoneInput: React.FC<Props> = ({ value, onChange, error, label = 'Phone Number', required = false }) => {
    return (
        <div>
            {label && (
                <Text size="sm" fw={500} mb={4}>
                    {label} {required && <span className="text-red-500">*</span>}
                </Text>
            )}
            <IntlPhoneInput
                defaultCountry="no"
                value={value}
                onChange={(phone) => onChange(phone)}
                style={{ width: '100%' }}
            />
            {error && (
                <Text c="red" size="xs" mt={4}>
                    {error}
                </Text>
            )}
        </div>
    );
};


