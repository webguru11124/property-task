export class NotificationService {
  notifyBrokerByEmail(
    brokerEmail: string,
    payload: { leadId: string; message: string },
  ): { delivered: true } {
    console.log(`📧 Mock email to ${brokerEmail}:`, payload);
    return { delivered: true };
  }
}
