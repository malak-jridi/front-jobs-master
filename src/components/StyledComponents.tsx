import styled from "styled-components";

// Background container
export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Press Start 2P", cursive; /* Retro game font */
  overflow: hidden;

  /* Video Background */
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures video covers the entire screen */
    z-index: -1; /* Places video behind all other elements */
    pointer-events: none; /* Prevents interaction with the video */
  }
`;

// Form container
export const FormContainer = styled.form`
  background: rgba(0, 0, 0, 0.8);
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ff0000;
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

// Styled label
export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin: 10px 0;
`;

// Styled input
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 2px solid #ff4500;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  font-size: 14px;
  box-shadow: 0px 0px 5px #ff4500;

  &:focus {
    border-color: #ffa500;
    outline: none;
  }
`;

// Styled button
export const Button = styled.button`
  background-color: #ff4500;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #ffa500;
    box-shadow: 0px 0px 10px #ffa500;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Error message
export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-top: 10px;
`;

// Fight container
export const FightContainer = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px #ff0000;
  text-align: center;
  width: 90%;
  max-width: 800px;
`;

// Styled select
export const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 2px solid #ff4500;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  font-size: 14px;
  box-shadow: 0px 0px 5px #ff4500;

  &:focus {
    border-color: #ffa500;
    outline: none;
  }
`;

// Fight button
export const FightButton = styled.button`
  background-color: #ff4500;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    background-color: #ffa500;
    box-shadow: 0px 0px 15px #ffa500;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Life points display
export const LifePoints = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 10px 20px;
  background: rgba(255, 69, 0, 0.1);
  border: 2px solid #ff4500;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #ffa500;
`;

// Winner announcement
export const WinnerText = styled.h3`
  color: #00ff00;
  font-size: 24px;
  text-transform: uppercase;
  margin-top: 20px;
  text-shadow: 0px 0px 10px #00ff00;
`;

// Life bar container
export const LifeBarContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Life bar
export const LifeBar = styled.div<{ hpPercentage: number }>`
  width: 100%;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  background: #222;

  div {
    height: 100%;
    width: ${(props) => props.hpPercentage}%;
    background-color: ${(props) =>
      props.hpPercentage > 55
        ? "#00ff00" // Green
        : props.hpPercentage >= 25
        ? "#ffa500" // Orange
        : "#ff0000"}; // Red
    transition: width 0.3s ease, background-color 0.3s ease;
  }
`;

// HP points display
export const HPText = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTableHeader = styled.th`
  background-color: #343a40;
  color: #ffffff;
  padding: 10px;
  text-transform: uppercase;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e9ecef;
  }

  &:nth-child(odd) {
    background-color: #fdfdfe;
  }
`;

export const StyledTableCell = styled.td`
  padding: 10px;
  border: 1px solid #dee2e6;
  color: #000000;
`;

export const StyledTableTitle = styled.td`
  font-weight: bold;
  color: #495057;
  text-align: left;
`;

export const VideoPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Press Start 2P", cursive; /* Retro game font */
  overflow: hidden;

  /* Video Background */
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures video covers the entire screen */
    z-index: -1; /* Places video behind all other elements */
    pointer-events: none; /* Prevents interaction with the video */
  }

  /* Content Styling */
  h1 {
    font-size: 36px;
    color: #ffcc00;
    text-shadow: 2px 2px 4px #000;
    margin-bottom: 40px;
    z-index: 1; /* Ensures text appears above the video */
  }

  nav {
    z-index: 1; /* Ensures links appear above the video */
    a {
      display: inline-block;
      margin: 10px 0;
      padding: 15px 30px;
      text-decoration: none;
      background-color: #ff4500;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 5px;
      transition: all 0.3s ease;
      box-shadow: 0px 0px 10px #ff4500;

      &:hover {
        background-color: #ffa500;
        box-shadow: 0px 0px 15px #ffa500;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #ff4500;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0px 0px 10px #ff4500;

  &:hover {
    background-color: #ffa500;
    box-shadow: 0px 0px 15px #ffa500;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Joystick Buttons Container
export const JoystickContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

// Joystick Button
export const JoystickButton = styled.button<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:disabled {
    cursor: not-allowed;
  }
`;
