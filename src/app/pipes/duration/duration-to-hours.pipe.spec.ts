import { DurationToHoursPipe } from './duration-to-hours.pipe';

describe('DurationToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationToHoursPipe();

    expect(pipe).toBeTruthy();
  });
});
