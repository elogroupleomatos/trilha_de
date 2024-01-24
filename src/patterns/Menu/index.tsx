import React from "react";
import { Box, Image, Link } from "@src/components";
import { useI18n } from "@src/infra/i18n";
import pkg from "../../../package.json";

export default function Menu() {
  const i18n = useI18n();
  return (
    <Box
      styleSheet={{
        width: "100%",
        margin: "0 auto",
        alignItems: "center",
        padding: "1.25em 1rem",
        color: "#FFFFFF",
        backgroundColor: pkg.background_color,
      }}
      tag="header"
    >
      <Box
        styleSheet={{
          width: "100%",
          maxWidth: "80rem",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Image
            src="/assets/image/logo.svg"
            alt={i18n.content("MENU.LOGO_ALT")}
            styleSheet={{
              width: "45px",
              height: "45px",
            }}
          />
        </Link>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=elogroupleomatos&repo=trilha_de&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="110"
          height="30"
          title="GitHub"
        />
      </Box>
    </Box>
  );
}
