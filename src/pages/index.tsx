import { VideoPageContainer } from "../components/StyledComponents";

export default function HomePage() {
  return (
    <VideoPageContainer>
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
      <h1>Welcome to the Arena</h1>
      <nav>
        <a href="/new-fighter">Create a Character</a>
        <br />
        <a href="/fight">Ready? Fight!</a>
      </nav>
    </VideoPageContainer>
  );
}
