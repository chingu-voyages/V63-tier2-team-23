import Text from "./Text.tsx";

describe("Text", () => {
  it('renders a span by default when no "as" prop is given', () => {});

  it.each(["h1", "h2", "label", "div"])('renders a %s element when "as" is set to "%s"', () => {});

  it.each(variants)('applies the "%s" variant styles', () => {});

  it("renders its children unchanged", () => {});

  it("keeps the variant styles when a className is passed", () => {});
});
