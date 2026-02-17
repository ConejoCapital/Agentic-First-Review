import type { PersonaDefinition } from "../prompts";
import { wave1Personas } from "./wave-1-technical";
import { wave2Personas } from "./wave-2-business";
import { wave3Personas } from "./wave-3-users";
import { wave4Personas } from "./wave-4-specialists";
import { wave5Personas } from "./wave-5-edge-cases";

export const allPersonas: PersonaDefinition[] = [
  ...wave1Personas,
  ...wave2Personas,
  ...wave3Personas,
  ...wave4Personas,
  ...wave5Personas,
];

export function getWavePersonas(waveNumber: number): PersonaDefinition[] {
  switch (waveNumber) {
    case 1:
      return wave1Personas;
    case 2:
      return wave2Personas;
    case 3:
      return wave3Personas;
    case 4:
      return wave4Personas;
    case 5:
      return wave5Personas;
    default:
      return [];
  }
}

export {
  wave1Personas,
  wave2Personas,
  wave3Personas,
  wave4Personas,
  wave5Personas,
};
