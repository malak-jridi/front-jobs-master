import { useState } from "react";
import { useRouter } from "next/router"; // Import Next.js router for navigation
import axios from "../utils/api";
import {
  PageContainer,
  FormContainer,
  Label,
  Input,
  Button,
  ErrorMessage,
  BackButton,
} from "../components/StyledComponents";

interface Fighter {
  name: string;
  additionalHealth: number;
  additionalAttack: number;
}

export default function CreateFighterPage() {
  const router = useRouter();
  const [fighter, setFighter] = useState<Fighter>({
    name: "",
    additionalHealth: 0,
    additionalAttack: 0,
  });
  const [remainingPoints, setRemainingPoints] = useState<number>(20);
  const [error, setError] = useState<string>("");

  const handlePointsAllocation = (
    field: "additionalHealth" | "additionalAttack",
    value: number
  ) => {
    if (value < 0) {
      return;
    }

    const currentOtherField =
      field === "additionalHealth"
        ? fighter.additionalAttack
        : fighter.additionalHealth;

    if (value + currentOtherField > 20) {
      setError("You cannot allocate more than 20 additional points.");
      return;
    }

    setFighter((prev) => ({ ...prev, [field]: value }));
    setRemainingPoints(20 - (value + currentOtherField));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!fighter.name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (fighter.additionalHealth + fighter.additionalAttack > 20) {
      setError("Please allocate only up to 20 points.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const baseHealth = 100;
    const baseAttack = 10;

    const attack_score = baseAttack + fighter.additionalAttack;
    const life_score = baseHealth + fighter.additionalHealth;

    const finalFighter = {
      name: fighter.name.trim(),
      attack_score,
      life_score,
    };

    try {
      await axios.post("/fighters", finalFighter);
      alert("Fighter created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create Fighter.");
    }
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
      <FormContainer onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            value={fighter.name}
            onChange={(e) =>
              setFighter({ ...fighter, name: e.target.value })
            }
          />
        </Label>

        <Label>
          Additional Health:
          <Input
            type="number"
            value={fighter.additionalHealth}
            onChange={(e) =>
              handlePointsAllocation("additionalHealth", Number(e.target.value))
            }
          />
        </Label>

        <Label>
          Additional Attack:
          <Input
            type="number"
            value={fighter.additionalAttack}
            onChange={(e) =>
              handlePointsAllocation("additionalAttack", Number(e.target.value))
            }
          />
        </Label>

        <p>Remaining Points: {remainingPoints}</p>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Create</Button>
      </FormContainer>
    </PageContainer>
  );
}
