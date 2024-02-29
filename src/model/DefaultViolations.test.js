import { DefaultViolations } from "./DefaultViolations";

describe("Default Violations", () => {
  it("Ensure there is more than 50 default violations", () => {
    expect(DefaultViolations.length).toBeGreaterThan(50);
  });

  it("Ensure default violations have name and description", () => {
    DefaultViolations.map(({ name, description }) => {
      expect(name.length).toBeGreaterThan(0);
      expect(description.length).toBeGreaterThan(0);
    });
  });
});
