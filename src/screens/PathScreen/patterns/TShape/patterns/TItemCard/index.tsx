/* eslint-disable no-undef */
import React from "react";
import { Box, Icon, Text } from "@src/components";
import { TItemCardGrids } from "./logic";
import { useModal } from "@src/components/Modal";
import ItemContent from "./ItemContent";
import { OptionalIcon } from "@src/theme/icons/OptionalIcon";
import { useI18n } from "@src/infra/i18n";

export function TItemCard({ cards: receivedCards, main, categoryName }: any) {
  const i18n = useI18n();
  const [extraVisible, setExtraVisible] = React.useState(false);
  const totalCards = receivedCards?.length;
  const MAX_VISIBLE = 8;

  const hasExtraCards = totalCards >= MAX_VISIBLE;
  const cards = hasExtraCards
    ? receivedCards.slice(0, MAX_VISIBLE)
    : receivedCards;
  const extraCards = hasExtraCards
    ? receivedCards.slice(MAX_VISIBLE, totalCards)
    : [];

  const gridStyles = {
    width: "100%",
    maxWidth: "33vw",
    display: "grid",
    aspectRatio: {
      xs: "initial",
      md: "1",
    },
    gridAutoRows: {
      xs: "1fr",
    },
    gridTemplateColumns: {
      xs: "1fr",
    },
    gap: "4px",
    marginBottom: "8px",
  };
  return (
    <>
      <Box
        styleSheet={{
          ...gridStyles,
          ...TItemCardGrids[cards?.length],
        }}
      >
        {cards?.map((card, index) => {
          const isLastItem = cards?.length - 1 === index;
          if (hasExtraCards && isLastItem && !extraVisible) return null;
          return (
            <Item
              key={index}
              index={index}
              categoryName={categoryName}
              main={main}
              card={card}
            />
          );
        })}
        {hasExtraCards && !extraVisible && (
          <Item
            index={cards.length - 1}
            categoryName={categoryName}
            onClick={() => setExtraVisible(!extraVisible)}
            main={main}
            card={{ item: { name: "..." } }}
          />
        )}
      </Box>
      {extraVisible && Boolean(extraCards.length) && (
        <Box
          styleSheet={{
            marginBottom: "8px",
            gap: "4px",
            aspectRatio: "none",
          }}
        >
          {extraCards.map((card, index) => (
            <Item
              key={index}
              categoryName={categoryName}
              index={index}
              main={main}
              card={card}
              extra
            />
          ))}
          <Item
            extra
            categoryName={categoryName}
            index={cards.length - 1}
            onClick={() => setExtraVisible(!extraVisible)}
            main={main}
            card={{
              item: {
                name: (
                  <Box
                    tag="span"
                    styleSheet={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {i18n.content("GUIDES.SHOW_MORE")}{" "}
                    <Icon name="arrowUp" styleSheet={{ marginLeft: "4px" }} />
                  </Box>
                ),
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

function Item({ onClick, categoryName, index, main, card, extra }: any) {
  const modal = useModal();

  const content = {
    title: card?.item?.name || "Error",
    keyObjectives: card?.item?.keyObjectives,
    aluraContents: card?.item?.aluraContents,
    contents: card?.item?.contents,
    optional: card?.optional,
  };

  return (
    <Box
      tag="button"
      onClick={() => {
        onClick
          ? onClick()
          : (() => {
              globalThis.history.pushState(
                globalThis.history.state,
                undefined,
                `${window.location.pathname}${card?.item?.slug}/`
              );

              modal.open(() => {
                return (
                  <ItemContent
                    categoryTitle={categoryName}
                    title={content.title}
                    keyObjectives={content.keyObjectives}
                    aluraContents={content.aluraContents}
                    contents={content.contents}
                    optional={content.optional}
                  />
                );
              });
            })();
      }}
      styleSheet={{
        color: "inherit",
        position: "relative",
        backgroundColor: "transparent",
        minHeight: {
          xs: "80px",
          sm: "initial",
          md: "initial",
        },
        ...(extra && {
          minHeight: {
            xs: "80px",
            sm: "80px",
            md: "80px",
          },
        }),
        width: "100%",
        gridArea: {
          xs: "initial",
          sm: "initial",
          md: !extra ? `area-${index}` : "",
        },
        aspectRatio: {
          md: "unset",
          sm: "1.5",
          xs: "unset",
        },
        borderRadius: "0.25rem",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        ...(main && {
          background:
            "linear-gradient( 123.51deg, #4a4e94 0%, #292f91 80% )",
        }),
        border: 0,
        ...(!main && {
          borderLeft: "1px solid #74b9ff",
          borderRight: "1px solid #0984e3",
          backgroundImage:
            "linear-gradient(90deg, #74b9ff, #0984e3), linear-gradient(90deg, #74b9ff, #0984e3)",
          backgroundSize: "100% 1px",
          backgroundPosition: "0 0, 0 100%",
          backgroundRepeat: "no-repeat",
        }),
        hover: {
          ...(!main && {
            border: "1px solid #1822DC",
          }),
          color: "#abc9eb",
          background: "#081729",
          backdropFilter: "blur(0.7rem)",
          cursor: "pointer",
          boxShadow: "inset 0 0 0 1px #C9DCF2",
        },
      }}
    >
      <Text
        styleSheet={{
          fontWeight: "600",
          maxWidth: "80%",
          color: "#FFFFFF",
          margin: {
            xs: "4px",
            sm: "4px",
            md: "8px",
          },
          fontSize: {
            xs: "8px",
            sm: "12px",
            md: "1vw",
            lg: "12px",
          },
        }}
      >
        {content.title}
      </Text>

      {content.optional && (
        <Box
          styleSheet={{
            position: "absolute",
            color: "#FFDEBD",
            zIndex: 1,
            bottom: "8px",
            right: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OptionalIcon />
        </Box>
      )}
    </Box>
  );
}
