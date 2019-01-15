import { MiddleModule } from './middle.module';

describe('MiddleModule', () => {
  let middleModule: MiddleModule;

  beforeEach(() => {
    middleModule = new MiddleModule();
  });

  it('should create an instance', () => {
    expect(middleModule).toBeTruthy();
  });
});
