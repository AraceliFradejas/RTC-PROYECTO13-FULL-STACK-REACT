import { describe, it, expect } from 'vitest';
import { madridDateTime } from './madridTime.js';
describe('horario de Madrid', () => {
  it('convierte una cita de verano', () => expect(madridDateTime('2026-10-05', '10:00')).toBe('2026-10-05T08:00:00.000Z'));
  it('convierte una cita de invierno', () => expect(madridDateTime('2026-11-02', '10:00')).toBe('2026-11-02T09:00:00.000Z'));
  it('rechaza una fecha inexistente como entrada vacía', () => expect(() => madridDateTime('', '10:00')).toThrow());
});
