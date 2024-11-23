import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'jotai';
import { getCurrentPosition, useLocation, useLocationPermission } from "./hooks";



describe("Unsupported browsers with dated navigator", () => {
  const oldNavigator = global.navigator;

  beforeEach(() => {
    Object.defineProperty(global, "navigator", {
      value: {},
      configurable: true
    });
  })

  afterEach(() => {
    Object.defineProperty(global, "navigator", {
      value: oldNavigator
    });
  })

  test("getCurrentPosition should return null", async () => {
    const position = await getCurrentPosition();

    expect(position).toBe(null);
  });

  test("useLocationPermissions should update to denied", async () => {
    const { result } = renderHook(() => useLocationPermission(), { wrapper: Provider });

    expect(result.current.locationPermission).toBeUndefined();

    act(() => {
      result.current.updateLocationPermission();
    });

    expect(result.current.locationPermission).toBe("denied");
  });

  test("useLocation should be denied with null location", async () => {
    const { result } = renderHook(() => useLocation(), { wrapper: Provider });

    expect(result.current.locationPermission).toBe("denied");
    expect(result.current.currentLocation).toBeNull();
  });
})

describe("Report the navigator's Permission API", () => {
  const originalPermissions = global.navigator.permissions;

  const mockNavigatorPermissions = {
    query: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(global.navigator, "permissions", {
      value: mockNavigatorPermissions,
      configurable: true
    });
  });

  afterEach(() => {
    Object.defineProperty(global.navigator, "permissions", {
      value: originalPermissions,
      configurable: true
    });
  });

  const initialLocationState = [
    { state: 'granted' }, // There is no geolocation available, so null.
    { state: 'denied' },
    { state: 'prompt' },
  ]
  test.each(initialLocationState)('when permission is "$state"', async ({ state }) => {
    mockNavigatorPermissions.query.mockResolvedValue({ state });
    const { result } = renderHook(() => useLocation(), { wrapper: Provider });

    expect(result.current.locationPermission).toBeUndefined();

    await waitFor(() => {
      expect(mockNavigatorPermissions.query).toHaveBeenCalled();
      expect(result.current.locationPermission).toBe(state);
    });
  })
})

describe("Only access navigator's Geolocation API selectively", () => {
  const originalGeolocation = global.navigator.geolocation;
  const originalPermissions = global.navigator.permissions;

  const mockNavigatorPermissions = {
    query: jest.fn(),
  };

  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(global.navigator, "permissions", {
      value: mockNavigatorPermissions,
      configurable: true
    });

    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true
    });

    mockGeolocation.getCurrentPosition.mockClear()
    mockGeolocation.watchPosition.mockClear()
  })

  afterEach(() => {
    Object.defineProperty(global.navigator, "permissions", {
      value: originalPermissions,
      configurable: true
    });

    Object.defineProperty(global.navigator, "geolocation", {
      value: originalGeolocation,
      configurable: true
    });
  });

  const useLocationSetup = [
    { state: 'granted', initCurrentLocation: undefined, calledGeolocation: true }, // There is no geolocation available, so null.
    { state: 'denied', initCurrentLocation: null, calledGeolocation: false },
    { state: 'prompt', initCurrentLocation: undefined, calledGeolocation: false },
  ]
  test.each(useLocationSetup)('when permission "$state", currentLocation is "$initCurrentLocation" while geolocation called "$calledGeolocation"', async ({ state, initCurrentLocation, calledGeolocation }) => {
    mockNavigatorPermissions.query.mockResolvedValue({ state });
    const { result } = renderHook(() => useLocation(), { wrapper: Provider });

    expect(result.current.locationPermission).toBeUndefined();

    await waitFor(() => {
      expect(result.current.currentLocation).toBe(initCurrentLocation);
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(calledGeolocation ? 1 : 0);
    });
  })
})
