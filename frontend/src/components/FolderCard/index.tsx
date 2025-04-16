"use client";
import FolderService from "@/services/FolderService";
import { Folder } from "@/types";
import { useEffect, useState } from "react";
import { FolderModal } from "../FolderModal";
interface IFolderCardProps {
  folder: Folder | undefined;
}
export function FolderCard({ folder }: IFolderCardProps) {
  const [folderName, setFolderName] = useState<string>("");
  useEffect(() => {
    setFolderName(folder?.name ?? "");
  }, [folder]);
  const handleRename = async (name: string) => {
    try {
      await FolderService.update(folder!.id, { name });
      setFolderName(name);
    } catch (err: any) {}
  };
  if (!folder) {
    return null;
  }
  return (
    <div className="rounded-sm bg-primary text-white text-2xl p-4 w-full flex items-center uppercase justify-center">
      <strong>{folderName}</strong>
      <FolderModal
        mode="update"
        onSubmit={handleRename}
        initialValue={folderName}
      />
    </div>
  );
}
