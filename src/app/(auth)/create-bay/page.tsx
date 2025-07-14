import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateBayForm from "./_components/create-bay-form";

export const metadata = {
  title: "Cellar - Create A Bay For Your Company.",
};

function CreateBay() {
  return (
    <Card className="w-full bg-transparent backdrop-blur-2xl sm:w-auto sm:min-w-[25rem]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create a Bay</CardTitle>
        <CardDescription className="font-base">
          Create a Bay and keep your team together
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateBayForm />
      </CardContent>
    </Card>
  );
}

export default CreateBay;
