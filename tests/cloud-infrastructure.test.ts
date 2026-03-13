import { CloudInfrastructureSystem } from '../main';

describe('CloudInfrastructureSystem', () => {
  let system: CloudInfrastructureSystem;

  beforeEach(() => {
    system = new CloudInfrastructureSystem();
  });

  test('should initialize the system successfully', async () => {
    await system.initialize();
    const exported = system.exportData();
    expect(exported.data.length).toBeGreaterThan(0);
    expect(exported.metadata.systemVersion).toBe('1.0.0');
  });

  test('should process data and return analysis results', async () => {
    await system.initialize();
    const results = await system.processData();
    expect(results.summary.totalRecords).toBeGreaterThan(0);
    expect(results.summary.averageValue).toBeGreaterThan(0);
    expect(results.summary.processingTime).toBeGreaterThanOrEqual(0);
    expect(results.insights.length).toBeGreaterThan(0);
  });

  test('should export data with correct metadata', async () => {
    await system.initialize();
    const exported = system.exportData();
    expect(exported.metadata).toHaveProperty('exportTime');
    expect(exported.metadata).toHaveProperty('recordCount');
    expect(exported.data.length).toBe(exported.metadata.recordCount);
  });

  test('should accept custom configuration', async () => {
    await system.initialize({ batchSize: 500, timeout: 10000 });
    const exported = system.exportData();
    expect(exported.data.length).toBeGreaterThan(0);
  });
});
