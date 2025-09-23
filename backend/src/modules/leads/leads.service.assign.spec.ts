import { LeadsService } from './leads.service';
import { Repository, ObjectLiteral } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { City } from '../cities/entities/city.entity';
import { BrokerOffice } from '../brokers/entities/broker-office.entity';
import { BrokersService } from '../brokers/brokers.service';
import { NotificationService } from '../notifications/notification.service';

describe('LeadsService.assignLead', () => {
  function repo<T extends ObjectLiteral>(
    impl: Partial<Repository<T>>,
  ): Repository<T> {
    return impl as Repository<T>;
  }

  it('assigns broker and sends notification when email present', async () => {
    const lead: any = { id: 'lead-1', full_name: 'U', email: 'u@example.com' };
    const broker: any = { id: 'broker-1', email: 'b@example.com' };

    const leadRepo = repo<Lead>({
      findOne: jest.fn().mockResolvedValue(lead),
      save: jest
        .fn()
        .mockImplementation((l: any) => Promise.resolve({ ...lead, ...l })),
    });
    const cityRepo = repo<City>({} as any);
    const brokerRepo = repo<BrokerOffice>({
      findOne: jest.fn().mockResolvedValue(broker),
    });
    const brokersService = new BrokersService(
      brokerRepo,
      cityRepo,
    );
    jest
      .spyOn(brokersService, 'getRecommendedBrokers')
      .mockResolvedValue({ brokers: [], type: 'none', message: '' });
    const notificationService = new NotificationService();
    jest
      .spyOn(notificationService, 'notifyBrokerByEmail')
      .mockReturnValue({ delivered: true });

    const service = new LeadsService(
      leadRepo,
      cityRepo,
      brokerRepo,
      brokersService,
      notificationService,
    );

    const res = await service.assignLead('lead-1', 'broker-1');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(leadRepo.findOne).toHaveBeenCalledWith({ where: { id: 'lead-1' } });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(leadRepo.save).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(brokerRepo.findOne).toHaveBeenCalledWith({
      where: { id: 'broker-1' },
    });
    const { notifyBrokerByEmail } = notificationService;
    expect(notifyBrokerByEmail).toHaveBeenCalledWith(
      'b@example.com',
      expect.any(Object),
    );
    expect(res.success).toBe(true);
    expect(res.data.assignedBrokerId).toBe('broker-1');
    expect(res.data.notificationSent).toBe(true);
  });
});
