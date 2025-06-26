import { AddUUID } from './add-uuid.pipe';

describe('AddUUID', () => {
  let service: AddUUID;

  beforeAll(async () => {
    service = new AddUUID();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should return the value with an UUID', async () => {
    const value = { name: 'John Doe' };
    expect(service.transform(value).id).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    );
  });
});
