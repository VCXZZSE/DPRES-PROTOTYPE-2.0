import { schools, colleges } from './institutionsData';
import type { Institution } from './institutionsData';

/**
 * Helper function to get institution by ID
 */
export function getInstitutionById(id: string): Institution | null {
  const allInstitutions = [...schools, ...colleges];
  return allInstitutions.find(inst => inst.id === id) || null;
}
