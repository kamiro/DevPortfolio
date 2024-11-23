export const cartesianProduct = (options: Record<string, string[]>): Record<string, string>[] => {
  const keys = Object.keys(options);

  const generateCombinations = (index: number): Record<string, string>[] => {
    if (index === keys.length) {
      return [{}];
    }

    const key = keys[index];
    const values = options[key];
    const combinations = generateCombinations(index + 1);
    const result: Record<string, string>[] = [];

    for (const value of values) {
      for (const combination of combinations) {
        result.push({ ...combination, [key]: value });
      }
    }

    return result;
  };

  return generateCombinations(0);
}