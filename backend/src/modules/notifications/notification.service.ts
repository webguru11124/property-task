export class NotificationService {
    async notifyBrokerByEmail(brokerEmail: string, payload: { leadId: string; message: string }) {
        // Mock: In real system integrate with Mailgun/SES/etc.
        // eslint-disable-next-line no-console
        console.log(`📧 Mock email to ${brokerEmail}:`, payload);
        return { delivered: true };
    }
}


