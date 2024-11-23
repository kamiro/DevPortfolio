import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentLocationAtom = atom<GeolocationPosition | undefined | null>();
export const locationPermissionAtom = atom<PermissionState | undefined>();
export const isMetricAtom = atomWithStorage<boolean>('isMetric', true);
