import { render, screen } from "@testing-library/react";

import Text from "./Text";

describe("Text", () => {
  it('renders a span by default when no "as" prop is given', () => {
    const { container } = render(<Text />);

    expect(container.firstElementChild?.tagName.toLocaleLowerCase()).toEqual("span");
  });

  it.each(["h1", "h2", "label", "div"])('renders a %s element when "as" is set to "%s"', (tag) => {
    const { container } = render(<Text as={tag} />);
    expect(container.firstElementChild?.tagName.toLocaleLowerCase()).toBe(tag);
  });

  // it.each(variants)('applies the "%s" variant styles', () => {});

  it("renders its children unchanged", () => {
    const classProps = {
      className: "name1 name2 name3 name4",
      width: "10px",
    };

    render(
      <Text as="span" {...classProps}>
        Event Planner!
      </Text>,
    );

    const el = screen.getByText(/Event Planner!/);

    expect(el.textContent).toBe("Event Planner!");

    expect(el.attributes.getNamedItem("class")?.textContent).toBe(classProps.className);
    expect(el.attributes.getNamedItem("width")?.textContent).toBe(classProps.width);
  });

  it("keeps the variant styles when a className is passed", () => {});
});
