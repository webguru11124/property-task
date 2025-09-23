import { validateSync } from 'class-validator';
import { CreateLeadDto } from './create-lead.dto';

describe('CreateLeadDto', () => {
  it('should fail on invalid email', () => {
    const dto = new CreateLeadDto();
    dto.fullName = 'Test User';
    dto.phone = '+4791234567';
    dto.email = 'not-an-email';
    dto.cityId = '550e8400-e29b-41d4-a716-446655440001';
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'email')).toBe(true);
  });
});
