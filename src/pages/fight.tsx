import { useState, useEffect } from "react";
import axios from "../utils/api";

import {
  PageContainer,
  FightContainer,
  Label,
  Select,
  FightButton,
  LifeBarContainer,
  LifeBar,
  HPText,
  WinnerText,
  StyledTableCell,
  StyledTableTitle,
  StyledTableRow,
  StyledTable,
  StyledTableHeader,
  BackButton,
  JoystickContainer,
  JoystickButton,
} from "../components/StyledComponents";
import { useRouter } from "next/router";

type Fighter = {
  id: number;
  name: string;
  life_score: number; // Updated field
  attack_score: number; // Updated field
  weapon?: string;
};

type Weapon = {
  id: number;
  name: string;
  power_score: number;
};

export default function FightPage() {
  const router = useRouter();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [playerOne, setPlayerOne] = useState<number | null>(null);
  const [playerTwo, setPlayerTwo] = useState<number | null>(null);
  const [playerOneWeapon, setPlayerOneWeapon] = useState<number | null>(null);
  const [playerTwoWeapon, setPlayerTwoWeapon] = useState<number | null>(null);
  const [playerOneHealth, setPlayerOneHealth] = useState<number>(0);
  const [playerTwoHealth, setPlayerTwoHealth] = useState<number>(0);
  const [playerOneStrikes, setPlayerOneStrikes] = useState<number>(0);
  const [playerTwoStrikes, setPlayerTwoStrikes] = useState<number>(0);
  const [playerOneHealthLost, setPlayerOneHealthLost] = useState<number>(0);
  const [playerTwoHealthLost, setPlayerTwoHealthLost] = useState<number>(0);
  const [winner, setWinner] = useState<string>("");
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {

    const fetchFighters = async () => {

      try {

        const response = await axios.get("/fighters"); // Replace with your actual API endpoint

        const formattedFighters = response.data.map((char: any) => ({

          id: char.id,

          name: char.name.trim(),

          life_score: char.life_score,

          attack_score: char.attack_score,

        }));

        setFighters(formattedFighters);

      } catch (error) {

        console.error("Error fetching fighters:", error);

      }

    };



    const fetchWeapons = async () => {

      try {

        const response = await axios.get("/weapons"); // Replace with your actual API endpoint

        const formattedWeapons = response.data.map((weapon: any) => ({

          id: weapon.id,

          name: weapon.name,

          power_score: weapon.power_score,

        }));

        setWeapons(formattedWeapons);

      } catch (error) {

        console.error("Error fetching weapons:", error);

      }

    };



    fetchFighters();

    fetchWeapons();

  }, []);

  const startFight = () => {
    if (playerOne !== null && playerTwo !== null) {
      const char1 = fighters.find((c) => c.id === playerOne);
      const char2 = fighters.find((c) => c.id === playerTwo);

      const weapon1 = weapons.find((w) => w.id === playerOneWeapon);
      const weapon2 = weapons.find((w) => w.id === playerTwoWeapon);

      if (char1 && char2 && weapon1 && weapon2) {
        setPlayerOneHealth(char1.life_score);
        setPlayerTwoHealth(char2.life_score);
        setPlayerOneStrikes(0);
        setPlayerTwoStrikes(0);
        setPlayerOneHealthLost(0);
        setPlayerTwoHealthLost(0);
      }
    }
  };

  const handleKeyPress = (key: string) => {
    if (playerOneHealth === 0 || playerTwoHealth === 0) {
      // Stop calculations if one player has already lost
      return;
    }

    let newPlayerOneHealth = playerOneHealth;
    let newPlayerTwoHealth = playerTwoHealth;

    const char1 = fighters.find((c) => c.id === playerOne);
    const char2 = fighters.find((c) => c.id === playerTwo);

    const weapon1 = weapons.find((w) => w.id === playerOneWeapon);
    const weapon2 = weapons.find((w) => w.id === playerTwoWeapon);

    if (key === "F" && char1 && weapon1) {
      const damage = char1.attack_score + weapon1.power_score;

      if (playerTwoHealth > 0) {
        const actualDamage = Math.min(damage, playerTwoHealth); // Prevents health going below 0
        newPlayerTwoHealth = Math.max(0, playerTwoHealth - damage);
        setPlayerTwoHealth(newPlayerTwoHealth);
        setPlayerOneStrikes((prev) => prev + 1);
        setPlayerTwoHealthLost((prev) => prev + actualDamage); // Add only the actual damage dealt
      }
    } else if (key === "J" && char2 && weapon2) {
      const damage = char2.attack_score + weapon2.power_score;

      if (playerOneHealth > 0) {
        const actualDamage = Math.min(damage, playerOneHealth); // Prevents health going below 0
        newPlayerOneHealth = Math.max(0, playerOneHealth - damage);
        setPlayerOneHealth(newPlayerOneHealth);
        setPlayerTwoStrikes((prev) => prev + 1);
        setPlayerOneHealthLost((prev) => prev + actualDamage); // Add only the actual damage dealt
      }
    }

    // Check for a winner
    if (newPlayerOneHealth === 0) {
      setWinner("Player Two Wins!");
    } else if (newPlayerTwoHealth === 0) {
      setWinner("Player One Wins!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerOneHealth, playerTwoHealth]);

  const calculateHPPercentage = (
    currentHP: number,
    initialHP: number
  ): number => {
    return Math.max(0, Math.floor((currentHP / initialHP) * 100));
  };

  return (
    <PageContainer>
      <video autoPlay loop muted>
        <source
          src="https://cdn.chrome-backgrounds.com/anime_live/image8.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.chrome-backgrounds.com/anime_live/image8.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
      <BackButton onClick={() => router.push("/")}>Back</BackButton>

      <FightContainer>
        <h2>Ready? Fight!</h2>

        {/* Player One Selection */}
        <div>
          <Label>
            Player One:
            <Select
              value={playerOne ?? ""}
              onChange={(e) => setPlayerOne(Number(e.target.value))}
            >
              <option value="">Select a Fighter</option>
              {fighters
                .filter((fighter) => fighter.id !== playerTwo)
                .map((fighter) => (
                  <option key={fighter.id} value={fighter.id}>
                    {fighter.name} (Attack: {fighter.attack_score}, Health:{" "}
                    {fighter.life_score})
                  </option>
                ))}
            </Select>
          </Label>
          {playerOne && (
            <Label>
              Weapon:
              <Select
                value={playerOneWeapon ?? ""}
                onChange={(e) => setPlayerOneWeapon(Number(e.target.value))}
              >
                <option value="">Select a Weapon</option>
                {weapons.map((weapon) => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} (+{weapon.power_score} Attack)
                  </option>
                ))}
              </Select>
            </Label>
          )}
        </div>

        {/* Player Two Selection */}
        <div>
          <Label>
            Player Two:
            <Select
              value={playerTwo ?? ""}
              onChange={(e) => setPlayerTwo(Number(e.target.value))}
            >
              <option value="">Select a Fighter</option>
              {fighters
                .filter((fighter) => fighter.id !== playerOne)
                .map((fighter) => (
                  <option key={fighter.id} value={fighter.id}>
                    {fighter.name} (Attack: {fighter.attack_score}, Health:{" "}
                    {fighter.life_score})
                  </option>
                ))}
            </Select>
          </Label>
          {playerTwo && (
            <Label>
              Weapon:
              <Select
                value={playerTwoWeapon ?? ""}
                onChange={(e) => setPlayerTwoWeapon(Number(e.target.value))}
              >
                <option value="">Select a Weapon</option>
                {weapons.map((weapon) => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} (+{weapon.power_score} Attack)
                  </option>
                ))}
              </Select>
            </Label>
          )}
        </div>

        {/* Start Fight Button */}
        {playerOne && playerTwo && playerOneWeapon && playerTwoWeapon && (
          <>
            <FightButton onClick={startFight}>Start Fight</FightButton>
            <JoystickContainer>
              <JoystickButton bgColor="#3498db" disabled>
                F
              </JoystickButton>
              <JoystickButton bgColor="#e74c3c" disabled>
                J
              </JoystickButton>
            </JoystickContainer>
          </>
        )}

        {/* Life Points Display */}
        <LifeBarContainer>
          <h3>Player One</h3>
          {playerOne && (
            <LifeBar
              hpPercentage={calculateHPPercentage(
                playerOneHealth,
                fighters.find((c) => c.id === playerOne)?.life_score || 1
              )}
            >
              <div />
            </LifeBar>
          )}
          <HPText>
            {playerOneHealth} HP (
            {calculateHPPercentage(
              playerOneHealth,
              fighters.find((c) => c.id === playerOne)?.life_score || 1
            )}
            %)
          </HPText>
        </LifeBarContainer>

        <LifeBarContainer>
          <h3>Player Two</h3>
          {playerTwo && (
            <LifeBar
              hpPercentage={calculateHPPercentage(
                playerTwoHealth,
                fighters.find((c) => c.id === playerTwo)?.life_score || 1
              )}
            >
              <div />
            </LifeBar>
          )}
          <HPText>
            {playerTwoHealth} HP (
            {calculateHPPercentage(
              playerTwoHealth,
              fighters.find((c) => c.id === playerTwo)?.life_score || 1
            )}
            %)
          </HPText>
        </LifeBarContainer>

        {/* Winner Announcement */}
        {winner && (
          <>
            <WinnerText>{winner}</WinnerText>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTableHeader>Statistic</StyledTableHeader>
                  <StyledTableHeader>Player One</StyledTableHeader>
                  <StyledTableHeader>Player Two</StyledTableHeader>
                </tr>
              </thead>
              <tbody>
                <StyledTableRow>
                  <StyledTableTitle>Strikes</StyledTableTitle>
                  <StyledTableCell>{playerOneStrikes}</StyledTableCell>
                  <StyledTableCell>{playerTwoStrikes}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableTitle>Health Lost</StyledTableTitle>
                  <StyledTableCell>{playerOneHealthLost}</StyledTableCell>
                  <StyledTableCell>{playerTwoHealthLost}</StyledTableCell>
                </StyledTableRow>
              </tbody>
            </StyledTable>
          </>
        )}
      </FightContainer>
    </PageContainer>
  );
}
