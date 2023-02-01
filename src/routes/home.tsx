import { Button, Input } from "../UI";
import { AiOutlineUpload as UploadIcon } from "react-icons/all";
import { Container } from "../UI";
import { useGetMe } from "../supabase";

export default function Home() {
  const getMe = useGetMe()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("to be implemented... sorry");    
  }
  
  if (getMe.loading) return <div>Loading...</div>
  
  return (
    <Container>
        <div className="p-4">
        <h1>
            Hi....
        </h1>
        </div>
      <form
        className="flex flex-col space-y-3 p-4 w-64 sm:w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-xl">Upload new Post</h1>
        <Input type="textarea" label="Caption" required name="caption" />
        <Input
          type="file"
          required
          name="image"
          label="Upload Picture"
          suffix={<UploadIcon className="text-xl" />}
        />
        <div>
          <Button variant="primary" type="submit" loading={false}>
            Upload
          </Button>
        </div>
      </form>
    </Container>
  );
}
