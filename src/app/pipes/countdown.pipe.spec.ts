import { Countdown } from './countdown.pipe';

describe('CountdownPipePipe', () => {
  it('create an instance', () => {
    const pipe = new Countdown();
    expect(pipe).toBeTruthy();
  });
});
