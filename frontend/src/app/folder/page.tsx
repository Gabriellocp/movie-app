import { FolderCard } from "@/components/FolderCard";
import { FolderModal } from "@/components/FolderModal";
import { Folder } from "@/types";
import { createFolderAction } from "../actions/createFolder";
import { withRetry } from "../actions/withRetry";

export default async function FolderPage() {
  const folders = await withRetry<Folder[]>("/folder");
  return (
    <div className="mx-auto w-100 flex flex-col space-y-2">
      <FolderModal mode="create" onSubmit={createFolderAction} />
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
