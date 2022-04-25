import React, { ReactNode } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiStar,
} from 'react-icons/fi';
import {
    BiWorld
} from 'react-icons/bi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

import Routes from "@app/routes/routers";
import Router, { useRouter } from "next/router";

interface LinkItemProps {
    name: string;
    icon?: IconType;
    route: any;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Questions', icon: BiWorld, route: Routes.Main.Questions.route },
    { name: 'Tags', route: Routes.Main.Tags.route },
    { name: 'Users', route: Routes.Main.Users.route },
    { name: 'Companies', route: Routes.Main.Companies.route },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const LeftSideBar = ({ onClose, ...rest }: SidebarProps) => {
    const padLeftWithIcon = "10px"
    return (
        <Box
            fontSize={"13px"}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Link onClick={() => Router.push(Routes.Main.Home.route)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    paddingLeft="1"
                    paddingTop="5"
                    // mx="4"
                    role="group"
                    cursor="pointer"
                    color="#6a737c"
                    _hover={{
                        color: '#000',
                    }}
                    {...rest}>
                    Home
                </Flex>
            </Link>
            <Flex
                paddingLeft="1"
                paddingTop="6"
                color={"#6a737c"}
                textTransform="uppercase"
                fontSize={"11px"}
                {...rest}>
                Public
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} padLeftWithIcon={padLeftWithIcon} routeNav={link.route}>
                    {link.name}
                </NavItem>
            ))}
            <Flex
                paddingLeft="1"
                paddingTop="6"
                color="#6a737c"
                textTransform="uppercase"
                fontSize={"11px"}
                {...rest}>
                Collectives
            </Flex>
            <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    paddingLeft={padLeftWithIcon}
                    paddingTop="3"
                    role="group"
                    color="#6a737c"
                    cursor="pointer"
                    _hover={{
                        color: '#000',
                    }}
                    {...rest}>
                    <Icon
                        mr="1"
                        fontSize="16"
                        _groupHover={{
                            color: '#000',
                        }}
                        as={FiStar}
                    />
                    Explore Collectives
                </Flex>
            </Link>
            <Flex
                paddingLeft="1"
                paddingTop="6"
                color="#6a737c"
                textTransform="uppercase"
                fontSize={"11px"}
                {...rest}>
                Teams
            </Flex>

        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon?: IconType;
    children: ReactText;
    padLeftWithIcon: string;
    routeNav: any;

}
const NavItem = ({ icon, children, padLeftWithIcon, routeNav, ...rest }: NavItemProps) => {

    const router = useRouter();
    const isCurrent = routeNav === router.pathname
    return (
        <Link onClick={() => Router.push(routeNav)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} >
            <Flex
                align="center"
                paddingLeft={icon ? padLeftWithIcon : "30px"}
                paddingTop="1.5"
                paddingBottom="1.5"
                role="group"
                cursor="pointer"
                color={isCurrent ? 'black' : '#6a737c'}
                bg={isCurrent ? '#f1f2f3' : 'white'}
                fontWeight={isCurrent ? 'bold' : 'normal'}
                _hover={{
                    color: '#000',
                }}
                borderRight={isCurrent ? "4px" : '0px'}
                borderColor={isCurrent ? '#f48225' : 'white'}
                {...rest}>
                {icon && (
                    <Icon
                        mr="1"
                        fontSize="16"
                        _groupHover={{
                            color: '#000',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default LeftSideBar