import React from "react";
import { Box, Text } from "@src/components";
import { useI18n } from "@src/infra/i18n";
import styled from "styled-components";

const StyledText = styled(Text)<any>`
  position: relative;

  &::after {
    left: 0;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(145.25deg, #1822DC 4.09%, #1822DC 81.45%);
    box-shadow: 0px 5px 51px #969DFF;
    border-radius: 14px;
    cursor: pointer;
    position: absolute;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s;
  }
  &:hover,
  &.active {
    &::after {
      opacity: 1;
    }
  }
`;

interface GuidesFilterProps {
  filter: string;
  // eslint-disable-next-line no-unused-vars
  setFilter: (filter: string) => void;
}
export function GuidesFilter({ filter, setFilter }: GuidesFilterProps) {
  const i18n = useI18n();

  return (
    <Box
      styleSheet={{
        marginTop: {
          xs: "40px",
          md: "64px",
        },
        maxWidth: {
          xs: "300px",
          md: "900px",
        },
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: {
          xs: "12px",
          md: "16px",
        },
      }}
      role="tablist"
      aria-orientation="horizontal"
    >
      {i18n.contentRaw("GUIDE.FILTERS").map(({ label, value }) => (
        <StyledText
          tag="label"
          className={filter === value ? "active" : ""}
          tabIndex={0}
          htmlFor={`filterradio_${value}`}
          key={value}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === " ")
              event.target.click();
          }}
          styleSheet={{
            cursor: "pointer",
            fontSize: {
              xs: "13px",
              md: "16px",
            },
            borderRadius: "8px",
            padding: "14px",
            border: "1px solid #1822DC",
            fontWeight: "600",
            color: filter === value ? "#FAFAFA" : "#FFFFFF",
            backgroundColor: filter === value ? "#1822DC" : "transparent",
            transition: "all 0.2s ease-in-out",
            hover: {      
              color: "#FAFAFA",
              backgroundColor: "#1822DC",
            },
          }}
          role="tab"
          aria-selected={filter === value ? true : false}
        >
          <Box
            id={`filterradio_${value}`}
            tag="input"
            type="radio"
            name="guide-filter"
            checked={filter === value}
            value={value}
            onChange={(event) => setFilter(event.target.value)}
            styleSheet={{
              display: "none",
            }}
          />
          <span>{label}</span>
        </StyledText>
      ))}
    </Box>
  );
}
