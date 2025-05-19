import React from "react";
import styled from "styled-components";
import defaultAvatar from "@assets/images/avatar.png";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b297f1;
  padding: 1.25rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  margin-bottom: 1.25rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WelcomeText = styled.h1`
  font-size: 1.375rem;
  font-weight: bold;
  color: #ffffff;
`;

const MenuButton = styled.button`
  padding: 0.3125rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const BackButton = styled.button`
  padding: 0.3125rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: bold;
  color: white;
  text-align: center;
  flex-grow: 1;
`;

const GlobalHeader = ({
  username = "Usuario",
  avatarSrc = defaultAvatar,
  onMenuClick = () => {},
  isSecondHeader = false,
  title = "",
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Header>
      {isSecondHeader ? (
        <>
          <BackButton onClick={goBack}>←</BackButton>
          <Title>{title}</Title>
        </>
      ) : (
        <>
          <Avatar src={avatarSrc} alt="User avatar" />
          <HeaderRight>
            <WelcomeText>{username}</WelcomeText>
          </HeaderRight>
        </>
      )}
      <MenuButton onClick={onMenuClick}>☰</MenuButton>
    </Header>
  );
};

export default GlobalHeader;
