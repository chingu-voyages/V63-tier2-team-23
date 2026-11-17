import { render, screen } from "@testing-library/react";

import Text, { type TextVariant } from "./Text";
import { ElementType } from "react";

describe("Text", () => {
  it('renders a span by default when no "as" prop is given', () => {
    const { container } = render(<Text />);

    expect(container.firstElementChild?.tagName.toLocaleLowerCase()).toEqual("span");
  });

  it.each(["h1", "h2", "label", "div"] as ElementType[])(
    'renders a %s element when "as" is set to "%s"',
    (tag) => {
      const { container } = render(<Text as={tag} />);
      expect(container.firstElementChild?.tagName.toLocaleLowerCase()).toBe(tag);
    },
  );

  it.each([
    "display",
    "title",
    "headline",
    "subheadline",
    "body",
    "label",
    "caption",
  ] as TextVariant[])('applies the "%s" variant styles', (variant) => {
    render(<Text variant={variant}>Testing</Text>);
    const el = screen.getByText(/Testing/);

    if (["display", "title", "headline"].includes(variant)) {
      expect(el.classList.contains("font-sans!")).toBe(true);
    } else {
      expect(el.classList.contains("font-sans2!")).toBe(true);
    }

    expect(el.classList.contains(`text-${variant}!`)).toBe(true);
  });

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

    expect(el.attributes.getNamedItem("class")?.textContent).toContain(classProps.className);
    expect(el.attributes.getNamedItem("width")?.textContent).toContain(classProps.width);
  });
});
