import React from 'react';
import { PhoneInput as IntlPhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Text } from '@mantine/core';

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
                inputStyle={{
                    width: '100%',
                    height: '42px',
                    fontSize: '14px',
                    borderColor: error ? '#fa5252' : '#ced4da',
                }}
                containerStyle={{ width: '100%' }}
                preferredCountries={["no", "se", "dk", "fi"]}
                enableSearch={true}
                searchPlaceholder="Search countries..."
            />
            {error && (
                <Text c="red" size="xs" mt={4}>
                    {error}
                </Text>
            )}
        </div>
    );
};


