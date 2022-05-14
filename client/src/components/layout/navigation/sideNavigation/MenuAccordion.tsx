import { Accordion, ThemeIcon } from "@mantine/core";
import { Checklist, Home } from "tabler-icons-react";
import StyledAccordion from "./StyledAccordion";

function MenuAccordian() {
  return (
    <StyledAccordion initialItem={0}>
      <Accordion.Item
        label="Customization"
        icon={<Home />}
      >
        HI
      </Accordion.Item>
      <Accordion.Item
        label="Customization"
        icon={<Checklist />}
      >
        HI
      </Accordion.Item>
    </StyledAccordion>
  );
}

export default MenuAccordian;