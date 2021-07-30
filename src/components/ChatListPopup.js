import React, { useEffect, useState } from "react";
import {
  Input,
  Box,
  Flex,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineGroup } from "react-icons/ai";
import { Fragment } from "react";

const groupImg = process.env.PUBLIC_URL + "/group_icon.png";

const ChatListPopup = ({
  isDrawerOpen,
  setDrawerOpen,
  setSelectedRoom,
  setChatDrawerOpen,
  currentUser,
  rooms,
  moduleHeight,
  paddingX,
  placement,
  hasBorder,
  showSearch,
}) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTxt, setSearchTxt] = useState(" ");
  const [loading, setLoading] = useState(false);
  const handleChangeSearch = (e) => {
    const query = e.target.value;
    setSearchTxt(query);

    if (query === "") {
      setFilteredRooms(rooms);
    } else {
      if (rooms && rooms.length > 0) {
        const tempRooms = rooms.filter((room) =>
          room.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRooms(tempRooms);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setFilteredRooms([]);
    setFilteredRooms(rooms);

    setTimeout(() => {
      setSearchTxt("");
      setLoading(false);
    }, 6000);
  }, [currentUser, rooms]);

  return (
    <Flex px={paddingX}>
      <Popover placement={placement} isOpen={isDrawerOpen}>
        <PopoverTrigger>
          <IconButton
            bg="brand.600"
            width="80px"
            color="white"
            _hover={{ bg: "brand.800" }}
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            _focus={{ outline: "none" }}
            size="lg"
            icon={<AiOutlineGroup size="24" />}
          />
        </PopoverTrigger>
        <PopoverContent
          bg="transparent"
          borderWidth={hasBorder ? 2 : 0}
          borderRadius={16}
          borderColor="brand.800"
        >
          <PopoverBody bg="gray.100" borderRadius={16}>
            {showSearch && (
              <Fragment>
                <Box py={2} />
                <Input
                  placeholder="Search Room..."
                  value={searchTxt}
                  onChange={handleChangeSearch}
                  bg="white"
                  borderRadius={16}
                  borderWidth={3}
                  borderColor="brand.600"
                  _hover={{ borderColor: "brand.800" }}
                  _focus={{ outline: "none" }}
                />
              </Fragment>
            )}
            <Box my={2} />
            <Flex
              direction="column"
              overflowY
              height={moduleHeight}
              overflow="scroll"
              px={2}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#6269A0",
                  borderRadius: "16px",
                },
              }}
            >
              {filteredRooms && filteredRooms.length > 0 ? (
                filteredRooms.map((chat, index) => (
                  <Flex
                    key={index.toString()}
                    _hover={{
                      backgroundColor: "whiteAlpha.700",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedRoom(chat);
                      setDrawerOpen(false);
                      setChatDrawerOpen(true);
                    }}
                    p={2}
                    my={1}
                    align="center"
                    bg="white"
                    borderColor="brand.400"
                    borderWidth={2}
                    borderRadius={16}
                  >
                    <Box
                      borderRadius={"50%"}
                      borderColor="facebook.500"
                      borderWidth={2}
                      p={1}
                    >
                      <Image
                        src={groupImg}
                        width="40px"
                        height="40px"
                        borderRadius={"40%"}
                      />
                    </Box>

                    <Box ml={3}>
                      <Text fontWeight="bold">{chat.title}</Text>
                      <Text fontSize="0.8em" color="gray.500">
                        Enter Room
                      </Text>
                    </Box>
                  </Flex>
                ))
              ) : loading ? (
                <Flex w="full" my={2} align="center" justify="center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="brand.800"
                    size="xl"
                  />
                </Flex>
              ) : (
                <Text my={2} color="gray.600">
                  No Rooms Found...
                </Text>
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ChatListPopup;
