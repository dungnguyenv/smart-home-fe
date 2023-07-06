import styled from "styled-components";
import { useState } from "react";


export default function Button({ content, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  return <StyledButton style={{ opacity: isClicked ? 0.2 : isHovered ? 0.8 : 1 }} onClick={() => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 100)
    onClick()
  }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>{content}</StyledButton>;
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;
