import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDB } from "@/Context/FirebaseContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function AddResume() {
  const { addResume } = useDB();
  const { user } = useUser();
  const navigate = useNavigate(); // Call useNavigate at the top level of the component
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");

  const handlePost = async () => {
    try {
      setIsLoading(true);
      const resumeId = uuidv4();
      await addResume(resumeName, user.fullName, user.primaryEmailAddress.emailAddress, resumeId);
      console.log("Success");
      setIsOpen(false);
      navigate(`/dashboard/resume/${resumeId}/edit`); // Navigate to the new resume edit page
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="mt-[2rem] flex items-center justify-center bg-gray-100 w-[13rem] h-[17rem] rounded-lg border-2 border-dashed cursor-pointer hover:shadow-md hover:scale-105 transition-all"
      >
        <PlusSquare />
      </div>

      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Kindly input the desired name for your resume.</p>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="Ex. Frontend Developer"
                className="input mt-4"
              />
            </DialogDescription>
            <div className="flex justify-end gap-4 pt-4">
              <Button onClick={() => setIsOpen(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handlePost} disabled={!resumeName || isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
